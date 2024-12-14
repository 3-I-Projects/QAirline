import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/FeatureCardStyle.css';

function FeatureCard() {
  const [activeTab, setActiveTab] = useState('MUA VÉ');
  const navigate = useNavigate();

  // State cho thông tin
  const [bookingInfo, setBookingInfo] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    tripType: 'khứ hồi',
    passengers: 1,
  });

  // const [reservationInfo, setReservationInfo] = useState({
  //   reservationCode: '',
  //   lastName: '',
  // });

  // const [checkInInfo, setCheckInInfo] = useState({
  //   pnrCode: '',
  //   ticketNumber: '',
  //   lastName: '',
  // });

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === 'booking') {
      setBookingInfo({ ...bookingInfo, [name]: value });
    } else if (section === 'reservation') {
      setReservationInfo({ ...reservationInfo, [name]: value });
    } else if (section === 'checkin') {
      setCheckInInfo({ ...checkInInfo, [name]: value });
    }
  };

  // Validate fields
  const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        alert(`Trường "${key}" là bắt buộc!`);
        return false;
      }
    }
    return true;
  };

// Mapping mã sân bay từ tên (ví dụ "SGN", "HAN") sang số ID tương ứng
const mapAirportToID = (airportCode) => {
  const airportMap = {
    "Hà Nội": 1, 
    "Sài Gòn": 2, 
    DAN: 3, // Sân bay Đà Nẵng
  };
  return airportMap[airportCode] || 0; // Default nếu không tìm thấy
};

