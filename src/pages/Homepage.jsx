import { useEffect, useState, useContext } from "react";
import { restBase, toggleNav } from "../utilities/Utilities";
import WorkCards from "../components/WorkCards";
import { Link } from "react-router-dom";
import { Context } from "../App";

function Homepage() {
    const homepagePath = restBase + "pages/9";
    const [homepageData, setHomepageData] = useState({});
    const [homepageLoaded, setHomepageLoaded] = useState(false);
    const [menuActive, setMenuActive] = useContext(Context);

    useEffect(() => {
        async function fetchHomepageData() {
            const response = await fetch(homepagePath);
            if ( response.ok ) {
                const data = await response.json();
                setHomepageData(data);
                setHomepageLoaded(true);
            }
        }
        fetchHomepageData();
    }, [homepagePath])

    return (
        <>
        {homepageLoaded ? 
            <div className={menuActive ? "main-pushed-left" : "main"} onClick={() => {menuActive ? toggleNav(menuActive, setMenuActive) : null}}>
                <section className="hero-section">
                    <section className="socials-box">

                        <Link to="https://github.com/fgerrymok" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z"/></svg>
                        </Link>
                        <Link to="https://www.linkedin.com/in/frazermok/" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg>
                        </Link>
                        <Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55l-5.992-4.57h11.983l-5.991 4.57zm0 1.288l-6-4.629v6.771h12v-6.771l-6 4.629z"/></svg>
                        </Link>
                    </section>
                    {homepageLoaded ? 
                        <section className="dev-info">
                            <h1>{homepageData.acf.name}</h1>
                            <h2 className="wavy-text">
                                {homepageData.acf.title.split('').map((letter, index) => {
                                    let num = index;
                                    num ++;
                                    return <span style={{ '--i': num }} key={index}>{letter}</span>;
                                })}
                            </h2>
                            <p>{homepageData.acf.short_biography}</p>
                        </section>
                    : 
                        <h2>Loading...</h2>
                    }
                </section>
                
                <WorkCards />

                {homepageLoaded ? 
                    <div className="skills-and-about">
                        <section id="skills" className="homepage-skills">
                            <h2>{homepageData.acf.skills_title}</h2>
                            <ul className="homepage-toolkit">
                                {homepageData.acf.toolkit.map((tool, index) => (
                                    <li key={`${tool}-${index}`}>{tool}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="about" className="homepage-about">
                            <h2>{homepageData.acf.about_me_title}</h2>
                            <p>{homepageData.acf.biography}</p>
                        </section>
                    </div>
                :
                    <h2>Loading...</h2>
                }
            </div>
        :
            <div className="main">
                <h2>Loading...</h2>
            </div>
        }
        </>
    )
}

export default Homepage;