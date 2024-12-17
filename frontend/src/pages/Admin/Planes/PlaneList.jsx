import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const PlaneList = () => {
    const [planes, setPlanes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchPlanes = async () => {
                try {
                    const response = await fetch('http://localhost:8000/flights/planes', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        },
                    });
    
                    const res = await response.json();
                    setPlanes(res);
                } catch (err) {
                    console.log(err);
                }
            };
    
            fetchPlanes();
        }, []);

        const handleDeleteAction = async (id) => {
            try {
                const response = await fetch('http://localhost:8000/flights/planes/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                });
                let newPlanesList = planes.filter((plane) => plane.id !== id);
                setPlanes(newPlanesList);
            } catch (err) {
                console.log(err);
            }
        }

        const goToAddPlane = () => {
            navigate('/admin/planes/add');
        };
  return (
    <div>
			<h2>Planes List</h2>
			<button onClick={goToAddPlane}>Add a plane</button>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Registration Number</th>
						<th>Manufacturer</th>
						<th>Model</th>
					</tr>
				</thead>
				<tbody>
					{planes.map((plane) => (
						<tr key={plane.registration_number}>
							<td>
								<Link to={'/admin/planes/detail'} state={{plane: plane}}>{plane.registration_number}</Link>
							</td>
							<td>{plane.manufacturer}</td>
							<td>{plane.model}</td>
							<td>
								<button onClick={() => handleDeleteAction(plane.id)}>Delete plane</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
  )
}

export default PlaneList