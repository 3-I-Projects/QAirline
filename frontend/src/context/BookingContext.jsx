import { createContext, useState, useEffect } from "react";

const BookingContext = createContext(null);
export { BookingContext };
export default function BookingContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(3);
  const [allCustomers, setAllCustomers] = useState([]);
  const [tickets, setTickets] = useState([]);
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
    setTickets(
      Array(customerCount).fill({
        id: "",
        price: "",
        ordered_time: "",
        status: "",
        booked_by: "Viet Nam",
        customer: "",
        flight: "",
        seat: "",
      })
    );
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
        tickets,
        setTickets,
        toAirport,
        setToAirport,
        fromAirport,
        setFromAirport,
        bookingInfo,
        setBookingInfo, 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
