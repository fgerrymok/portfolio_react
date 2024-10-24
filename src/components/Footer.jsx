import { useContext } from "react";
import { toggleNav } from "../utilities/Utilities";
import { Context } from "../App";

function Footer() {
    const currentYear = new Date().getFullYear();
    const [menuActive, setMenuActive] = useContext(Context);

    return (
        <>
            <footer onClick={() => {menuActive ? toggleNav(menuActive, setMenuActive) : null}}>
                <p>&copy; {currentYear} Frazer Mok</p>
            </footer>
        </>
    )
}

export default Footer;