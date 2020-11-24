import axios from "axios"

const article = {

    getFeed: (rssUrl) => {
        return new Promise((resolve, reject) => {
            axios("https://api.rss2json.com/v1/api.json?rss_url="+rssUrl)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
};

export default article;