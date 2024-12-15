import { createContext, useState } from "react";

const BookingContext = createContext(null);
export { BookingContext };
export default function BookingContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(2);
  const [allCustomers, setAllCustomers] = useState(
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
  return (
    <BookingContext.Provider value={{ count, setCount, allCustomers, setAllCustomers, customerCount, setCustomerCount }}>
      {children}
    </BookingContext.Provider>
  );
}
