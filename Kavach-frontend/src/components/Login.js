/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginLogo from '../assets/loginpage.png';

function Login() {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
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
        setErrors({});
        setSuccess('');

        const newErrors = {};
        if (!formData.Email) newErrors.Email = 'Please enter your Email Address.';
        if (!formData.Password) newErrors.Password = 'Please enter your Password.';

        if (Object.keys(newErrors).length > 0) {
            setErrors({ [Object.keys(newErrors)[0]]: newErrors[Object.keys(newErrors)[0]] });
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/api/v1/auth/login/', {
                method: 'POST',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setSuccess('Login successful!');
                const token = result.token;
                localStorage.setItem('token', token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setErrors(result.errors || { msg: result.msg });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ msg: 'An unexpected error occurred. Please try again.' });
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img src={loginLogo} alt="Login" />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Login</p>
                </div>
                {errors.msg && <p className="text-red-500">{errors.msg}</p>}
                {/* {Object.keys(errors).length > 0 && (
                    <ul className="text-red-500">
                        {Object.entries(errors).map(([key, error], index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )} */}
                <form onSubmit={handleSubmit}>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email Address"
                        name="Email"
                        value={formData.Email}
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
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input
                                className="mr-1"
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe || false}
                                onChange={handleChange}
                            />
                            <span>Remember Me</span>
                        </label>
                        <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="/login">Forgot Password?</a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don't have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/signup">Register</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
