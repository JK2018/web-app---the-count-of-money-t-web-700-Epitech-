import React, { useState, useEffect } from "react"
import { Chip, IconButton, Grid, FormGroup } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import { renderNews, filterNews } from '../utils/articles';
import "../assets/css/articles.css";

// API
import articleApi from "../api/article";
import userApi from "../api/user";

const Articles = (props) => {

    const [filters, setFilters] = useState("");
    const [news, setNews] = useState([]);

    function addFilter() {
        var filterInput = document.getElementById('filter-input');
   
        var filter = filterInput.value;
        filterInput.value = "";

        if (filter !== "" && !filters.find(item => item === filter)) {
            var updatedFilters = [...filters, filter];
            setFilters(updatedFilters);
            
            // Save filters for this user
            if (props.logged) {
                userApi.updateProfile({articleKeywords: updatedFilters});
            }
        }
    }

    useEffect(() => {
        // Reload articles
        if (props.logged) {
            articleApi.getArticles(props.logged).then((posts) => setNews(posts.data));
        } else {
            articleApi.getArticles().then((posts) => {
                filterNews(posts.data, filters).then(filteredNews => setNews(filteredNews));
            });
        }

        if (filters === "") {
            if (props.logged) {
                userApi.get().then((user) => setFilters(user.articleKeywords));
            } else {
                setFilters([]);
            }
        }
    
    }, [filters]);

    console.log(news);
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            addFilter();
        }
    }

    const handleDelete = (filterToDelete) => () => {

        var updatedFilters = filters.filter((filter) => filter !== filterToDelete);
        setFilters(updatedFilters);
        
        // Save filters for this user
        if (props.logged) {
            userApi.updateProfile({articleKeywords: updatedFilters});
        }
    };

    return (
        <div className="articles">
            <Grid container className="filters">
                <FormGroup className="inline-form">
                    <TextField                    
                        className="inline-input"
                        id="filter-input"
                        label="Add new filter"
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                    <IconButton 
                        className="inline-button" 
                        color="primary" 
                        aria-label="add" 
                        onClick={addFilter}
                    >
                        <AddCircleIcon/>
                    </IconButton>
                </FormGroup>
                <div className="list">
                    {filters && filters.map(filter => (
                        <Chip className="tag" key={filter} label={filter} onDelete={handleDelete(filter)} color="primary" variant="outlined" />
                    ))}
                </div>
            </Grid>
            <Grid container className="news small">
                {renderNews(news, "small")}
            </Grid>
        </div>
    )
}
export default Articles;
