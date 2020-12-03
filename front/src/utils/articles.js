import Grid from "@material-ui/core/Grid";
import parse from "html-react-parser";

// API
import articleApi from "../api/article"; 

// Img
import sadFace from "../assets/img/sad.svg";

export function renderNews(news, gridSize = "large") {

    var xlCol = (gridSize === "large") ? 4 : 3;
    var lgCol = (gridSize === "large") ? 4 : 3;

    if (news.length > 0) {
        return news.map((item, i) => (
            <Grid className="new-container" item xl={xlCol} lg={lgCol} md={4} sm={6} xs={12} key={i}>
                <a href={item.link} target="_blank" rel="noreferrer" className="new-content">
                    <h3>{item.title}</h3>
                    {parse(item.description)}
                </a>
            </Grid>
        ))
    }
    return <div className="no-news"><img src={sadFace} alt="sad-face"/><p>No news related to this currency ...</p></div>
}

export function getRSSFeed(filters) {
 
    return new Promise((resolve, reject) => {
        // rss2json.com mandatory to prevent CROS Request error
        articleApi.getFeed("https://cointelegraph.com/rss")
            .then(function (response) {
                if (response.data.feed && response.data.items.length > 0) {
                    var posts = response.data.items;
                    if (filters.length > 0) {
                        posts = posts.filter(function(item) {

                            // Check if article contains filters
                            // If one filter not matches, post is ingored
                            return !filters.some((filter) => {
                                
                                // Set filter to lower case
                                filter = filter.toLowerCase();
        
                                // Check if filter not matches with categories
                                // Check if filter is not include in title
                                // Check if filter is not include in description
                                // Check if filter is not include in content
                                return (!item.categories.some(category => category.toLowerCase().includes(filter))
                                    && !item.title.toLowerCase().includes(filter)
                                    && !item.description.toLowerCase().includes(filter) 
                                    && !item.content.toLowerCase().includes(filter)
                                );
                            })
                        })
                    }
                    resolve(posts);
                }
            })
            .catch((error) => {
                reject(error);
            })
    });
}