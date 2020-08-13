import {ReactNode, useEffect} from 'react'
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import ReactGA from "react-ga"

interface twitterCard {
    card: String
    description?: string
    title: string
    site?: string
    image?: string
}

type Props = {
    children?: ReactNode
    title?: string
    description?: string
    twitterCard?: twitterCard
}

const Header = () => {
    const router = useRouter()
    return (
        <>
            <style jsx>{`
                header {
                    display: flex;
                    align-items: center;
                }
                
                header nav {
                    margin-right: auto;
                }
                .header-mobile {
                    
                }
            `}
            </style>

            <header className={`header`}>
                <h1 className="logo"><Link href="/"><a>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</a></Link></h1>
                <nav>
                    <Link href="/new">
                        <a>إضافة</a>
                    </Link>
                </nav>
            </header>

        </>
    )
}

const Footer = () => {
    return (
        <footer>
            <p dir={"ltr"}>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_WEBSITE_TITLE}.</p>
        </footer>
    )
}

const Layout = ({children, title, description, twitterCard, ...props}: Props) => {
    useEffect(() => {
        ReactGA.initialize('UA-174179875-1');
        ReactGA.pageview(window.location.pathname);
    });
    return (<>
        <style jsx global>{`
            *, ::after, ::before {
                box-sizing: border-box;
            }

            body {
                font-family: "Geeza Pro",
                BlinkMacSystemFont,
                -apple-system,
                "Segoe UI",
                sans-serif;
                width: 100%;
                padding-right: 15px;
                padding-left: 15px;
                margin: 0 auto;
            }

            #__next {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }
/* Content */
main {
    flex-grow: 1;
}

/* Footer */
footer p{
    text-align: center;
    direction: ltr;
}

/* Form */
label, textarea {
    display: block;
}



/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    body {
        width: 540px;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    body {
        width: 720px;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    body {
        width: 960px;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    body {
        width: 1140px;
    }
}

        `}
        </style>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta charSet="utf-8"/>
            {description && (<meta name="description" content={description}/>)}

            {twitterCard && Object.keys(twitterCard)
                .filter((item) => (twitterCard[item]))
                .map((item) => (<meta name={`twitter:${item}`} content={twitterCard[item]}/>))
            }

            <title>{title ? `${title} - ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}` : process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title>
        </Head>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </>)
}
export default Layout