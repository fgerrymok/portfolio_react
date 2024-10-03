import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { restBase } from "../utilities/Utilities";

function WorkCards() {
    const worksPath = restBase + "fm-works?acf_format=standard";
    const [worksData, setWorksData] = useState({});
    const [worksLoaded, setWorksLoaded] = useState(false);

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
    console.log(worksData)
    return(
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
    )
}

export default WorkCards;