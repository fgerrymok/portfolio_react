import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { restBase, toggleNav } from "../utilities/Utilities";
import { Link } from "react-router-dom";
import { Context } from "../App";

function WorkDetail() {
    // grab the param and use it to make an API call
    const { work } = useParams();
    const restPath = restBase + `fm-works?acf_format=standard&slug=${work}`;
    const [workData, setWorkData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [menuActive, setMenuActive] = useContext(Context);

    useEffect(() => {
        async function getWorkDetails() {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setWorkData(data[0]);
                setIsLoaded(true);

            }

        }
        getWorkDetails();
    }, [restPath])
    
    return(
        <>
            {isLoaded ? (
                workData.id === 35 || workData.id === 38 || workData.id === 40 ? 
                    <div className="work-detail-main" onClick={() => {menuActive ? toggleNav(menuActive, setMenuActive) : null}}>
                        
                        <section className="left-section">
                            <h1>{workData.acf.works_title}</h1>
                            <div className="work-detail-work-description">
                                <h2>{workData.acf.works_description_title}</h2>
                                <p>{workData.acf.works_short_description}</p>
                            </div>
                            {/* Change the toolkit title to ACF later */}
                            <div className="work-detail-toolkit">
                                <h2>Toolkit</h2>
                                <ul className="homepage-toolkit">
                                    {workData.acf.main_toolkit.map((tool, index) => (
                                        <li key={`${tool}-${index}`}>{tool}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="work-detail-highlights">
                                <h2>{workData.acf.highlights_title}</h2>
                                {workData.acf.highlights.map((highlight) => (
                                    <article key={highlight.highlight_title} className="single-highlight">
                                        <h3>{highlight.highlight_title}</h3>
                                        <p>{highlight.highlight_description}</p>
                                        <video autoPlay loop muted className="demo-video">
                                            <source src={highlight.demo_video} type="video/mp4"/>
                                        </video>
                                    </article>
                                ))}
                            </div>
                        </section>
                        <div className="invisible-right-container"></div>
                        <section className="right-section">
                            <div className="work-detail-gallery">
                                <h2>{workData.acf.gallery}</h2>
                                <img src={workData.acf.works_image} alt={workData.acf.works_title} className="works-card-image"></img>
                            </div>
                            <div className="links-and-return">
                                <div className="work-detail-links">
                                    <Link to={workData.acf.live_site_link} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 .685-.07 1.354-.202 2h-3.853c.121-1.283.129-2.621 0-4h3.853c.132.646.202 1.315.202 2zm-.841-4h-3.5c-.383-1.96-1.052-3.751-1.948-5.278 2.435.977 4.397 2.882 5.448 5.278zm-5.554 0h-2.605v-5.658c1.215 1.46 2.117 3.41 2.605 5.658zm-4.605-5.658v5.658h-2.605c.488-2.248 1.39-4.198 2.605-5.658zm0 7.658v4h-2.93c-.146-1.421-.146-2.577 0-4h2.93zm0 6v5.658c-1.215-1.46-2.117-3.41-2.605-5.658h2.605zm2 5.658v-5.658h2.605c-.488 2.248-1.39 4.198-2.605 5.658zm0-7.658v-4h2.93c.146 1.421.146 2.577 0 4h-2.93zm-4.711-11.278c-.896 1.527-1.565 3.318-1.948 5.278h-3.5c1.051-2.396 3.013-4.301 5.448-5.278zm-6.087 7.278h3.853c-.121 1.283-.129 2.621 0 4h-3.853c-.132-.646-.202-1.315-.202-2s.07-1.354.202-2zm.639 6h3.5c.383 1.96 1.052 3.751 1.948 5.278-2.435-.977-4.397-2.882-5.448-5.278zm12.87 5.278c.896-1.527 1.565-3.318 1.948-5.278h3.5c-1.051 2.396-3.013 4.301-5.448 5.278z"/></svg>
                                    </Link>
                                    <Link to={workData.acf.github_link} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </Link>
                                </div>
                                <div className="return-to-home">
                                    <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
                                        <p>Return to Home</p>
                                    </Link>
                                </div>
                            </div>
                        </section>
        
                    </div>
                :
                    <div className="work-detail-main">
                        <div className="under-construction">
                            <svg className="under-construction-svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.503384" d="M218 114C207.781 109.763 154.466 96.9807 154.003 84.1942C153.821 79.1711 163.082 56.6235 198.713 64.7485C220.618 69.7438 218.862 91.1757 216.415 100.38C215.24 104.802 209.03 107.489 206.47 111.291" stroke="#000000" strokeOpacity="0.9" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M201 117.298C184.868 158.187 136.401 145.476 150.559 100" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M148 160C142.818 180.198 139.446 255.845 132.989 271.659C125.3 290.488 106.806 314.605 94 330.289L104.368 338" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M192 337.972C190.266 338.205 176.583 336.923 175.993 336.548C175.402 336.172 175.993 256.168 159 223.477L169.475 163" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M146 159.005C102.339 158.613 92.0143 182.286 137.795 202" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M172 165C186.105 183.05 196.892 207.331 211 224" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M96 203C150.657 211.5 190.692 213.45 245 220" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M258.602 205.264C258.59 210.596 247.596 234.326 252.071 238.962C267.089 254.519 327.744 243.246 297.814 215.374C289.444 207.58 275.964 204.476 261.737 203" stroke="#000000" strokeOpacity="0.9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <p className="under-construction-text">Project Under Construction.</p>
                            <div className="return-to-home">
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
                                    <p>Return to Home</p>
                                </Link>
                            </div>
                        </div>
                    </div>
            )
            :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default WorkDetail;