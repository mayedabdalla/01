import {container} from "./container.module.css";
import {header} from "./header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header className={header}>
            <div className={container}>
                <h1><Link href="/"><a>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</a></Link></h1>
                <nav>
                    <Link href="/new">
                        <a>إضافة</a>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;