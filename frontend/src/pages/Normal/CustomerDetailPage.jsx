import React, { useState } from "react";
import UserForm from "../../components/UserForm";
import toast, { Toaster } from "react-hot-toast";

const CustomerDetailPage = ({ customerCount = 2 }) => {
  const test = () => toast("Here is your toast.");

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
  console.log(allCustomers)

  const [errors, setErrors] = useState(Array(customerCount).fill({}));

  // Handle input change for a specific form
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    // Update the specific customer at the given index
    setAllCustomers((prevCustomers) => {
      const updatedCustomers = [...prevCustomers]; // Create a copy of the array
      updatedCustomers[index] = {
        ...updatedCustomers[index], // Spread the previous data of the specific customer
        [name]: value, // Update the specific field
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

    allCustomers.map(async (formData) => {
      try {
        const response = await fetch("http://localhost:8000/users/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Lỗi khi gửi dữ liệu.");
        }

        const data = await response.json();
        
        setAllCustomers((prevCustomers) => {
          return prevCustomers.map((customer, idx) =>
            idx === allCustomers.indexOf(formData) ? { ...customer, id: data.id } : customer
          );
        });
        console.log(allCustomers[allCustomers.indexOf(formData)]);
        toast.success("Gửi thông tin thành công, id: " + data.id);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };


  return (
    <>
      <button onClick={test}>Make me a toast</button>
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
    </>
  );
};

export default CustomerDetailPage;

// const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     birthday: '',
//     country: 'Viet Nam',
//     phone_number: '',
//     email: '',
//     gender: '',
//   });

// const [errors, setErrors] = useState({});

// // Validate form fields
// const validateFields = () => {
// const newErrors = {};

// if (!formData.first_name) newErrors.first_name = 'Họ không được để trống.';
// if (!formData.last_name) newErrors.last_name = 'Tên không được để trống.';
// if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//     newErrors.email = 'Email không hợp lệ.';
// }
// if (!formData.phone_number || !/^\d+$/.test(formData.phone_number)) {
//     newErrors.phone_number = 'Số điện thoại chỉ được chứa số.';
// }
//     return newErrors;
// };

// // Handle form submission
// const handleSubmit = async (e) => {
// e.preventDefault();

// const validationErrors = validateFields();
// if (Object.keys(validationErrors).length > 0) {
//     setErrors(validationErrors);
//     return;
// }

// setErrors({}); // Clear errors if validation passes

// try {
//     const response = await fetch('http://localhost:8000', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//         throw new Error('Lỗi khi gửi dữ liệu.');
//     }

//     const data = await response.json();
//     toast.success('Gửi thông tin thành công: ' + JSON.stringify(data));
// } catch (error) {
//     toast.error(error.message);
// }
// };
