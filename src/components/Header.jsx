import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App";
import { toggleNav } from "../utilities/Utilities";

function Header() {
    const [menuActive, setMenuActive] = useContext(Context);

    return (
        <>
            <header onClick={() => {menuActive ? toggleNav(menuActive, setMenuActive) : null}}>
                <button className={menuActive ? "menu-button-fixed" : "menu-button"} onClick={() => {toggleNav(menuActive, setMenuActive)}}>
                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z" fillRule="nonzero"/></svg>
                </button>
                <div className={menuActive ? "show-menu" : "hide-menu"} onClick={() => {menuActive ? toggleNav(menuActive, setMenuActive) : null}}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/#works">Works</Link></li>
                        <li><Link to="/#skills">Skills</Link></li>
                        <li><Link to="/#about">About</Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header;