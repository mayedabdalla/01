import {QueryResolvers} from "../generated/graphql";
import {ApolloError} from "apollo-server";

const Query:QueryResolvers = {
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
}
export default Query;