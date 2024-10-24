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
            <h3 id="works" className="works-title"><span className="code-design">/</span> Works</h3>
            {worksLoaded ?
                worksData.map(work => (
                    <div key={work.id} className="work-card">
                        <Link to={work.slug} className="works-link">
                            <section className="works-card">
                                <h4>{work.acf.works_title}</h4>
                                {work.acf.works_gallery ?                                 
                                    <img className="works-card-image" src={work.acf.works_gallery[0].link} alt={work.acf.works_gallery.alt} />
                                : null
                                }
                                <ul className="homepage-toolkit">
                                    {work.acf.main_toolkit.map((tool, index) => (
                                        <li key={`${tool}-${index}`}>{tool}</li>
                                    ))}
                                </ul>
                                <p>{work.acf.work_excerpt}</p>
                            </section>
                        </Link>
                    </div>
                ))
            : 
                <h3>Loading...</h3>
            }
        </section>
    )
}

export default WorkCards;