import {gql, ApolloError, UserInputError} from 'apollo-server';
import {PrismaClient} from '@prisma/client';
import * as Yup from "yup";
import * as sharp from 'sharp';
import {createWriteStream, unlink} from "fs";
import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import * as fs from "fs";
import * as mkdirp from 'mkdirp'

mkdirp('./uploads')

const Sharp = require('sharp');

const prisma = new PrismaClient();

const validator = Yup.object({
    text: Yup.string().required('text required'),
    type: Yup.string().oneOf(['MANHWA', 'MANGA']).required(),
    name: Yup.string()
        .trim()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
})


const storeUpload = async (upload) => {
    var uniqueFilename = require('unique-filename')
    const {createReadStream, filename, mimetype} = await upload;
    const stream = createReadStream();
    const shortid = require('shortid');
    const UPLOAD_DIR = './uploads'
    const id = shortid.generate(UPLOAD_DIR);
    const filename1  = uniqueFilename('');
    const path = `${UPLOAD_DIR}/${filename1}`
    const file = {filename: filename1, mimetype, path};

    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
        // Create a stream to which the upload will be written.
        const writeStream = createWriteStream(path);

        // When the upload is fully written, resolve the promise.
        writeStream.on('finish', resolve);

        // If there's an error writing the file, remove the partially written file
        // and reject the promise.
        writeStream.on('error', (error) => {
            unlink(path, () => {
                reject(error);
            });
        });

        // In node <= 13, errors are not automatically propagated between piped
        // streams. If there is an error receiving the upload, destroy the write
        // stream with the corresponding error.
        stream.on('error', (error) => writeStream.destroy(error));

        // Pipe the upload into the write stream.
        stream.pipe(writeStream);
    });

    // Record the file metadata in the DB.

    return file;
};

const imagePromise = stream =>
    new Promise(async (resolve, reject) => {
        const pipeline = sharp();
        pipeline.metadata().then((metadata) => {
            resolve(metadata);
        }).catch((err) => {
            if (err) reject(err)
        });
        stream.pipe(pipeline)
    });

const isValidImage = async (file) => {
    const {filename} = await file;
    const path = require('path')
    const types = ['jpeg', 'jpg', 'png', 'webp'];
    const ext = path.extname(filename).split('.').pop().toLowerCase()
    if (!types.includes(ext)) {
        throw new Error('sorry, this type is not included')
    }
}

const typeDefs = gql`
    enum Type {
        MANHWA
        MANGA
    }

    type File {
        id: Int
        filename: String
        mimetype: String
        path: String
        link: String
    }

    type Comic {
        id: Int
        name: String
        slug: String
        text: String
        type: Type
        cover: File
        chapters: [Chapter]
    }

    type Page {
        id: Int
        number: Int
        image: File
        width: Int
        height: Int
    }

    type Chapter {
        id: Int
        name: String
        comic: Comic
        pages: [Page]
    }
    type Query {
        comics: [Comic]
        comic(name: String): Comic
        chapter(id: Int):Chapter
    }

    type Mutation {
        createComic(name: String!, type: Type!, text: String, cover: Upload): Comic
        addChapter(name: String, comicName: String, pages: Upload): Chapter
    }
`;

const resolvers = {
    Query: {
        comics: async (_, __, {prisma}) => {
            try {
                return await prisma.comic.findMany({
                    include: {
                        cover: true,
                        chapters: true
                    }
                })
            } catch (e) {
                return new ApolloError(e)
            }
        },
        comic: async (_, {name}, {prisma}) => {
            try {
                const comic = await prisma.comic.findOne({
                    where: {
                        name
                    },
                    include: {
                        cover: true,
                        chapters: true,
                    }
                })
                return comic;
            } catch (e) {
                return new ApolloError(e)
            }
        },
        chapter: async (_, {id}, {prisma}) => {
            try {
                const chapter = await prisma.chapter.findOne({
                    where: {
                        id
                    },
                    include: {
                        comic: true,
                        pages: {
                            select: {
                                id: true,
                                height: true,
                                width: true,
                                image: true
                            }
                        },
                    }
                })
                return chapter;
            } catch (e) {
                return new ApolloError(e)
            }
        }
    },
    Mutation: {
        createComic: async (_, {name, type, text, cover}, {prisma1}) => {
            try {
                // validate
                if (cover) {

                    const {createReadStream, filename, mimetype} = await cover;
                    await isValidImage(cover)
                    const stream = createReadStream();
                    const metadata = await imagePromise(stream);
                }

                await validator.validate({name, type, text})

                // if everything are ok then transfer the image and then create the comic
                const slug = name;
                const file = cover ? await storeUpload(cover) : undefined;
                const comic = await prisma.comic.create({
                    include: {
                        cover: true,
                    },
                    data: {
                        name,
                        type,
                        text,
                        slug,
                        cover: {
                            create: file
                        }
                    }
                })
                return comic;
            } catch (e) {
                if (e instanceof Yup.ValidationError) {
                    throw new UserInputError(e, {invalidArgs: e.path});
                }
                if (e.toString().includes("Unique constraint failed on the fields: (`name`)")) {
                    throw new UserInputError("duplicated", {invalidArgs: 'name'});
                }
                throw new ApolloError(e);
            }
        },
        addChapter: async (_, {name, pages, comicName}, {prisma1}) => {
            try {
                for (const page of pages) {
                    await isValidImage(page)
                }

                const pagesWithDemnision = await Promise.all(pages.map(async page => {
                    const {createReadStream} = await page
                    const stream = createReadStream();
                    const metadata = await imagePromise(stream);
                    return {metadata, ...await page}
                }));

                const santized = await Promise.all(pagesWithDemnision.map(async (page, i) => {
                    const image = page ? await storeUpload(page) : undefined;
                    // @ts-ignore


                    return {
                        // @ts-ignore
                        width: page.metadata.width,
                        // @ts-ignore
                        height: page.metadata.height,
                        number: i,
                        image: {
                            create: image
                        }
                    }
                }))
                const chapter = await prisma.chapter.create({
                    data: {
                        name: name,
                        comic: {
                            connect: {
                                name: comicName,
                            }
                        },
                        pages: {
                            create: santized
                        }
                    }
                })
                return chapter
            } catch (e) {
                return new ApolloError(e)
            }

        }
    },
    File: {
        link: (parent) => {
            return `http://localhost:4000/uploads/${parent.filename}`
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma
    }
});

