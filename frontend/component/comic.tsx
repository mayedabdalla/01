import Cover from "./cover";
import Link from "next/link";
// import {Comic} from "../generated/graphql"
import {useRouter} from 'next/router'
import styles from './comic.module.css'
import {container } from './container.module.css';
type Props = {
    comic: Comic
}
const Comic = ({comic}: Props) => {
    const router = useRouter()
    return (
        <article className={`${styles.comic} ${container}`}>
            <div className={styles.info}>
                <div className={styles.cover}>
                    <Cover cover={comic.cover}/>
                </div>
                <div className={styles.desc}>
                    <h2>{comic.name}</h2>
                    <p>النوع: {comic.type === "MANHWA" ? "مانهوا" : "مانجا"}</p>
                    <h3>الوصف</h3>
                    <p>{comic.text ? comic.text : "لم يضاف إليها وصف"}</p>
                </div>
            </div>
            <div>
                <h3>الفصول</h3>
                <Link href='/[comic]/add' as={`${router.asPath}/add`}>
                    <a>إضافة فصل</a>
                </Link>
                {comic.chapters ?
                    (
                        <ul>
                            {comic.chapters?.map(chapter => {
                                return (<li key={chapter.id}>
                                    <Link
                                        href='/[comic]/[chapter]'
                                        as={`${router.asPath}/${chapter.id}`}>
                                        <a>{chapter.name}</a>
                                    </Link>
                                </li>)
                            })}
                        </ul>
                    ) :
                    (<p>ليس هناك فصل</p>)
                }
            </div>
        </article>
    )
}
export default Comic;