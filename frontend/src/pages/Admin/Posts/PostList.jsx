import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PostList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [informations, setInformations] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

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

  const fetchPosts = async () => {
    fetchAnnouncements();
    fetchDiscounts();
    fetchInformations();
    fetchNews();
  }

  const handleDeleteAction = async (postType, id) => {
    try {
      const response = await fetch('http://localhost:8000/posts/' + postType + '/' + id + '/', {
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

  const handlePublishAction = async (postType, id) => {
    try {
      const response = await fetch('http://localhost:8000/posts/' + postType + '/' + id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          status: 'published',
        }),
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnpublishAction = async (postType, id) => {
    try {
      const response = await fetch('http://localhost:8000/posts/' + postType + '/' + id + '/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          status: 'draft',
        }),
      });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  }

  const goToAddAnnouncement = () => {
    navigate('/admin/posts/addAnnouncement');
  }

  const goToAddDiscount = () => {
    navigate('/admin/posts/addDiscount');
  }

  const goToAddInformation = () => {
    navigate('/admin/posts/addInformation');
  }

  const goToAddNew = () => {
    navigate('/admin/posts/addNew');
  }

  const isoDateToLocale = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2>Announcements</h2>
        <button onClick={goToAddAnnouncement}>Add an announcement</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Description</th>
              <th>Body</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Created at</th>
              <th>Last Update</th>
              <th>Actions</th>
              <th>Status</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement.id}>
                <td><Link to={'/admin/posts/detail'} state={{ announcement: announcement }}>{announcement.title}</Link></td>
                <td>{announcement.short_description}</td>
                <td>{announcement.body}</td>
                <td>{isoDateToLocale(announcement.start_date)}</td>
                <td>{isoDateToLocale(announcement.end_date)}</td>
                <td>{isoDateToLocale(announcement.created_at)}</td>
                <td>{isoDateToLocale(announcement.last_update)}</td>
                <td>{announcement.author}</td>
                <td>{announcement.status}</td>
                <td>
                  <button onClick={() => handleDeleteAction('announcements', announcement.id)}>Delete</button>
                  {announcement.status === 'published' ? (
                    <button onClick={() => handleUnpublishAction('announcements', announcement.id)}>Unpublish</button>
                  ) : (
                    <button onClick={() => handlePublishAction('announcements', announcement.id)}>Publish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Discounts</h2>
        <button onClick={goToAddDiscount}>Add a discount</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Description</th>
              <th>Body</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Created at</th>
              <th>Last Update</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.title}</td>
                <td>{discount.short_description}</td>
                <td>{discount.body}</td>
                <td>{isoDateToLocale(discount.start_date)}</td>
                <td>{isoDateToLocale(discount.end_date)}</td>
                <td>{isoDateToLocale(discount.created_at)}</td>
                <td>{isoDateToLocale(discount.last_update)}</td>
                <td>{discount.author}</td>
                <td>{discount.status}</td>
                <td>
                  <button onClick={() => handleDeleteAction('discounts', discount.id)}>Delete</button>
                  {discount.status === 'published' ? (
                    <button onClick={() => handleUnpublishAction('discounts', discount.id)}>Unpublish</button>
                  ) : (
                    <button onClick={() => handlePublishAction('discounts', discount.id)}>Publish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Informations</h2>
        <button onClick={goToAddInformation}>Add an information</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Description</th>
              <th>Body</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {informations.map((information) => (
              <tr key={information.id}>
                <td>{information.title}</td>
                <td>{information.short_description}</td>
                <td>{information.body}</td>
                <td>{information.status}</td>
                <td>
                  <button onClick={() => handleDeleteAction('informations', information.id)}>Delete</button>
                  {information.status === 'published' ? (
                    <button onClick={() => handleUnpublishAction('informations', information.id)}>Unpublish</button>
                  ) : (
                    <button onClick={() => handlePublishAction('informations', information.id)}>Publish</button>
                  )}
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>News</h2>
        <button onClick={goToAddNew}>Add a new</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short Description</th>
              <th>Body</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((new_) => (
              <tr key={new_.id}>
                <td>{new_.title}</td>
                <td>{new_.short_description}</td>
                <td>{new_.body}</td>
                <td>{new_.status}</td>
                <td>
                  <button onClick={() => handleDeleteAction('news', new_.id)}>Delete</button>
                  {new_.status === 'published' ? (
                    <button onClick={() => handleUnpublishAction('news', new_.id)}>Unpublish</button>
                  ) : (
                    <button onClick={() => handlePublishAction('news', new_.id)}>Publish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PostList