import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {LazyImage} from "../../component/lazy-image";
import Head from "next/head";

const QUERY = gql`

    query($id: Int){
        chapter(id: $id){
            name
            comic {
                name
            },
            pages {
                id
                height
                width
                image {
                    id
                    link
                    filename
                }
            }
        }
    }

`;

export default () => {
    const router = useRouter();
    const {comic, chapter} = router.query;
    const {loading, data} = useQuery(QUERY, {
        variables: {
            id: parseInt(chapter as string)
        }
    });
    if (loading || !data) {
        return <h1>loading...</h1>;
    }
    return (
        <>
            <style jsx global>{`
                body {
                    padding: 0;
                    margin: 0;
                }
            `}</style>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta charSet="utf-8"/>
                <title>{`${data.chapter.name} / ${data.chapter.comic.name}`}</title>
            </Head>
            {data.chapter.pages.map((page, i) => {
                return <LazyImage key={i} page={page}/>
            })}
        </>
    )
}