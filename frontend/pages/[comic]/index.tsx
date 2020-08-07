import {withRouter} from 'next/router'
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Link from "next/link";
import Layout from "../../component/layout";
import Error from "../_error";
import {useEffect, useState} from "react";
import Cover from "../../component/cover";
import { GetServerSideProps } from 'next'

const QUERY = gql`
    query($name: String) {
        comic(name: $name) {
            id
            name
            text
            type
            slug
            chapters {
                id
                name
            }
            cover {
                filename
                path
                link
            }
        }
    }
`;


const Comic = ({router, url}) => {
    const {loading, data} = useQuery(QUERY, {variables: {name: decodeURIComponent(router.query.comic)}});
    if (loading || !data) {
        return <h1>loading...</h1>;
    }
    if (!data.comic) {
        return (
            <>
                <Layout>
                    <Error statusCode={404}/>
                </Layout>
            </>
        )
    }
    return (
        <>
            <style jsx>
                {`
                    .info {
                        display: flex;
                        flex-direction: column;
                    }
                    .info .desc {
                        overflow: hidden;
                        flex-basis: 100%;
                    }
                    .desc p {
                        word-wrap: break-word;
                    }
                    
                    .cover {
                        flex-basis: 100%;
                        flex-shrink: 0;
                    }
                    
                    @media (min-width: 768px) {
                        .info {
                            flex-direction: row;
                            
                        }
                        .info .desc {
                            margin-right: 10px;
                        }
                        .cover {
                            flex-basis: 40%;
                            background: yellow;
                        }
                    }
                    @media (min-width: 992px) {
                        .cover {
                            flex-basis: 27%;
                        }
                    }
                `}
            </style>
            <Layout twitterCard={{
                card: 'summary',
                image: data.comic.cover ? `${url}/uploads/${data.comic.cover.filename}?format=webp&width=${384 * 2}&height=${412.8 * 2}` : null,
                title: `${data.comic.type === 'MANHWA' ? "مانهوا" : "مانجا"} ${data.comic.name}`,
                site: '@mydlala',
                description: `جميع فصول  ${data.comic.name} مترجمة بالعربية. اقرا فصول ${data.comic.name} الآن.`
            }} title={`${data.comic.type === 'MANHWA' ? "مانهوا" : "مانجا"} ${data.comic.name}`}
                    description={`جميع فصول  ${data.comic.name} مترجمة بالعربية. اقرا فصول ${data.comic.name} الآن.`}>
                <article className="comic">
                    <div className="info">
                        <div className='cover'>
                            <Cover cover={data.comic.cover}/>
                        </div>
                        <div className="desc">
                            <h2>{data.comic.name}</h2>
                            <p>النوع: {data.comic.type === "MANHWA" ? "مانهوا" : "مانجا"}</p>
                            <h3>الوصف</h3>
                            <p>{data.comic.text ? data.comic.text : "لم يضاف إليها وصف"}</p>
                        </div>
                    </div>
                    <div>
                        <h3>الفصول</h3>
                        <Link href='/[comic]/add' as={`${router.asPath}/add`}>
                            <a>إضافة فصل</a>
                        </Link>
                        {
                            data.comic.chapters ? (
                                <ul>
                                    {data.comic.chapters?.map(chapter => {
                                        return (<li key={chapter.id}><Link href='/[comic]/[chapter]'
                                                                           as={`${router.asPath}/${chapter.id}`}><a>{chapter.name}</a></Link>
                                        </li>)
                                    })}
                                </ul>
                            ) : (<p>ليس هناك فصل</p>)
                        }
                    </div>
                </article>
            </Layout>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            url: `http://${context.req.headers.host}`
        }
    }
}


export default withRouter(Comic)
