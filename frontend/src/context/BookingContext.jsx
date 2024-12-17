import { createContext, useState, useEffect } from "react";

const BookingContext = createContext(null);
export { BookingContext };
export default function BookingContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(1);
  const [allCustomers, setAllCustomers] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [fromAirport, setFromAirport] = useState(0);
  const [toAirport, setToAirport] = useState(0);
  const [bookingInfo, setBookingInfo] = useState({
    // from: "",
    // to: "",
    departureDate: "",
    returnDate: "",
    tripType: "khứ hồi",
    // passengers: "",
  });
  const [ flight, setFlight ] = useState({
    "id": 0,
    "plane": 0,
    "origin_airport": 0,
    "destination_airport": 0,
    "departure_time": "",
    "delay": 0,
    "base_price": 0,
    "arrival_time": "",
    "available_seat_count": 0,
    "origin_airport_code": "",
    "origin_airport_city": "",
    "destination_airport_code": "",
    "destination_airport_city": ""
  })
  useEffect(() => {
    setAllCustomers(
      Array(customerCount).fill({
        id: "",
        first_name: "",
        last_name: "",
        birthday: "",
        country: "Viet Nam",
        phone_number: "",
        email: "",
        gender: "",
      })
    );
    // setTicketIds(
    //   Array(customerCount).fill({id: ""})
    // );
  }, [customerCount]);

  return (
    <BookingContext.Provider
      value={{
        count,
        setCount,
        allCustomers,
        setAllCustomers,
        customerCount,
        setCustomerCount,
        ticketIds,
        setTicketIds,
        toAirport,
        setToAirport,
        fromAirport,
        setFromAirport,
        bookingInfo,
        setBookingInfo, 
        flight,
        setFlight,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}