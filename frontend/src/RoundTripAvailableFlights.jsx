import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './style/AvailableFlights.css';
import FlightCard from './FlightCard.jsx';
import { BookingContext } from './context/BookingContext.jsx';
import Menu from './Menu.jsx';
import Footer from './components/Footer.jsx';

const RoundTripAvailableFlights = () => {
  const [flights, setFlights] = useState([]);
  const location = useLocation();
  const { setRoundTripFlight } = useContext(BookingContext);
  const { flights: apiFlights, customerCount, bookingInfo } = location.state || {};
  const navigate = useNavigate();
  const [isMenuHidden, setIsMenuHidden] = useState(false);

  useEffect(() => {
    if (apiFlights) {
      console.log("Dữ liệu từ API:", apiFlights);
      setFlights(apiFlights);
    } else {
      toast.error("Không có dữ liệu chuyến bay từ API.");
    }
  }, [apiFlights]);

  const chooseFlight = (e, flight, setFlight) => {
    e.stopPropagation(); // Ngăn click vùng cha kích hoạt
    if (flight.available_seat_count < customerCount) {
      toast.error("Chuyến bay không đủ chỗ");
    } else {
      setFlight(flight);
      console.log('Chuyến bay đi:', flight);
      navigate('/detail');
    }
  }

  function getFormattedDateInfo(dateString) {
    const date = new Date(dateString);
  
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
  
    return date.toLocaleDateString('vi-VN', options);
  }

  useEffect(() => {
    let lastScrollPosition = 0;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition > 50 && currentScrollPosition > lastScrollPosition) {
        setIsMenuHidden(true); // Ẩn menu
      } else if (currentScrollPosition <= lastScrollPosition) {
        setIsMenuHidden(false); // Hiển thị menu
      }

      lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='available-flights'>
      <header className="header">
        
      <Menu isHidden={isMenuHidden} />

      <div className={`flight-info ${isMenuHidden ? "menu-hidden" : ""}`}>
          <div className='flight-details'>
            <div className='flight-route' id='infor'>
            <div className="abc">
              <span className="label">{flights[0]?.origin_airport_code}</span>
              
              {bookingInfo.tripType === "khứ hồi" && (
                <div className="xyz">
                  {/* Điểm đi */}
                  <div className="icon-flight">
                    <div className="dotted-line">
                      <svg height="2" width="100%">
                        <line x1="0" y1="0" x2="100%" y2="0" style={{ stroke: "#002855", strokeWidth: 5, strokeDasharray: "2,3" }} />
                      </svg>
                    </div>
                    <div className="plane-icon">
                      <img src="/images/di.png" alt="Điểm đi" />
                    </div>
                  </div>

                  {/* Điểm về */}
                  <div className="icon-flight">
                    <div className="plane-icon">
                      <img src="/images/ve.png" alt="Điểm về" />
                    </div>
                    <div className="dotted-line">
                      <svg height="2" width="100%">
                        <line x1="0" y1="0" x2="100%" y2="0" style={{ stroke: "#002855", strokeWidth: 5, strokeDasharray: "2,3" }} />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {bookingInfo.tripType === "một chiều" && (
                <div className="icon-flight">
                  <div className="dotted-line">
                    <svg height="2" width="100%">
                      <line x1="0" y1="0" x2="100%" y2="0" style={{ stroke: "#002855", strokeWidth: 5, strokeDasharray: "5,5" }} />
                    </svg>
                  </div>
                  <div className="plane-icon">
                    <img src="/images/di.png" alt="Điểm đi" />
                  </div>
                </div>
              )}

              <span className="label">{flights[0]?.destination_airport_code}</span>
            </div>

              <div className='abc'>
                <span className='value'>{flights[0]?.origin_airport_city}</span>
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
            <div className='infor-pass' id='infor'>
              <span className='label'>Hành khách</span>
              <span className='value'> ‎  {customerCount} 👤</span>
            </div>
          </div>
        </div>


      </header>
      <div className="flight-list-container">
        <h2 style={{ margin: '10px 0' }}>Chuyến bay khả dụng</h2>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} setFlight={setRoundTripFlight} chooseFlight={(e) => chooseFlight(e, flight, setRoundTripFlight)} />
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

export default RoundTripAvailableFlights;
