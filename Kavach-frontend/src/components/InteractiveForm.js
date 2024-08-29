/* eslint-disable no-unused-vars */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import countryList from 'react-select-country-list';
import { ClipLoader } from 'react-spinners';
import { Checkmark } from 'react-checkmark';
import { useNavigate } from 'react-router-dom';

function ProjectPlannerForm() {

    const [file, setFile] = useState(null);
    const handleAadharUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            formData.file = selectedFile;
            setFile(selectedFile.name);
        }
    };

    const [PANfile, setPANFile] = useState(null);
    const handlePANUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            formData.PANfile = selectedFile;
            setPANFile(selectedFile.name);
            console.log(selectedFile)
        }
    };

    const handlePANClearFile = () => {
        setPANFile(null);
    };

    const handleClearFile = () => {
        setFile(null);
    };

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        FullName: '',
        FatherName: '',
        Gender: '',
        MaritalS: '',
        DoB: '',
        Nationality: '',
        StreetAddress1: '',
        StreetAddress2: '',
        City: '',
        State: '',
        Country: '',
        Zip: '',
        Pan: '',
        Aadhar: '',
        file: file,
        PANfile: PANfile
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm1 = () => {

        const newErrors = {};
        const dob = new Date(formData.DoB);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age = age - 1;
        }

        if (age < 18) {
            newErrors.DoB = 'You are not eligible for KYC!';
        }
        if (!formData.FullName) newErrors.FullName = 'Please enter your Full Name.';
        if (!formData.FatherName) newErrors.FatherName = "Please enter your Father's Name.";
        if (!formData.Gender) newErrors.Gender = 'Please select your Gender.';
        if (!formData.MaritalS) newErrors.MaritalS = 'Please select your Marital Status.';
        if (!formData.DoB) newErrors.DoB = 'Please enter your Date of Birth.';
        if (!formData.Nationality) newErrors.Nationality = 'Please select your Nationality.';
        console.log(newErrors)
        setErrors(newErrors);
        return newErrors;
    };

    const validateForm2 = () => {

        const newErrors = {};
        if (!formData.StreetAddress1) newErrors.StreetAddress1 = 'Please enter your Address.';
        if (!formData.City) newErrors.City = 'Please enter your City.';
        if (!formData.State) newErrors.State = 'Please enter your State.';
        if (!formData.Country) newErrors.Country = 'Please enter your Country.';
        if (!formData.Zip) newErrors.Zip = 'Please enter your Postal Code.';
        if (!formData.Pan) newErrors.Pan = 'Please enter your PAN Number.';
        if (!formData.Aadhar) newErrors.Aadhar = 'Please enter your Aadhar Number.';
        console.log(newErrors)
        setErrors(newErrors);
        return newErrors;
    };

    const nextStep = () => {
        let temp = {};
        if (step === 1)
            temp = validateForm1();
        if (step === 2)
            temp = validateForm2();
        if (Object.keys(temp).length > 0) {
            console.log("Yes");
            return;
        }

        console.log(FormData.FullName)
        setErrors({});
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    const [isDocVerified, setDocVerify] = useState();
    const [aadharData, setAadhaarData] = useState(null);
    const [buttonVisible, setButtonVis] = useState(true);
    const [docLoading, setDocLoading] = useState(false);

    const [isPANVerified, setPANDocVerify] = useState();
    const [panDATA, setPANData] = useState(null);
    const [PANLoading, setPANDocLoading] = useState(false);
    const [buttonPANVisible, setPANButtonVis] = useState(true);

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleAadharCheck = async (e) => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        setButtonVis(false);
        setDocLoading(true);

        setTimeout(() => {
            setDocLoading(false);
        }, 2000);

        setDocVerify(true);
    }

    const handleAadharVerify = async (e) => {

        const data = new FormData();
        data.append('formData', formData.file);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://127.0.0.1:3002/uploadAadhaar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('File uploaded successfully:', responseData);
                setAadhaarData(responseData);
            } else {
                console.error('Error uploading file:', response.statusText);
                setDocVerify(false);
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setDocVerify(false);
            throw new Error("Error in Aadhaar Verification");
        }
    };

    const handlePanCheck = async (e) => {
        if (!PANfile) {
            alert('Please select a file first.');
            return;
        }

        setPANButtonVis(false);
        setPANDocLoading(true);

        setTimeout(() => {
            setPANDocLoading(false);
        }, 2000);

        setPANDocVerify(true);
    }

    const handlePANVerify = async (e) => {

        const pandata = new FormData();
        pandata.append('formPANData', formData.PANfile);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://127.0.0.1:3002/uploadPAN', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: pandata,
            });


            if (response.ok) {
                const responseData = await response.json();
                console.log('File uploaded successfully:', responseData);
                setPANData(responseData);
            } else {
                console.error('Error uploading file:', response.statusText);
                setPANDocVerify(false);
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setPANDocVerify(false);
            throw new Error("Error in PAN Verification");
        }
    };

    const handleFormData = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setSuccess(''); // Clear previous success message

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3002/api/v1/form/kycform/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('Registration successful!');
                setTimeout(() => {
                    navigate('/thankskyc');
                }, 2000);
            } else if (response.status === 401) {
                alert('Unauthorized. Please log in again.');
                navigate('/login');
            }
            else if (response.status === 400) {
                navigate('/alreadyapplied');
            }
            else {
                setErrors(result.errors || { msg: result.msg });
            }
            handleAadharVerify();
            handlePANVerify();
        } catch (error) {
            console.error('Error:', error);
            setErrors({ msg: 'An unexpected error occurred. Please try again.' });
        }
    };

    const options = useMemo(() => countryList().getData(), [])
    const showopt = []
    for (let i = 0; i < options.length; i++) {
        showopt.push(<option key={options[i].value} value={options[i].value}>{options[i].label}</option>)
    }

    return (
        < div className="relative min-h-screen flex" style={{ backgroundColor: '#608CFE' }}>
            <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                <div className="mt-2 text-6xl font-sans text-center">
                    KYC Verification
                </div>

                <form onSubmit={handleFormData} className="my-6 md:w-4/5 mx-auto rounded-3xl" style={{ backgroundColor: 'white' }}>
                    {step === 1 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-base font-light text-center  ">
                                Step 1/4
                            </div>
                            <div className="mt-4 w-full h-2" style={{ backgroundColor: 'lightgray' }}>
                                <div className="h-full w-1/4 bg-[#608CFE] rounded-3xl"></div>
                            </div>
                            <div className="mt-12 text-3xl text-center">
                                Identity Details
                            </div>

                            {/* Name input field */}
                            <div>
                                <label htmlFor="name" className="block mt-4 font-semibold">
                                    1. Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    name="FullName" // This should match your formData property
                                    className="mt-4 w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                                    style={{ backgroundColor: '#eeeeee' }}
                                    value={formData.FullName} // This correctly points to formData.name
                                    onChange={handleChange}
                                />
                                {errors.FullName && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.FullName}
                                    </div>
                                )}
                            </div>

                            {/* Father's Name */}
                            <div>
                                <label htmlFor="name" className="block mt-4 font-semibold">
                                    2. Father's Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter father's Name"
                                    name="FatherName" // This should match your formData property
                                    className="mt-4 w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                                    style={{ backgroundColor: '#eeeeee' }}
                                    value={formData.FatherName} // This correctly points to formData.name
                                    onChange={handleChange}
                                />
                                {errors.FatherName && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.FatherName}
                                    </div>
                                )}
                            </div>

                            {/* Gender and Marital Status */}
                            <div>
                                <div className="grid grid-cols-2 gap-8 mt-4">
                                    <div>
                                        <label htmlFor="gender" className="block font-semibold">
                                            3. Gender
                                        </label>
                                        <div className="mt-2 space-y-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="Gender"
                                                    value="Male"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.Gender === 'Male'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Male</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="Gender"
                                                    value="Female"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.Gender === 'Female'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Female</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="Gender"
                                                    value="Others"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.Gender === 'Others'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Others</span>
                                            </label>
                                            {errors.Gender && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.Gender}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="maritalStatus" className="block font-semibold">
                                            4. Marital Status
                                        </label>
                                        <div className="mt-2 space-y-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="MaritalS"
                                                    value="Married"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.MaritalS === 'Married'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Married</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="MaritalS"
                                                    value="Single"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.MaritalS === 'Single'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Single</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="MaritalS"
                                                    value="Prefer Not to Say"
                                                    className="form-radio h-6 w-6 transition duration-200 ease-in-out transform hover:scale-110"
                                                    checked={formData.MaritalS === 'Prefer Not to Say'}
                                                    onChange={handleChange}
                                                />
                                                <span className="ml-2 text-lg">Prefer Not to Say</span>
                                            </label>
                                            {errors.MaritalS && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.MaritalS}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Date of Birth */}
                            <div className="mt-4">
                                <label htmlFor="dob" className="block font-semibold">
                                    5. Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="dob"
                                        name="DoB"
                                        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                                        style={{ backgroundColor: '#eeeeee' }}
                                        value={formData.DoB}
                                        onChange={handleChange}
                                    />
                                    {errors.DoB && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.DoB}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Coutry/Nationality */}
                            <div className="mt-4">
                                <label htmlFor="nationality" className="block font-semibold">
                                    6. Nationality
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="nationality"
                                        name="Nationality"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                        style={{ backgroundColor: '#eeeeee' }}
                                        value={formData.Nationality}
                                        onChange={handleChange}
                                    >
                                        <option key="None" value="">Select a nationality</option>
                                        {showopt}
                                        {/* {renderCountryOptions()} */}
                                    </select>
                                    {errors.Nationality && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.Nationality}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="flex justify-end">
                                <button type="button" onClick={nextStep} className="mt-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-base font-light text-center  ">
                                Step 2/4
                            </div>
                            <div className="mt-4 w-full h-2" style={{ backgroundColor: 'lightgray' }}>
                                <div className="h-full bg-[#608CFE] rounded-3xl w-2/4"></div>
                            </div>
                            <div className="mt-12 text-3xl  text-center">
                                Address Details
                            </div>

                            {/* Address Details */}
                            <div>
                                <span className="block mt-4 font-semibold">
                                    7. Address:
                                </span>

                                <div className="mt-4">
                                    <label htmlFor="addressLine1" className="block mt-4 font-semibold">
                                        Address Line 1
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="addressLine1"
                                            name="StreetAddress1"
                                            placeholder='Address Line 1'
                                            className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                            value={formData.StreetAddress1}
                                            onChange={handleChange}
                                        />
                                        {errors.StreetAddress1 && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.StreetAddress1}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="addressLine2" className="block mt-4 font-semibold">
                                        Address Line 2
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="addressLine2"
                                            name="StreetAddress2"
                                            placeholder='Address Line 2'
                                            className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                            value={formData.StreetAddress2}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-row gap-[10px]'>
                                    <div className="mt-4 w-[100%]">
                                        <label htmlFor="city" className="block mt-4 font-semibold">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="city"
                                                placeholder='City'
                                                name="City"
                                                className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                                value={formData.City}
                                                onChange={handleChange}
                                            />
                                            {errors.City && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.City}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 w-[100%]">
                                        <label htmlFor="state" className="block mt-4 font-semibold">
                                            State
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="state"
                                                placeholder='State'
                                                name="State"
                                                className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                                value={formData.State}
                                                onChange={handleChange}
                                            />
                                            {errors.State && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.State}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-[10px]'>
                                    <div className="mt-4 w-[100%]">
                                        <label htmlFor="country" className="block mt-4 font-semibold">
                                            Country
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="country"
                                                name="Country"
                                                placeholder='Country'
                                                className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                                value={formData.Country}
                                                onChange={handleChange}
                                            />
                                            {errors.Country && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.Country}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 w-[100%]">
                                        <label htmlFor="postalCode" className="block mt-4 font-semibold">
                                            Postal Code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="Zip"
                                                placeholder='Postal Code'
                                                className="bg-gray-200 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
                                                value={formData.Zip}
                                                onChange={handleChange}
                                            />
                                            {errors.Zip && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.Zip}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Number input field */}
                            <div>
                                <label htmlFor="number" className="block mt-4 font-semibold">
                                    8. Aadhar Card Number
                                </label>
                                <div className="flex mt-4 gap-[10px]">
                                    <input
                                        type="text"
                                        placeholder="Aadhar Number"
                                        name="Aadhar" // This should match your formData property
                                        id="number" // This matches the htmlFor in the label
                                        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                                        style={{ backgroundColor: '#eeeeee' }}
                                        value={formData.Aadhar} // This should point to formData.number
                                        onChange={handleChange}
                                    />
                                    {errors.Aadhar && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.Aadhar}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* PAN Input */}
                            <div>
                                <label htmlFor="number" className="block mt-4 font-semibold">
                                    9. PAN Number
                                </label>
                                <div className="flex mt-4 gap-[10px]">
                                    <input
                                        type="text"
                                        placeholder="Enter your PAN Number"
                                        name="Pan" // This should match your formData property
                                        id="Pan" // This matches the htmlFor in the label
                                        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none"
                                        style={{ backgroundColor: '#eeeeee' }}
                                        value={formData.Pan} // This should point to formData.number
                                        onChange={handleChange}
                                    />
                                    {errors.Pan && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.Pan}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center mt-12">
                                <button type="button" onClick={prevStep} className=" mr-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Previous
                                </button>
                                <button type="button" onClick={nextStep} className="bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div
                            key={step} // Add this line
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:w-3/5 mx-auto py-12">
                            <div className="text-base font-light text-center">
                                Step 3/4
                            </div>
                            <div className="mt-4 w-full h-2" style={{ backgroundColor: 'lightgray' }}>
                                <div className="h-full bg-[#608CFE] rounded-3xl w-3/4"></div>
                            </div>
                            <div className="mt-6 text-3xl  text-center">
                                Document Upload/Verification
                            </div>
                            <div>
                                <div className="w-full mt-4">
                                    <span htmlFor="number" className="block mt-4 font-semibold">
                                        10. Upload Aadhar Card
                                    </span>
                                    <div className="w-full mt-2 h-auto rounded-xl bg-white shadow-md border border-slate-500 p-5">
                                        <label
                                            htmlFor="input"
                                            className="block text-slate-800 text-base font-medium mb-1.5">
                                            {/* Upload file */}
                                        </label>
                                        <div className="flex items-start w-full">
                                            {file ? (
                                                <div className="w-full text-start my-3">
                                                    <div className="relative w-full inline-block">
                                                        <div className="w-full h-auto px-3 py-1 text-[0.8rem] bg-gray-200 text-gray-800 dark:bg-gray-800 dark:bg-gray-white rounded-xl">
                                                            <span className="w-full text-black text-base font-medium">
                                                                File Name:{" "}
                                                            </span>
                                                            {file}
                                                            <button className="absolute -top-[-8px] -right-1 pr-[20px]  text-red-500 dark:text-red-400 cursor-pointer rounded-xl" onClick={handleClearFile}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor="dragdrop-file"
                                                    className="flex flex-col items-center justify-center w-full h-[17vh] 
                                                    border-2 border-gray-400 border-dashed rounded-xl cursor-pointer bg-gray-50 mb-3"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload-fill text-gray-500" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0" />
                                                        </svg>
                                                        <p className='md-2 dark:text-gray-400'>
                                                            <span className='font-medium'>
                                                                Click to Upload {" "}
                                                            </span>
                                                        </p>
                                                        <p className='text-xs text-gray-500'>
                                                            SVG, PNG, JPEG
                                                        </p>
                                                    </div>
                                                </label>
                                            )}
                                        </div>
                                        <input id='dragdrop-file' type="file" name="file" className='hidden'
                                            onChange={handleAadharUpload}
                                        />
                                        {buttonVisible && (
                                            <div className="w-100 text-center" >
                                                <button type="button" onClick={handleAadharCheck} className="mr-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                                    Upload
                                                </button>
                                            </div>
                                        )}

                                        {docLoading && (
                                            <div className="w-100 text-center" >
                                                <ClipLoader size={52} color='#608CFE' />
                                            </div>
                                        )}

                                        {isDocVerified && !docLoading && (
                                            <div className="w-100 text-center" >
                                                <Checkmark size='large' color="#608CFE" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="w-full mt-4">
                                    <span htmlFor="number" className="block mt-4 font-semibold">
                                        10. Upload PAN Card
                                    </span>
                                    <div className="w-full mt-2 h-auto rounded-xl bg-white shadow-md border border-slate-500 p-5">
                                        <label
                                            htmlFor="input"
                                            className="block text-slate-800 text-base font-medium mb-1.5">
                                            {/* Upload file */}
                                        </label>
                                        <div className="flex items-start w-full">
                                            {PANfile ? (
                                                <div className="w-full text-start my-3">
                                                    <div className="relative w-full inline-block">
                                                        <div className="w-full h-auto px-3 py-1 text-[0.8rem] bg-gray-200 text-gray-800 dark:bg-gray-800 dark:bg-gray-white rounded-xl">
                                                            <span className="w-full text-black text-base font-medium">
                                                                File Name:{" "}
                                                            </span>
                                                            {PANfile}
                                                            <button className="absolute -top-[-8px] -right-1 pr-[20px]  text-red-500 dark:text-red-400 cursor-pointer rounded-xl" onClick={handlePANClearFile}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor="pan-dragdrop-file"
                                                    className="flex flex-col items-center justify-center w-full h-[17vh] 
                                                    border-2 border-gray-400 border-dashed rounded-xl cursor-pointer bg-gray-50 mb-3"
                                                >
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload-fill text-gray-500" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0" />
                                                        </svg>
                                                        <p className='md-2 dark:text-gray-400'>
                                                            <span className='font-medium'>
                                                                Click to Upload {" "}
                                                            </span>
                                                        </p>
                                                        <p className='text-xs text-gray-500'>
                                                            SVG, PNG, JPEG
                                                        </p>
                                                    </div>
                                                </label>
                                            )}
                                        </div>
                                        <input id='pan-dragdrop-file' type="file" name="panfile" className='hidden'
                                            onChange={handlePANUpload}
                                        />
                                        {buttonPANVisible && (
                                            <div className="w-100 text-center" >
                                                <button type="button" onClick={handlePanCheck} className="mr-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                                    Upload
                                                </button>
                                            </div>
                                        )}

                                        {PANLoading && (
                                            <div className="w-100 text-center" >
                                                <ClipLoader size={52} color='#608CFE' />
                                            </div>
                                        )}

                                        {isPANVerified && !PANLoading && (
                                            <div className="w-100 text-center" >
                                                <Checkmark size='large' color="#608CFE" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-12">
                                <button type="button" onClick={prevStep} className=" mr-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Previous
                                </button>
                                <button type="button" onClick={nextStep} className=" bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}
                    {step === 4 && (
                        < motion.div
                            key={step} // Add this line
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="md:w-3/5 mx-auto py-12">
                            {console.log(formData)}
                            <div className="text-base font-light text-center  ">
                                Step 4/4
                            </div>
                            <div className="mt-4 w-full h-2" style={{ backgroundColor: 'lightgray' }}>
                                <div className="h-full bg-[#608CFE] rounded-3xl w-4/4"></div>
                            </div>
                            <div className="mt-12 text-3xl  text-center">
                                Declaration
                            </div>

                            <div className='pt-8'>
                                <span>
                                    I hereby declare that the information provided in this form is accurate and complete. I confirm that any information is found incorrect and/or incomplete that leads a violation of regulations may initiate legal actions, and I accept that I am the responsible party for any and all charges, penalties and violations.
                                </span>
                            </div>
                            <div className="flex justify-center mt-12">
                                <button type="button" onClick={prevStep} className=" mr-4 bg-[#608CFE] text-white font-bold py-2 px-4 rounded-xl">
                                    Previous
                                </button>
                                <button type="submit" className="bg-[black] text-white font-bold py-2 px-4 rounded-xl">
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    )}

                </form>
            </div>
        </div >
    );
}

export default ProjectPlannerForm;