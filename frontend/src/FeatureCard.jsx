import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import "./style/FeatureCardStyle.css";
import AirportSelect from "./components/AirportSelect";
import { BookingContext } from "./context/BookingContext";

function FeatureCard() {
  const [activeTab, setActiveTab] = useState("MUA VÉ");
  const navigate = useNavigate();

  // State cho thông tin
  
  const { toAirport, setToAirport, fromAirport, setFromAirport, customerCount, setCustomerCount, bookingInfo, setBookingInfo } =
    useContext(BookingContext);

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
    if (section === "booking") {
      setBookingInfo({ ...bookingInfo, [name]: value });
    } else if (section === "reservation") {
      setReservationInfo({ ...reservationInfo, [name]: value });
    } else if (section === "checkin") {
      setCheckInInfo({ ...checkInInfo, [name]: value });
    }
  };

  // Validate fields
  const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        toast.error(`Trường "${key}" là bắt buộc!`);
        return false;
      }
    }
    return true;
  };

  let airportData = []; // Biến lưu thông tin sân bay

  // Fetch thông tin sân bay từ API
  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:8000/flights/airports");
      if (!response.ok) {
        toast.error("Không thể lấy thông tin sân bay từ máy chủ!");
        return false;
      }

      const data = await response.json();
      console.log("Fetched airport data:", data); // Debug thông tin fetch
      airportData = data;
      return true;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sân bay:", error);
      toast.error("Lỗi khi lấy thông tin sân bay!");
      return false;
    }
  };

  // Hàm chuẩn hóa chuỗi để loại bỏ dấu tiếng Việt và chuyển về chữ thường
  const removeDiacritics = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
      .toLowerCase(); // Chuyển về chữ thường
  };

  // Map tên sân bay thành ID thông qua dữ liệu từ API
  const mapAirportToID = (airportCityOrName) => {
    if (!airportData || airportData.length === 0) {
      console.error("Airport data chưa được load.");
      return 0;
    }

    const normalizedSearch = removeDiacritics(airportCityOrName);

    console.log("Searching for:", normalizedSearch);

    const airport = airportData.find(
      (item) =>
        removeDiacritics(item.name) === normalizedSearch ||
        removeDiacritics(item.city) === normalizedSearch
    );

    console.log("Found airport:", airport);

    return airport ? airport.id : 0;
  };

  // Gửi thông tin đặt vé
  const handleBookingSubmit = async () => {
    const { departureDate, returnDate } = bookingInfo;

    var fieldsToValidate;
    if (bookingInfo.tripType === 'khứ hồi') {
      fieldsToValidate = {
        "Nơi đi": fromAirport,
        "Nơi đến": toAirport,
        "Ngày đi": departureDate,
        "Ngày về": returnDate,
        "Số hành khách": customerCount,
      };
    } else {
      fieldsToValidate = {
        "Nơi đi": fromAirport,
        "Nơi đến": toAirport,
        "Ngày đi": departureDate,
        "Số hành khách": customerCount,
      };
    }


    if (!validateFields(fieldsToValidate)) return;

    const getFlights = async(departure, from, to) => {
      try {
        const bodyData = {
          from_date: departure,
          from_airport: from,
          to_airport: to,
        }
        const response = await fetch("http://localhost:8000/flights/find", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
        if (!response.ok) {
          toast.error("Có lỗi xảy ra!");
          return;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
      }
    }

    const flights = await getFlights(departureDate, fromAirport, toAirport);
    if (bookingInfo.tripType === 'một chiều') {
      navigate('/flights', { state: { flights: flights, customerCount, bookingInfo } });
      return
    }
    const roundTripFlights = await getFlights(returnDate, toAirport, fromAirport);
    navigate('/flights', { state: { flights: flights, roundTripFlights: roundTripFlights, customerCount, bookingInfo } });
  };

  return (
    <>
      <Toaster />
      <div className="feature-card">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "MUA VÉ" ? "active" : ""}`}
            onClick={() => handleTabChange("MUA VÉ")}
          >
            MUA VÉ
          </button>
          <button
            className={`tab ${activeTab === "QUẢN LÝ ĐẶT CHỖ" ? "active" : ""}`}
            onClick={() => handleTabChange("QUẢN LÝ ĐẶT CHỖ")}
          >
            QUẢN LÝ ĐẶT CHỖ
          </button>
          <button
            className={`tab ${activeTab === "LÀM THỦ TỤC" ? "active" : ""}`}
            onClick={() => handleTabChange("LÀM THỦ TỤC")}
          >
            LÀM THỦ TỤC
          </button>
        </div>

        {/* Nội dung */}
        <div className="card-content">
          {activeTab === "MUA VÉ" && (
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
                      checked={bookingInfo.tripType === "khứ hồi"}
                      onChange={(e) => handleInputChange(e, "booking")}
                    />
                    ‎ Khứ hồi
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tripType"
                      value="một chiều"
                      checked={bookingInfo.tripType === "một chiều"}
                      onChange={(e) => handleInputChange(e, "booking")}
                    />
                    ‎ Một chiều
                  </label>
                </div>
                <div className="input-item">
                  <AirportSelect
                    value={fromAirport}
                    onChange={(e) => setFromAirport(e.target.value)}
                  />
                  <AirportSelect
                    value={toAirport}
                    onChange={(e) => setToAirport(e.target.value)}
                  />
                </div>
                <div className="input-item">
                  <label>Ngày đi</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={bookingInfo.departureDate}
                    onChange={(e) => handleInputChange(e, "booking")}
                  />
                </div>
                {bookingInfo.tripType === "khứ hồi" && (
                  <div className="input-item">
                    <label>Ngày về</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={bookingInfo.returnDate}
                      onChange={(e) => handleInputChange(e, "booking")}
                    />
                  </div>
                )}
                <div className="input-item">
                  <label>Số hành khách</label>
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    value={customerCount}
                    onChange={(e) => setCustomerCount(e.target.value)}
                    placeholder="Nhập số hành khách"
                  />
                </div>
                <button
                  className="find-flights-button"
                  onClick={handleBookingSubmit}
                >
                  TÌM CHUYẾN BAY
                </button>
              </div>
            </div>
          )}

          {activeTab === "QUẢN LÝ ĐẶT CHỖ" && (
            <div>
              <h3>Quản lý đặt chỗ</h3>
              <div className="input-group">
                <div className="input-item">
                  <label>Mã đặt chỗ/Số vé điện tử</label>
                  <input
                    type="text"
                    name="reservationCode"
                    value={reservationInfo.reservationCode}
                    onChange={(e) => handleInputChange(e, "reservation")}
                    placeholder="Nhập mã đặt chỗ"
                  />
                </div>
                <div className="input-item">
                  <label>Họ</label>
                  <input
                    type="text"
                    name="lastName"
                    value={reservationInfo.lastName}
                    onChange={(e) => handleInputChange(e, "reservation")}
                    placeholder="Nhập họ"
                  />
                </div>
                <button
                  className="search-button"
                  onClick={handleReservationSubmit}
                >
                  TÌM KIẾM
                </button>
              </div>
            </div>
          )}

          {activeTab === "LÀM THỦ TỤC" && (
            <div>
              <h3>Làm thủ tục</h3>
              <div className="input-group">
                <div className="input-item">
                  <label>Mã đặt chỗ</label>
                  <input
                    type="text"
                    name="pnrCode"
                    value={checkInInfo.pnrCode}
                    onChange={(e) => handleInputChange(e, "checkin")}
                    placeholder="Nhập mã đặt chỗ"
                  />
                </div>
                <div className="input-item">
                  <label>Số vé điện tử</label>
                  <input
                    type="text"
                    name="ticketNumber"
                    value={checkInInfo.ticketNumber}
                    onChange={(e) => handleInputChange(e, "checkin")}
                    placeholder="Nhập số vé điện tử"
                  />
                </div>
                <div className="input-item">
                  <label>Họ</label>
                  <input
                    type="text"
                    name="lastName"
                    value={checkInInfo.lastName}
                    onChange={(e) => handleInputChange(e, "checkin")}
                    placeholder="Nhập họ"
                  />
                </div>
                <button
                  className="check-in-button"
                  onClick={handleCheckInSubmit}
                >
                  LÀM THỦ TỤC
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeatureCard;
