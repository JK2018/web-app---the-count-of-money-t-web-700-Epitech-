import axios from "axios"
import config from "./config";

const article = {

    getFeed: (rssUrl) => {
        return axios("https://api.rss2json.com/v1/api.json?rss_url="+rssUrl).then((response) => (response));
    }
};

export default article;