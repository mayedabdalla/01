import {PrismaClient} from '@prisma/client';
// import * as express from 'express';
import express, { Request, Response,  NextFunction } from 'express'
import {ApolloServer} from 'apollo-server-express';
import * as fs from "fs";
import mkdirp from 'mkdirp'
import { loadSchemaSync } from '@graphql-tools/load';
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {addResolversToSchema} from "@graphql-tools/schema";
import {join} from "path";
import Sharp from "sharp";
import resolvers from "./resolvers";
mkdirp('./uploads')

const prisma = new PrismaClient();
console.log(process.env.POSTGRES_URL)
const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] });
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: {
        prisma
    }
});

const app = express();

server.applyMiddleware({app: app as any});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/cover/:imageName', async (req:Request, res:Response, next:NextFunction) => {
    var {promisify} = require('util');
    var sizeOf = promisify(require('image-size'));
    try {
        const imagePath = "./uploads/" + req.params.imageName
        const stream = fs.createReadStream(imagePath);
        const dimensions = await sizeOf(imagePath);
        const format = req.query.format ? req.query.format : 'jpeg';
        let width: number | null = null;
        let height: number| null = null;
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
        next();
    }
})

app.get('/uploads/:imageName', async (req: Request, res: Response, next: NextFunction) => {
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
            const crop: string = req.query.crop ? req.query.crop : "cover";

            const quality :  number | null = req.query.q ? parseInt(req.query.q) : null!;
            const format = req.query.format;

            const transform = Sharp().resize(width, height, {
                // @ts-ignore
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
