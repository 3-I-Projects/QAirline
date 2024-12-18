import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './style/AvailableFlights.css';
import FlightCard from './FlightCard.jsx';
import { BookingContext } from './context/BookingContext.jsx';
import Menu from './Menu.jsx';

const AvailableFlights = () => {
  const [flights, setFlights] = useState([]);
  const location = useLocation();
  const { setFlight } = useContext(BookingContext);
  const { flights: apiFlights, customerCount } = location.state || {};
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (apiFlights) {
      console.log("Dữ liệu từ API:", apiFlights);
      setFlights(apiFlights);
    } else {
      toast.error("Không có dữ liệu chuyến bay từ API.");
    }
  }, [apiFlights]);

  useEffect(() => {
    const handleScroll = () => setShowMenu(window.scrollY <= 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function getFormattedDateInfo(dateString) {
    const date = new Date(dateString);
  
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
  
    return date.toLocaleDateString('vi-VN', options);
  }
  return (
    <div className='available-flights'>
      <header className={`header ${!showMenu ? 'hidden' : ''}`}>
        {showMenu && <Menu />}
        <div className={`flight-info`}
        style={{ marginTop: showMenu ? "110px" : "0" }} >
          <div className='flight-details'>
            <div className='flight-route' id='infor'>
              <div>
                <span className='label'>{flights[0]?.origin_airport_code}</span>
                <span className='value'>{flights[0]?.origin_airport_city}</span>
              </div>
              <span className='route-icon'>✈️</span>
              <div>
                <span className='label'>{flights[0]?.destination_airport_code}</span>
                <span className='value'>{flights[0]?.destination_airport_city}</span>
              </div>
            </div>
            <div className="infor-date" id='infor'>
              <div className='infor-dates'>
                <span className='label'>Khởi hành</span>
                <span className='value'>{getFormattedDateInfo(flights[0]?.departure_time)}</span>
              </div>
              <div className='infor-dates'>
              <span className='label'>Trở về</span>
              <span className='value'>{getFormattedDateInfo(flights[0]?.arrival_time)}</span>
              </div>
            </div>
            <div id='infor'>
              <span className='label'>Hành khách</span>
              <span className='value'> ‎  {customerCount} 👤</span>
            </div>
          </div>
        </div>


      </header>
      <div className='chart-placeholder'>
        <p>Biểu đồ sẽ hiện ở đây (nếu có)</p>
      </div>
      <div className="flight-list-container">
        <h2 style={{ margin: '10px 0' }}>Chuyến bay khả dụng</h2>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} setFlight={setFlight} />
          ))
        ) : (
          <div className="no-flights">
            <p>Không có chuyến bay nào khả dụng.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFlights;
