import React, { useState } from 'react';
import './style/UserFormStyle.css';

function UserForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    country: '',
    phone_number: '',
    email: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};

    if (!formData.first_name) newErrors.first_name = 'Họ không được để trống.';
    if (!formData.last_name) newErrors.last_name = 'Tên không được để trống.';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.phone_number || !/^\d+$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Số điện thoại chỉ được chứa số.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Lỗi khi gửi dữ liệu.');
      }

      const data = await response.json();
      alert('Gửi thông tin thành công: ' + JSON.stringify(data));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="user-form-container">
      <h2>Điền Thông Tin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Nhập họ"
          />
          {errors.first_name && <span className="error-message">{errors.first_name}</span>}
        </div>
        <div className="form-group">
          <label>Tên</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Nhập tên"
          />
          {errors.last_name && <span className="error-message">{errors.last_name}</span>}
        </div>
        <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Quốc gia</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Nhập quốc gia"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
          {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="M">Nam</option>
            <option value="F">Nữ</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Gửi Thông Tin
        </button>
      </form>

      <div className="form-data-display">
        <h3>Thông tin nhập liệu</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default UserForm;
