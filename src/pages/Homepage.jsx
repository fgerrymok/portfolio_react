import { useEffect, useState } from "react";
// import "../styles/main.scss";
import { restBase } from "../utilities/Utilities";
import { Link } from "react-router-dom";

function Homepage() {
    const homepagePath = restBase + "pages/9";
    const worksPath = restBase + "fm-works?acf_format=standard";
    const [homepageData, setHomepageData] = useState({});
    const [worksData, setWorksData] = useState({});
    const [homepageLoaded, setHomepageLoaded] = useState(false);
    const [worksLoaded, setWorksLoaded] = useState(false);

    // Fetch JSON data for Homepage
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

    // fetch JSON data for Works
    useEffect(() => {
        async function fetchWorksPosts() {
            const response = await fetch(worksPath);
            if ( response.ok ) {
                const data = await response.json();
                setWorksData(data);
                setWorksLoaded(true);
            }
        }
        fetchWorksPosts();
    }, [worksPath])
    console.log(homepageData)
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

            <section className="homepage-works">
                <h2 id="works">Works</h2>
                {worksLoaded ? 
                    worksData.map(work => (
                        <Link to={work.slug} key={work.id} className="works-link">
                            <section className="works-card">
                                <h3>{work.acf.works_title}</h3>
                                <img className="works-card-image" src={work.acf.works_image} alt={work.acf.works_title} />
                                <ul className="homepage-toolkit">
                                    {work.acf.main_toolkit.map((tool, index) => (
                                        <li key={`${tool}-${index}`}>{tool}</li>
                                    ))}
                                </ul>
                                <p>{work.acf.works_short_description}</p>
                            </section>
                        </Link>
                    ))
                : 
                    <h2>Loading...</h2>
                }
            </section>

            {homepageLoaded ? 
                <>
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
                </>
            :
                <p>Not loaded...</p>
            }

            <section id="skills" className="homepage-skills">

            </section>
        </div>
        </>
    )
}

export default Homepage;