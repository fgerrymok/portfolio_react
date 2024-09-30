import { useEffect, useState } from "react";
// import "../styles/main.scss";
import { restBase } from "../utilities/Utilities";

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
                console.log(data)
                setWorksLoaded(true);
            }
        }
        fetchWorksPosts();
    }, [worksPath])

    return (
        <>
            <h1>This is the homepage.</h1>
            {homepageLoaded ? 
                <section>
                    <h2>{homepageData.acf.name}</h2>
                    <h3>{homepageData.acf.title}</h3>
                    <p>{homepageData.acf.short_biography}</p>
                </section>
            : 
                <h2>Loading...</h2>
            }
            <h2>Works</h2>
            {worksLoaded ? 
                worksData.map(work => (
                    <section key={work.id}>
                        <h3>{work.acf.works_title}</h3>
                        <img className="works-card-image" src={work.acf.works_image} alt={work.acf.works_title} />
                        <ul>
                            {work.acf.main_toolkit.map((tool, index) => (
                                <li key={`${tool}-${index}`}>{tool}</li>
                            ))}
                        </ul>
                        <p>{work.acf.works_short_description}</p>
                    </section>
                ))
            : 
                <h2>Loading...</h2>
            }
        </>
    )
}

export default Homepage;