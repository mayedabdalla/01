import {ReactNode, useEffect} from 'react'
import Head from "next/head";
import ReactGA from "react-ga"

import Header from "./header";
import Footer from "./footer";
import {layout} from "./layout.module.css"

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


const Layout = ({children, title, description, twitterCard, ...props}: Props) => {
    useEffect(() => {
        ReactGA.initialize('UA-174179875-1');
        ReactGA.pageview(window.location.pathname);
    });
    return (<>
        <style jsx global>{`
            
            label, textarea {
                display: block;
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
        <div className={layout}>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    </>)
}
export default Layout