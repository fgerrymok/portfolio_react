import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { restBase } from "../utilities/Utilities";

function WorkCards() {
    const worksPath = restBase + "fm-works?acf_format=standard&orderby=date&order=asc";
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
    
    function getExcerpt(text, wordLimit) {
        const words = text.split(/\s+/);
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    }

    return(
        <section className="homepage-works">
            <h2 id="works" className="works-title">Works</h2>
            {worksLoaded ? 
                worksData.map(work => (
                    <div key={work.id} className="work-card">
                        <Link to={work.slug} className="works-link">
                            <section className="works-card">
                                <h3>{work.acf.works_title}</h3>
                                <img className="works-card-image" src={work.acf.works_image} alt={work.acf.works_title} />
                                <ul className="homepage-toolkit">
                                    {work.acf.main_toolkit.map((tool, index) => (
                                        <li key={`${tool}-${index}`}>{tool}</li>
                                    ))}
                                </ul>
                                <p>{getExcerpt(work.acf.works_short_description, 25)}</p>
                            </section>
                        </Link>
                    </div>
                ))
            : 
                <h2>Loading...</h2>
            }
        </section>
    )
}

export default WorkCards;