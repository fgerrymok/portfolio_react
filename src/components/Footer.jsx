function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer>
                <p>&copy; {currentYear} Frazer Mok</p>
            </footer>
        </>
    )
}

export default Footer;