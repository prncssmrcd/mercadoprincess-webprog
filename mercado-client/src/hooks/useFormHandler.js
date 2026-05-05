import { useState } from 'react';

export const useFormHandler = (formType) => {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${formType} submitted:`, formData);
    // TODO: Handle form submission (API call, validation, etc.)
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
