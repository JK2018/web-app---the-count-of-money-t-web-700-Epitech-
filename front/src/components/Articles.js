import React, { useState, useEffect } from "react"
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { renderNews, getRSSFeed } from '../utils/articles';
import "../assets/css/articles.css";

const Articles = () => {

    const [filters, setFilters] = useState([]);
    const [news, setNews] = useState([]);

    function handleFiltersChange(event) {
        var value = event.target.value;
        var updatedFilters = value.split(" ");
        updatedFilters = updatedFilters.filter((filter) => filter !== "");
        setFilters(updatedFilters);
    }

    useEffect(() => {
        getRSSFeed(filters).then((posts) => setNews(posts));
    }, [filters]);

    return (
        <div className="articles">
            <Grid container>
                <TextField className="filters" label="Filters" fullWidth onChange={event => handleFiltersChange(event)}/>
            </Grid>
            <Grid container className="news small">
                {renderNews(news, "small")}
            </Grid>
        </div>
    )
}
export default Articles;
