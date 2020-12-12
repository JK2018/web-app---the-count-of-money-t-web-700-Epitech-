import Grid from "@material-ui/core/Grid";
import parse from "html-react-parser";

// Img
import sadFace from "../assets/img/sad.svg";    

export function renderNews(news, gridSize = "large") {

    var xlCol = (gridSize === "large") ? 4 : 3;
    var lgCol = (gridSize === "large") ? 4 : 3;

    if (news.length > 0) {
        return news.map((item, i) => (
            <Grid className="new-container" item xl={xlCol} lg={lgCol} md={4} sm={6} xs={12} key={i}>
                
                <a href={item.urlArticle} target="_blank" rel="noreferrer" className="new-content">
                    <h3>{item.title}</h3>
                    {parse(item.summary)}
                </a>
            </Grid>
        ))
    }
    return <div className="no-news"><img src={sadFace} alt="sad-face"/><p>No news related to this currency ...</p></div>
}

export function filterNews(news, filters) {
 
    return new Promise((resolve, reject) => {
        if (news && news.length > 0) {
            if (filters.length > 0) {
                news = news.filter(function(item) {

                    // Check if article contains filters
                    // If one filter not matches, post is ingored
                    return !filters.some((filter) => {
                        
                        // Set filter to lower case
                        filter = filter.toLowerCase();

                        // Check if filter is not include in title
                        // Check if filter is not include in description
                        return (!item.title.toLowerCase().includes(filter) && !item.summary.toLowerCase().includes(filter));
                    })
                })
            }
        }
        resolve(news);
    });
}