const app = express();
server.applyMiddleware({app});

app.get('/', function (req, res) {
    res.send('Hello World!')
})
app.get('/cover/:imageName', async (req, res, next) => {
    var {promisify} = require('util');
    var sizeOf = promisify(require('image-size'));
    try {
        const imagePath = "./uploads/" + req.params.imageName
        const stream = fs.createReadStream(imagePath);
        console.log(req.query)
        const dimensions = await sizeOf(imagePath);
        const format = req.query.format ? req.query.format : 'jpeg';
        let width: number = null;
        let height: number = null;
        const scale = req.query.scale ? parseInt(req.query.scale.substring(1)) : 1;
        const maxWidth = 384 * scale ;
        const maxHeight = 413 * scale ;
        const aspectRatio = 1.075;
        const quality = 85;
        // check if image width and height is heigher than the max width and height, if it less we can then resize to the max of height and width
        if (dimensions.width > maxWidth && dimensions.height > maxHeight) {
            width = maxWidth
            height = maxHeight;
        } else {
            // if not, it mean there maybe the height or width of image is less then the max so it mean it will be upscaled and will make the size more bigger
            // thats not what we want
            // so we will depend on the width  or height of the image rather than max width /height

            // firstly we check if width of image is less than height
            if (dimensions.width < dimensions.height) {
                // it's less so we will adjusted to height according to width

                width = dimensions.width;
                height = Math.round(dimensions.width * aspectRatio)
            } else {
                height = dimensions.height;
                width = Math.round(dimensions.height / aspectRatio)
            }

        }
        const transform = Sharp().resize(width, height, {
            fit: 'cover'
        }).toFormat(format, {
            quality: quality
        });
        stream.pipe(transform).pipe(res);
    } catch (e) {
        console.log(e)
        next();
    }
})

app.get('/uploads/:imageName', async (req, res, next) => {
    var {promisify} = require('util');
    var sizeOf = promisify(require('image-size'));

    try {
        const imagePath = "./uploads/" + req.params.imageName
        const stream = fs.createReadStream(imagePath);
        if (req.query.format) {
            const dimensions = await sizeOf(imagePath);
            let width = null;
            let height = null;
            if (req.query.width && req.query.height) {
                if (req.query.width < dimensions.width && req.query.height < dimensions.height) {
                    width = parseInt(req.query.width)

                    height = parseInt(req.query.height)
                }
                if (req.query.height < dimensions.height) {

                    height = parseInt(req.query.height)
                }
                if (req.query.width < dimensions.width) {

                    width = parseInt(req.query.width)
                }
            }
            const crop = req.query.crop ? req.query.crop : "cover";

            const quality = req.query.q ? parseInt(req.query.q) : null;
            const format = req.query.format;
            const transform = Sharp().resize(width, height, {
                fit: crop
            }).toFormat(format, {
                quality: quality
            });
            stream.pipe(transform).pipe(res);
            return;
        }
        res.set('Content-Type', `image/jpg`);
        stream.pipe(res);
    } catch (err) {
        next()
    }
    // try {
    //     console.log('2')
    //
    //     const imagePath = "./uploads/" + req.params.imageName //req.originalUrl or req._parsedOriginalUrl.pathname
    //     // console.log(dimensions)
    //     // if (req.query.format != null) {
    //     //     if (fs.exists(imagePath)) {
    //     //         // const image = new Image();
    //     //         // image.src = imagePath;
    //     //         // image.onload = function() {
    //     //         //     console.log(image.height);
    //     //         //     console.log(image.width);
    //     //         // };
    //     //         const format = req.query.format ? req.query.format : "webp";
    //     //         // @ts-ignore
    //     //         let width = req.query.width ? parseInt(req.query.width) : null;
    //     //         // @ts-ignore
    //     //         let height = req.query.height ? parseInt(req.query.height) : null;
    //     //
    //     //         const crop = req.query.crop ? req.query.crop : "cover";
    //     //
    //     //         const stream = fs.createReadStream(imagePath);
    //     //
    //     //         // const metadata = await imagePromise(stream);
    //     //         // console.log(metadata)
    //     //
    //     //         const transform = Sharp().resize(width, height, {
    //     //             fit: crop
    //     //         }).toFormat(format, {
    //     //             quality: 85
    //     //         });
    //     //         transform.on('data', (chunk)=> {
    //     //             console.log(chunk)
    //     //         })
    //     //         res.set('Content-Type', `image/${format}`);
    //     //         stream.pipe(transform).pipe(res);
    //     //
    //     //
    //     //         // return stream;
    //     //     }
    //     // }
    // } catch (e) {
    //     return e;
    // }

});


app.listen({port: 4000}, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
