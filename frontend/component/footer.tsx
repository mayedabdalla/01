import {footer} from "./footer.module.css"
const Footer = () => {
    return (
        <footer className={footer}>
            <p dir={"ltr"}>&copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_WEBSITE_TITLE}.</p>
        </footer>
    )
}
export default Footer;