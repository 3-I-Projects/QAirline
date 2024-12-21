import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const InformationAdd = () => {
	const [input, setInput] = useState({
        "title": "",
        "short_description": "",
        "body": "",
        "status": null,
        "thumbnail": null
    });

	const navigate = useNavigate();

	const handleSubmitEvent = async (e) => {
		e.preventDefault();

		if (input.code !== '' && input.city !== '' && input.name !== '') {
			try {
				const response = await fetch('http://localhost:8000/posts/informations/', {
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

			{/* <div>
				<label htmlFor="thumbnail">Thumbnail (Not working)</label>
				<input
					type="file"
					name="thumbnail"
				/>
			</div> */}
			<button type="submit">Add</button>
		</form>
	)
}

export default InformationAdd