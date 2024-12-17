import React, { useState } from 'react';

const ChangeInfoForm = ({ name, value, onChange, handleSubmit }) => {
    // const [inputValue, setInputValue] = useState('');

    // const handleChange = (event) => {
    //     setInputValue(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Form submitted with value:', inputValue);
    // };

    return (
        <>
            <label>
                {name}:
                <input type="text" value={value} onChange={onChange} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default ChangeInfoForm;