import { useEffect, useState } from "react";
import { restBase } from "../utilities/Utilities";
import WorkCards from "../components/WorkCards";

function Homepage() {
    const homepagePath = restBase + "pages/9";
    const [homepageData, setHomepageData] = useState({});
    const [homepageLoaded, setHomepageLoaded] = useState(false);

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
        <div className="main">
            <section className="hero-section">
                <section className="socials-box"></section>
                {homepageLoaded ? 
                    <section className="dev-info">
                        <h1>{homepageData.acf.name}</h1>
                        <h2>{homepageData.acf.title}</h2>
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
        </>
    )
}

export default Homepage;