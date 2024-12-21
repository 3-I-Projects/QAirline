import React, { useEffect, useState } from 'react'
import '../style/NewsSection.css'


const NewsSection = () => {
    const [news, setNews] = useState([]);
    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:8000/posts/news/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const res = await response.json();
            setNews(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const thumbnailStyle = {
        width: '100px',
        height: '100px',
    };

    return (
        <div>
            <h1>News</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {news.map((new_) => (
                    <div key={new_.id}>
                        <img src={new_.thumbnail} alt="" style={thumbnailStyle}/>
                        <h3>{new_.title}</h3>
                        <p>{new_.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsSection