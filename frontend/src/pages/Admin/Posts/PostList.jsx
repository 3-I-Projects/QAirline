import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PostList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [informations, setInformations] = useState([]);
  const [news, setNews] = useState([]);

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
  }

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/discounts/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      const res = await response.json();
      setDiscounts(res);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchInformations = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/informations/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      const res = await response.json();
      setInformations(res);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts/news/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      const res = await response.json();
      setNews(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAnnouncements();
    fetchDiscounts();
    fetchInformations();
    fetchNews();
  }, []);

  const handleDeleteAction = async (postType, id) => {
		try {
			const response = await fetch('http://localhost:8000/posts/' + postType +'/' + id + '/', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});

			if (postType === 'announcements') {
        let newAnnouncementsList = announcements.filter((announcement) => announcement.id !== id);
        setAnnouncements(newAnnouncementsList);
      } else if (postType === 'discounts') {
        let newDiscountsList = discounts.filter((discount) => discount.id !== id);
        setDiscounts(newDiscountsList);
      } else if (postType === 'informations') {
        let newInformationsList = informations.filter((information) => information.id !== id);
        setInformations(newInformationsList);
      } else if (postType === 'news') {
        let newNewsList = news.filter((new_) => new_.id !== id);
        setNews(newNewsList);
      }
		} catch (err) {
			console.log(err);
		}
	}

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2>Announcements</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td><Link to={'/admin/posts/detail'} state={{announcement: announcement}}>{announcement.title}</Link></td>
                <td>{announcement.body}</td>
                <td><button onClick={() => handleDeleteAction('announcements', announcement.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Discounts</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.title}</td>
                <td>{discount.body}</td>
                <td><button onClick={() => handleDeleteAction('discounts', discount.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Informations</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {informations.map((information) => (
              <tr key={information.id}>
                <td>{information.title}</td>
                <td>{information.body}</td>
                <td><button onClick={() => handleDeleteAction('informations', information.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>News</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {news.map((new_) => (
              <tr key={new_.id}>
                <td>{new_.title}</td>
                <td>{new_.body}</td>
                <td><button onClick={() => handleDeleteAction('news', new_.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostList