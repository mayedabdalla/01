import {withRouter} from 'next/router'
import Link from "next/link";
import Layout from "../../component/layout";
import Error from "../_error";
import Cover from "../../component/cover";
import Comisc from "../../component/comic";
import {GetServerSideProps} from 'next'
import {useComicQuery} from "../../generated/graphql";

const Comic1 = ({router, url}) => {
    const {loading, data} = useComicQuery({variables: {name: decodeURIComponent(router.query.comic)}});
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
            <Layout
                twitterCard={{
                    card: 'summary',
                    image: data.comic.cover ? `${url}/uploads/${data.comic.cover.filename}?format=webp&width=${384 * 2}&height=${412.8 * 2}` : null,
                    title: `${data.comic.type === 'MANHWA' ? "مانهوا" : "مانجا"} ${data.comic.name}`,
                    site: '@mydlala',
                    description: `جميع فصول  ${data.comic.name} مترجمة بالعربية. اقرا فصول ${data.comic.name} الآن.`
                }}
                title={`${data.comic.type === 'MANHWA' ? "مانهوا" : "مانجا"} ${data.comic.name}`}
                description={`جميع فصول  ${data.comic.name} مترجمة بالعربية. اقرا فصول ${data.comic.name} الآن.`}
            >
                <Comisc comic={data.comic}/>
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


export default withRouter(Comic1)
