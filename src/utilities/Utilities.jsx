// This is the base endpoint used to make API fetch requests to our live wordpress site.
export const restBase = 'https://frazermok.com/portfolio_wordpress/wp-json/wp/v2/'

export function toggleNav(menuActive, setMenuActive) {
    if (menuActive === false) {
        setMenuActive(true);
    } else {
        setMenuActive(false);
    }
}