// Gửi thông tin đặt vé
const handleBookingSubmit = async () => {
  const { from, to, departureDate, returnDate, passengers } = bookingInfo;

  // Kiểm tra tính hợp lệ của dữ liệu đầu vào
  const fieldsToValidate = {
    "Nơi đi": from,
    "Nơi đến": to,
    "Ngày đi": departureDate,
    "Ngày về": returnDate, // Thêm ngày về
    "Số hành khách": passengers,
  };

  if (!validateFields(fieldsToValidate)) return;

  try {
    // Chuẩn bị dữ liệu khớp với yêu cầu API
    const bodyData = {
      from_date: departureDate, // Ngày đi
      to_date: returnDate,      // Ngày về
      from_airport: mapAirportToID(from),
      to_airport: mapAirportToID(to),
    };

    // Gửi request đến API
    const response = await fetch('http://localhost:8000/flights/find', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      alert(`Lỗi từ máy chủ: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    navigate('/flights', { state: { flights: data } });
    
    // Xử lý kết quả từ API
    if (data && data.length > 0) {
      alert(`Tìm thấy ${data.length} chuyến bay!`);
      navigate('/flights', { state: { flights: data } });
    } else {
      alert('Không tìm thấy chuyến bay phù hợp.');
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
    alert('Có lỗi xảy ra! Vui lòng thử lại.');
  }
};


  
  
  
  // Gửi thông tin quản lý đặt chỗ
  // const handleReservationSubmit = () => {
  //   const { reservationCode, lastName } = reservationInfo;
  //   const fieldsToValidate = {
  //     "Mã đặt chỗ/Số vé điện tử": reservationCode,
  //     "Họ": lastName,
  //   };

  //   if (validateFields(fieldsToValidate)) {
  //     console.log('Thông tin quản lý đặt chỗ:', reservationInfo);
  //     alert('Thông tin quản lý đặt chỗ đã được gửi!');
  //   }
  // };

  // // Gửi thông tin làm thủ tục
  // const handleCheckInSubmit = () => {
  //   const { pnrCode, ticketNumber, lastName } = checkInInfo;
  //   const fieldsToValidate = {
  //     "Mã đặt chỗ (PNR)": pnrCode,
  //     "Số vé điện tử": ticketNumber,
  //     "Họ": lastName,
  //   };

  //   if (validateFields(fieldsToValidate)) {
  //     console.log('Thông tin làm thủ tục:', checkInInfo);
  //     alert('Thông tin làm thủ tục đã được gửi!');
  //   }
  // };

  return (
    <div className="feature-card">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'MUA VÉ' ? 'active' : ''}`}
            onClick={() => handleTabChange('MUA VÉ')}
          >
            MUA VÉ
          </button>
          <button
            className={`tab ${activeTab === 'QUẢN LÝ ĐẶT CHỖ' ? 'active' : ''}`}
            onClick={() => handleTabChange('QUẢN LÝ ĐẶT CHỖ')}
          >
            QUẢN LÝ ĐẶT CHỖ
          </button>
          <button
            className={`tab ${activeTab === 'LÀM THỦ TỤC' ? 'active' : ''}`}
            onClick={() => handleTabChange('LÀM THỦ TỤC')}
          >
            LÀM THỦ TỤC
          </button>
        </div>

        {/* Nội dung */}
        <div className="card-content">
        {activeTab === 'MUA VÉ' && (
          <div>
            <h3>Mua vé</h3>
            <div className="input-group">
              {/* Lựa chọn loại vé */}
              <div className="trip-type-selector">
                <label>
                  <input
                    type="radio"
                    name="tripType"
                    value="khứ hồi"
                    checked={bookingInfo.tripType === 'khứ hồi'}
                    onChange={(e) => handleInputChange(e, 'booking')}
                  />‎ Khứ hồi
                </label>
                <label>
                  <input
                    type="radio"
                    name="tripType"
                    value="một chiều"
                    checked={bookingInfo.tripType === 'một chiều'}
                    onChange={(e) => handleInputChange(e, 'booking')}
                  />‎ Một chiều
                </label>
              </div>

              {/* Nhập thông tin nơi đi, nơi đến và ngày */}
              <div className="input-item">
                <label>Từ</label>
                <input
                  type="text"
                  name="from"
                  value={bookingInfo.from}
                  onChange={(e) => handleInputChange(e, 'booking')}
                  placeholder="Nhập nơi đi"
                />
              </div>
              <div className="input-item">
                <label>Đến</label>
                <input
                  type="text"
                  name="to"
                  value={bookingInfo.to}
                  onChange={(e) => handleInputChange(e, 'booking')}
                  placeholder="Nhập nơi đến"
                />
              </div>
              <div className="input-item">
                <label>Ngày đi</label>
                <input
                  type="date"
                  name="departureDate"
                  value={bookingInfo.departureDate}
                  onChange={(e) => handleInputChange(e, 'booking')}
                />
              </div>
              {bookingInfo.tripType === 'khứ hồi' && (
                <div className="input-item">
                  <label>Ngày về</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={bookingInfo.returnDate}
                    onChange={(e) => handleInputChange(e, 'booking')}
                  />
                </div>
              )}
              <div className="input-item">
                <label>Số hành khách</label>
                <input
                  type="number"
                  name="passengers"
                  min="1"
                  value={bookingInfo.passengers}
                  onChange={(e) => handleInputChange(e, 'booking')}
                  placeholder="Nhập số hành khách"
                />
              </div>
              <button className="find-flights-button" onClick={handleBookingSubmit}>
                TÌM CHUYẾN BAY
              </button>
            </div>
            
          </div>
        )}


        {activeTab === 'QUẢN LÝ ĐẶT CHỖ' && (
          <div>
            <h3>Quản lý đặt chỗ</h3>
            <div className="input-group">
              <div className="input-item">
                <label>Mã đặt chỗ/Số vé điện tử</label>
                <input
                  type="text"
                  name="reservationCode"
                  value={reservationInfo.reservationCode}
                  onChange={(e) => handleInputChange(e, 'reservation')}
                  placeholder="Nhập mã đặt chỗ"
                />
              </div>
              <div className="input-item">
                <label>Họ</label>
                <input
                  type="text"
                  name="lastName"
                  value={reservationInfo.lastName}
                  onChange={(e) => handleInputChange(e, 'reservation')}
                  placeholder="Nhập họ"
                />
              </div>
              <button className="search-button" onClick={handleReservationSubmit}>
                TÌM KIẾM
              </button>
            </div>
          </div>
        )}

        {activeTab === 'LÀM THỦ TỤC' && (
          <div>
            <h3>Làm thủ tục</h3>
            <div className="input-group">
              <div className="input-item">
                <label>Mã đặt chỗ</label>
                <input
                  type="text"
                  name="pnrCode"
                  value={checkInInfo.pnrCode}
                  onChange={(e) => handleInputChange(e, 'checkin')}
                  placeholder="Nhập mã đặt chỗ"
                />
              </div>
              <div className="input-item">
                <label>Số vé điện tử</label>
                <input
                  type="text"
                  name="ticketNumber"
                  value={checkInInfo.ticketNumber}
                  onChange={(e) => handleInputChange(e, 'checkin')}
                  placeholder="Nhập số vé điện tử"
                />
              </div>
              <div className="input-item">
                <label>Họ</label>
                <input
                  type="text"
                  name="lastName"
                  value={checkInInfo.lastName}
                  onChange={(e) => handleInputChange(e, 'checkin')}
                  placeholder="Nhập họ"
                />
              </div>
              <button className="check-in-button" onClick={handleCheckInSubmit}>
                LÀM THỦ TỤC
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;
