import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Link from "next/link";
import Cover from "./cover";
import {useComicsQuery} from "../generated/graphql";

const QUERY = gql`
    {
        comics {
            id
            name
            slug
            type
            cover {
                filename
            }
        }
    }
`;
const List = () => {
    const {loading, data} = useComicsQuery();
    if (loading || !data) {
        return <h1>loading...</h1>;
    }
    return (
        <>
            <style jsx>{`
                ul {
                    list-style-type: none;
                    margin-right: 0;
                    padding-right: 0;
                    margin-top: 0;
                    margin-bottom: 0;
                }
                // li {
                //     height: 100%;
                // }
                // li:nth-child(odd) {
                //     background: grey;
                // }
                
                .comic {
                    color: black;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    text-decoration: none;
                    margin-bottom: 10px;
                    border-radius: 5px;
                }
                .comic .info {
                    padding: 10px 15px 24px;
                    background: #F2F2F2;
                }
                .comic .type {
                    background: #FF87A3;
                    border-radius: 10px;
                    display: inline-block;
                    padding: 5px 10px;
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                }
                .comic .title {
                    margin: 0;
                    margin-top: 12px;
                    font-size: 27px;
                    padding-right: 10px;
                    color: #2B3DC2;
                }
                .comic .cover {
                    flex-basis: 100%;
                }
                @media (min-width: 768px) {
                    .comic {
                        flex-direction: row;
                    }
                    .comic .info {
                        padding-right: 7px;
                        flex-basis: 100%;
                    }
                    
                    .comic .cover {
                        flex-basis: 40%;
                        background: yellow;
                    }
                }
                @media (min-width: 992px) {
                    .comic .cover {
                        flex-basis: 25%;
                    }

                }
            `}</style>
            <h2>كافة المانهوا</h2>
            <ul>
                {data.comics?.map(comic => (
                    <li key={comic.id}>
                        <Link href="/[comic]" as={`/${encodeURIComponent(comic.name)}`}>
                            <a className='comic'>
                                <div className='cover'>
                                    <Cover cover={comic.cover}/>
                                </div>
                                <div className='info'>
                                    <div className='type'>{comic.type == 'MANHWA'?"مانهوا": "مانجا" }</div>
                                    <h3 className='title'>{comic.name}</h3>
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};
export default List;