import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FlightAdd = () => {
	const [input, setInput] = useState({
		"title": "",
		"short_description": "",
		"body": "",
		"status": null,
		"thumbnail": null,
		"start_date": null,
		"end_date": null,
		"alert_level": null
	});
	const navigate = useNavigate();

	const handleSubmitEvent = async (e) => {
		e.preventDefault();

		if (input.code !== '' && input.city !== '' && input.name !== '') {
			try {
				const response = await fetch('http://localhost:8000/posts/announcements/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
					},
					body: JSON.stringify(input)
				});

				if (!response.ok) {
					alert('Invalid input!');
					return;
				}

				const res = await response.json();

				if (res) {
					alert('Added!');
					navigate('/admin/posts');
					return;
				} else {
					alert('Invalid input');
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;

		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<form onSubmit={handleSubmitEvent}>
			<div className="form-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					onChange={handleInput}
					required
				/>
			</div>

			<div>
				<label htmlFor="short_description">Short Description</label>
				<input
					type="text"
					name="short_description"
					onChange={handleInput}
					required
				/>
			</div>

			<div>
				<label htmlFor="body">Body</label>
				<textarea
					name="body"
					onChange={handleInput}
					required
				/>
			</div>

			<div>
				<label htmlFor="status">Status</label>
				<select name="status" onChange={handleInput} required defaultValue={'DEFAULT'}>
					<option value="DEFAULT" disabled onChange={handleInput}>Select status</option>
					<option value="draft">Draft</option>
					<option value="published">Published</option>
				</select>
			</div>

			<div>
				<label htmlFor="thumbnail">Thumbnail (Not working)</label>
				<input
					type="file"
					name="thumbnail"
				/>
			</div>

			<div>
				<label htmlFor="start_date">Start Date</label>
				<input
					type="datetime-local"
					name="start_date"
					onChange={handleInput}
					required
				/>
			</div>

			<div>
				<label htmlFor="end_date">End Date</label>
				<input
					type="datetime-local"
					name="end_date"
					onChange={handleInput}
					required
				/>
			</div>

			<div>
				<label htmlFor="alert_level">Alert Level</label>
				<select name="alert_level" onChange={handleInput} required defaultValue={'DEFAULT'}>
					<option value="DEFAULT" disabled onChange={handleInput}>Select alert level</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
			</div>

			<button type="submit">Add</button>
		</form>
	)
}

export default FlightAdd