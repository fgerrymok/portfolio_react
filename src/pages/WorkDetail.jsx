import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { restBase } from "../utilities/Utilities";

function WorkDetail() {
    // grab the param and use it to make an API call
    const { work } = useParams();
    const restPath = restBase + `fm-works?acf_format=standard&slug=${work}`;
    const [workData, setWorkData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function getWorkDetails() {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setWorkData(data[0]);
                setIsLoaded(true);
                console.log(data)
            }
        }
        getWorkDetails();
    }, [restPath])
    return(
        <>
            {isLoaded ?
            <section>
                <h1>{workData.acf.works_title}</h1>
                <img src={workData.acf.works_image} alt={workData.acf.works_title} className="works-card-image"></img>
                <p>{workData.acf.works_short_description}</p>
                <ul className="homepage-toolkit">
                    {workData.acf.main_toolkit.map((tool, index) => (
                        <li key={`${tool}-${index}`}>{tool}</li>
                    ))}
                </ul>
            </section>
            :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default WorkDetail;