import React, { useState } from 'react';
import './style/FeatureCardStyle.css';

function FeatureCard() {
  const [activeTab, setActiveTab] = useState('MUA VÉ');

  // State cho thông tin
  const [bookingInfo, setBookingInfo] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    tripType: 'khứ hồi',
    passengers: 1,
  });

  const [reservationInfo, setReservationInfo] = useState({
    reservationCode: '',
    lastName: '',
  });

  const [checkInInfo, setCheckInInfo] = useState({
    pnrCode: '',
    ticketNumber: '',
    lastName: '',
  });

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

  // Gửi thông tin đặt vé
  const handleBookingSubmit = () => {
    const { from, to, departureDate, returnDate, passengers } = bookingInfo;
    const fieldsToValidate = {
      "Nơi đi": from,
      "Nơi đến": to,
      "Ngày đi": departureDate,
      "Số hành khách": passengers,
    };

    // Nếu là khứ hồi, kiểm tra cả ngày về
    if (bookingInfo.tripType === 'khứ hồi') {
      fieldsToValidate["Ngày về"] = returnDate;
    }

    if (validateFields(fieldsToValidate)) {
      console.log('Thông tin đặt vé:', bookingInfo);
      alert('Thông tin đặt vé đã được gửi!');
    }
  };

  // Gửi thông tin quản lý đặt chỗ
  const handleReservationSubmit = () => {
    const { reservationCode, lastName } = reservationInfo;
    const fieldsToValidate = {
      "Mã đặt chỗ/Số vé điện tử": reservationCode,
      "Họ": lastName,
    };

    if (validateFields(fieldsToValidate)) {
      console.log('Thông tin quản lý đặt chỗ:', reservationInfo);
      alert('Thông tin quản lý đặt chỗ đã được gửi!');
    }
  };

  // Gửi thông tin làm thủ tục
  const handleCheckInSubmit = () => {
    const { pnrCode, ticketNumber, lastName } = checkInInfo;
    const fieldsToValidate = {
      "Mã đặt chỗ (PNR)": pnrCode,
      "Số vé điện tử": ticketNumber,
      "Họ": lastName,
    };

    if (validateFields(fieldsToValidate)) {
      console.log('Thông tin làm thủ tục:', checkInInfo);
      alert('Thông tin làm thủ tục đã được gửi!');
    }
  };

  return (
    <div className="feature-card">
      {/* Tabs */}
      <div className="tabs">
        <buttons
          className={`tab ${activeTab === 'MUA VÉ' ? 'active' : ''}`}
            onClick={() => handleTabChange('MUA VÉ')}
          >
            MUA VÉ
          </buttons>
          <buttons
            className={`tab ${activeTab === 'QUẢN LÝ ĐẶT CHỖ' ? 'active' : ''}`}
            onClick={() => handleTabChange('QUẢN LÝ ĐẶT CHỖ')}
          >
            QUẢN LÝ ĐẶT CHỖ
          </buttons>
          <buttons
            className={`tab ${activeTab === 'LÀM THỦ TỤC' ? 'active' : ''}`}
            onClick={() => handleTabChange('LÀM THỦ TỤC')}
          >
            LÀM THỦ TỤC
          </buttons>
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
              <buttons className="find-flights-buttons" onClick={handleBookingSubmit}>
                TÌM CHUYẾN BAY
              </buttons>
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
              <buttons className="search-buttons" onClick={handleReservationSubmit}>
                TÌM KIẾM
              </buttons>
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
              <buttons className="check-in-buttons" onClick={handleCheckInSubmit}>
                LÀM THỦ TỤC
              </buttons>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;
