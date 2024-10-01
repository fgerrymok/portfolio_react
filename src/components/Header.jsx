import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <ul className="header">
                <Link to="/">Home</Link>
                <Link to="/#works">Works</Link>
                <Link to="/#skills">Skills</Link>
                <Link to="/#about">About</Link>
            </ul>
        </>
    )
}

export default Header;