import { useEffect, useState } from "react";
import "../App.css";
import { restBase } from "../utilities/Utilities";

function Homepage() {
    const restPath = restBase + "pages/9";
    const [restData, setRestData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchWordPressData() {
            const response = await fetch(restPath);
            if ( response.ok ) {
                const data = await response.json();
                setRestData(data);
                setIsLoaded(true);
            }
        }
        fetchWordPressData();
    }, [restPath])

    return (
        <>
            <h1>This is the homepage.</h1>
            {isLoaded ? 
                <section>
                    <h2>{restData.acf.name}</h2>
                    <h3>{restData.acf.title}</h3>
                    <p>{restData.acf.short_biography}</p>
                </section>
            : 
                <h2>Loading...</h2>
            }
        </>
    )
}

export default Homepage;