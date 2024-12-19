import React, { useContext, useState, useEffect } from "react";
import UserForm from "../../components/UserForm";
import toast, { Toaster } from "react-hot-toast";
import { BookingContext } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Menu from "../../Menu";
import "../../style/Detail.css";

const CustomerDetailPage = () => {
  const { count, setCount } = useContext(BookingContext);
  const { allCustomers, setAllCustomers, customerCount, setCustomerCount } =
    useContext(BookingContext);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  // Update allCustomers and errors when customerCount changes
  useEffect(() => {
    setErrors(Array(customerCount).fill({}));

    setAllCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers];

      // Add empty customers if count increases
      while (updatedCustomers.length < customerCount) {
        updatedCustomers.push({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          birthday: "",
          gender: "",
          country: "Viet Nam",
        });
      }

      // Remove extra customers if count decreases
      while (updatedCustomers.length > customerCount) {
        updatedCustomers.pop();
      }

      return updatedCustomers;
    });
  }, [customerCount]);

  // Handle input change for a specific form
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setAllCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = {
        ...updatedCustomers[index],
        [name]: value,
      };
      return updatedCustomers;
    });
  };

  // Validate all forms
  const validateFields = () => {
    const validationErrors = allCustomers.map((formData) => {
      const newErrors = {};
      if (!formData.first_name)
        newErrors.first_name = "Họ không được để trống.";
      if (!formData.last_name) newErrors.last_name = "Tên không được để trống.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email không hợp lệ.";
      }
      if (!formData.phone_number || !/^\d+$/.test(formData.phone_number)) {
        newErrors.phone_number = "Số điện thoại chỉ được chứa số.";
      }
      return newErrors;
    });

    setErrors(validationErrors);
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (validationErrors.some((errorObj) => Object.keys(errorObj).length > 0)) {
      return; // Do not proceed if there are validation errors
    }

    // Submit all customer data
    for (const [index, formData] of allCustomers.entries()) {
      try {
        const headers = { "Content-Type": "application/json" };
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch("http://localhost:8000/users/customers", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Lỗi khi gửi dữ liệu.");
        }

        const data = await response.json();

        setAllCustomers((prevCustomers) => {
          const updatedCustomers = [...prevCustomers];
          updatedCustomers[index] = { ...updatedCustomers[index], id: data.id };
          return updatedCustomers;
        });

        toast.success(`Khách hàng ${index + 1} đã được gửi thành công!`);
      } catch (error) {
        toast.error(`Lỗi khách hàng ${index + 1}: ${error.message}`);
      }
    }

    navigate("/seats");
  };

  return (
    <div className="detail">
      <div className="menu">
        <Menu />
      </div>
      <div>
        <label htmlFor="customerCount">Number of Customers:</label>
        <input
          type="number"
          id="customerCount"
          value={customerCount}
          onChange={(e) => setCustomerCount(Number(e.target.value))}
          min="1"
        />
      </div>

      {allCustomers.map((formData, index) => (
        <div key={index}>
          <h3>Customer {index + 1}</h3>
          <UserForm
            key={index}
            formData={formData}
            errors={errors[index]}
            handleChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}

      <button className="submit-button" onClick={handleSubmit}>
        Gửi Thông Tin
      </button>
      <Toaster />
    </div>
  );
};

export default CustomerDetailPage;
