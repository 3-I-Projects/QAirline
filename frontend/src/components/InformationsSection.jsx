import React, { useEffect, useState } from 'react'
import '../style/InformationsSection.css'


const InformationsSection = () => {
    const [informations, setInformations] = useState([]);
    const fetchInformations = async () => {
        try {
            const response = await fetch('http://localhost:8000/posts/informations/', {
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
        fetchInformations();
    }, []);

    const thumbnailStyle = {
        width: '100px',
        height: '100px',
    };

    return (
        <div>
            <h1>Information</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {informations.map((information) => (
                    <div key={information.id}>
                        <img src={information.thumbnail} alt="" style={thumbnailStyle}/>
                        <h3>{information.title}</h3>
                        <p>{information.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InformationsSection