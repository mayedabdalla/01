import {MutationResolvers} from "../generated/graphql";
import {ApolloError, UserInputError} from "apollo-server";
import {createWriteStream, unlink} from "fs";
import * as Yup from "yup";
import sharp from 'sharp';

const validator = Yup.object({
    text: Yup.string().required('text required'),
    type: Yup.string().oneOf(['MANHWA', 'MANGA']).required(),
    name: Yup.string()
        .trim()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
})
const isValidImage = async (file) => {
    const {filename} = await file;
    const path = require('path')
    const types = ['jpeg', 'jpg', 'png', 'webp'];
    const ext = path.extname(filename).split('.').pop().toLowerCase()
    if (!types.includes(ext)) {
        throw new Error('sorry, this type is not included')
    }
}
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

const Mutation:MutationResolvers = {
    createComic: async (_, {name, type, text, cover}, {prisma}) => {
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
            console.log(e)
            if (e instanceof Yup.ValidationError) {
                throw new UserInputError(e, {invalidArgs: e.path});
            }
            if (e.toString().includes("Unique constraint failed on the fields: (`name`)")) {
                throw new UserInputError("duplicated", {invalidArgs: 'name'});
            }
            throw new ApolloError(e);
        }
    },
    addChapter: async (_, {name, pages, comicName}, {prisma}) => {
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
}
export default Mutation;