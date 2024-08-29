/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signUpLogo from '../assets/signuppage.svg';

function SignUp() {
    const [formData, setFormData] = useState({
        Fname: '',
        Mname: '',
        Lname: '',
        Prefname: 'Kavach-User',
        Phone: '',
        Email: '',
        Password: '',
        CPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setSuccess(''); // Clear previous success message

        const newErrors = {};
        if (!formData.Fname) newErrors.Fname = 'Please enter your First Name.';
        // if (!formData.Mname) newErrors.Mname = 'Please enter your Middle Name.';
        if (!formData.Lname) newErrors.Lname = 'Please enter your Last Name.';
        if (!formData.Prefname) newErrors.Prefname = 'Please enter your Preferred Name.';
        if (!formData.Email) newErrors.Email = 'Please enter your Email Address.';
        if (!formData.Phone) newErrors.Phone = 'Please enter your Contact Number.';
        if (!formData.Password) newErrors.Password = 'Please enter your Password.';
        if (formData.Password !== formData.CPassword) newErrors.CPassword = 'Passwords do not match.';

        // Handle only one error at a time
        if (Object.keys(newErrors).length > 0) {
            setErrors({ [Object.keys(newErrors)[0]]: newErrors[Object.keys(newErrors)[0]] });
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/api/v1/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Registration successful!');
                setTimeout(() => {
                    navigate('/thanks');
                }, 2000);
            } else {
                setErrors(result.errors || { msg: result.msg });
            }
        } catch (error) {
            console.log('Error:', error);
            setErrors({ msg: 'An unexpected error occurred. Please try again.' });
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img src={signUpLogo} alt="Sign Up" />
            </div>
            <form className="md:w-1/3 max-w-sm" onSubmit={handleSubmit}>
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Sign Up</p>
                </div>
                {Object.values(errors).length > 0 && (
                    <p className="text-red-500">{Object.values(errors)[0]}</p>
                )}
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="First Name"
                    name="Fname"
                    value={formData.Fname}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Middle Name"
                    name="Mname"
                    value={formData.Mname}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Last Name"
                    name="Lname"
                    value={formData.Lname}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Preferred Name"
                    name="Prefname"
                    value={formData.Prefname}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Email Address"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    placeholder="Contact Number"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Confirm Password"
                    name="CPassword"
                    value={formData.CPassword}
                    onChange={handleChange}
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input
                            className="mr-1"
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <span>Remember Me</span>
                    </label>
                    <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="/login">Login Instead!</a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/login">Login</Link>
                </div>
            </form>
        </section>
    );
}

export default SignUp;
