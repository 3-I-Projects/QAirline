import React, { useEffect, useState } from 'react'
import '../style/AnnouncementsSection.css'
import Background from '../Background';


const AnnouncementsSection = () => {
	const [announcements, setAnnouncements] = useState([]);
	const fetchAnnouncements = async () => {
		try {
			const response = await fetch('http://localhost:8000/posts/announcements/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
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

	return (
		<div className='announcements-section-container'>
			<h1>Announcements</h1>
			<div className='all-announcements-container'>
				{announcements.map((announcement) => (
					<div key={announcement.id} style={{margin: '10px', width: '200px', height: '300px'}}>
						<img src={announcement.thumbnail} style={{width: '100%', height: '200px'}} />
						<div style={{backgroundColor: '#79D7BE', padding: '10px', width: '100%', height: '100px'}}>
							<h3>{announcement.title}</h3>
							<p>{announcement.body}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AnnouncementsSection