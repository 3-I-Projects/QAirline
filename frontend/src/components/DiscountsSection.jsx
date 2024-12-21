import React, { useEffect, useState } from 'react'
import '../style/DiscountsSection.css'


const DiscountsSection = () => {
	const [discounts, setDiscounts] = useState([]);
	const fetchDiscounts = async () => {
		try {
			const response = await fetch('http://localhost:8000/posts/discounts/', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const res = await response.json();
			setDiscounts(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchDiscounts();
	}, []);

	const thumbnailStyle = {
		width: '100px',
		height: '100px',
	};

	return (
		<div>
			<h1>Discounts</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{discounts.map((discount) => (
					<div key={discount.id}>
						<img src={discount.thumbnail} alt="" style={thumbnailStyle}/>
						<h3>{discount.title}</h3>
						<p>{discount.body}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default DiscountsSection