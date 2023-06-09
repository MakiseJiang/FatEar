import React, { useState, useEffect } from "react";
import "../static/css/App.css"



function NewsPage(props) {
    const[newsData, setNewsData] = useState({'new_reviews': [], 'new_songs': []});
    const fetchNews = async () => {
        fetch("/GetNews", {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
            setNewsData(data);
        });
    };


    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div>
            <h1>What's New</h1>
            {console.log(newsData)}
        </div>
    )
}

export default NewsPage;