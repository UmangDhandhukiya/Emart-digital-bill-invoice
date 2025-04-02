import React, { useState } from 'react';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+90');

    const handleUpdateProfile = () => {
        console.log('Profile updated:', { name, phone, countryCode });
        alert('Profile updated successfully!');
    };

    return (
        <div className="bg-gray-100 font-poppins">
            <div className="w-full max-w-sm bg-white p-6 shadow-md rounded-lg">
                <header className="mb-6 text-center">
                    <h1 className="text-lg font-semibold">Edit Profile</h1>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProfile();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 hover:bg-gray-100 transition-all duration-200"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className="flex items-center border-b-2 border-gray-300 px-3 py-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="mr-2 bg-transparent focus:outline-none transition-all duration-200"
                            >
                                <option value="+90">🇹🇷 +90</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+91">🇮🇳 +91</option>
                            </select>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-grow focus:outline-none transition-all duration-200"
                                placeholder="555 555 55 55"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;