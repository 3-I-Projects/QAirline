import React, { useEffect, useState } from 'react'
import '../style/AnnouncementSection.css'


const AnnouncementSection = () => {
	const [announcements, setAnnouncements] = useState([]);
	const fetchAnnouncements = async () => {
		try {
			const response = await fetch('http://localhost:8000/posts/announcements/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			const res = await response.json();
			setAnnouncements(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchAnnouncements();
	}, []);

	const thumbnailStyle = {
		width: '100px',
		height: '100px',
	};

	return (
		<div className='container'>
			<h1>Announcements</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{announcements.map((announcement) => (
					<div key={announcement.id}>
						<img src={announcement.thumbnail} alt="" style={thumbnailStyle}/>
						<h3>{announcement.title}</h3>
						<p>{announcement.body}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default AnnouncementSection;