import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ToggleSwitch = ({ label, isEnabled, onToggle }) => (
    <li className="flex items-center justify-between mb-2 text-gray-500">
        <span className="flex items-center">
            <i className={`fas fa-${label.icon} mr-2`}></i>
            {label.text}
        </span>
        <div
            className={`relative inline-block w-10 h-6 cursor-pointer ${isEnabled ? 'bg-green-500' : 'bg-gray-300'} rounded-full`}
            onClick={onToggle}
            aria-label={`Toggle ${label.text}`}
            role="switch"
            aria-checked={isEnabled}
        >
            <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${isEnabled ? 'transform translate-x-4' : ''}`}
            ></div>
        </div>
    </li>
);

const LanguageModal = ({ isOpen, onClose, onSelectLanguage }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Choose Language</h2>
                <ul>
                    {['English', 'Spanish', 'French', 'German'].map((language) => (
                        <li
                            key={language}
                            className="cursor-pointer text-blue-500 hover:underline mb-2"
                            onClick={() => onSelectLanguage(language)}
                        >
                            {language}
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 text-gray-500 underline"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Profile = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [areNotificationsOn, setAreNotificationsOn] = useState(true);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    useEffect(() => {
        const savedPreferences = JSON.parse(localStorage.getItem('profilePreferences')) || {};
        setIsDarkMode(savedPreferences.isDarkMode || false);
        setAreNotificationsOn(savedPreferences.areNotificationsOn || true);
        setSelectedLanguage(savedPreferences.selectedLanguage || 'English');
    }, []);

    useEffect(() => {
        const preferences = { isDarkMode, areNotificationsOn, selectedLanguage };
        localStorage.setItem('profilePreferences', JSON.stringify(preferences));
    }, [isDarkMode, areNotificationsOn, selectedLanguage]);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            console.log('User logged out');
        }
    };

    const navigate = useNavigate()

    return (
        <div className={`font-poppins ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div
                className={`p-2 w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
                <h1 className="text-center text-xl font-semibold mb-2">
                    Profile
                </h1>

                <section>
                    <h2 className="text-green-500 font-bold text-sm sm:text-base mb-4">Account</h2>
                    <ul className="list-disc pl-5">
                        <li 
                        className="flex items-center mb-2 text-gray-500"
                        onClick={() => navigate ("/editprofile")}
                        >
                            <i className="fas fa-user mr-2"></i>
                            <a className="hover:underline">Edit Profile</a>
                        </li>
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-key mr-2"></i>
                            <a href="#" className="hover:underline">Change Password</a>
                        </li>
                    </ul>
                </section>

                <section className="mt-6">
                    <h2 className="text-green-500 font-bold text-sm sm:text-base mb-4">General</h2>
                    <ul className="list-disc pl-5">
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-box mr-2"></i>
                            <a href="#" className="hover:underline">Orders</a>
                        </li>
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-heart mr-2"></i>
                            <a href="#" className="hover:underline">Favorites</a>
                        </li>
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <a href="#" className="hover:underline">My Addresses</a>
                        </li>
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-credit-card mr-2"></i>
                            <a href="#" className="hover:underline">My Cards</a>
                        </li>
                    </ul>
                </section>

                <section className="mt-6">
                    <h2 className="text-green-500 font-bold text-sm sm:text-base mb-4">App Settings</h2>
                    <ul className="list-disc pl-5">
                        <ToggleSwitch
                            label={{ text: 'Notifications', icon: 'bell' }}
                            isEnabled={areNotificationsOn}
                            onToggle={() => setAreNotificationsOn((prev) => !prev)}
                        />
                        <ToggleSwitch
                            label={{ text: 'Dark Mode', icon: 'adjust' }}
                            isEnabled={isDarkMode}
                            onToggle={() => setIsDarkMode((prev) => !prev)}
                        />
                        <li className="flex items-center justify-between mb-2 text-gray-500">
                            <span className="flex items-center">
                                <i className="fas fa-language mr-2"></i>
                                Language
                            </span>
                            <button className="text-blue-500 underline" onClick={() => setIsLanguageModalOpen(true)}>
                                {selectedLanguage}
                            </button>
                        </li>
                        <li className="flex items-center mb-2 text-gray-500">
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            <button className="hover:underline" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </section>
            </div>

            <LanguageModal
                isOpen={isLanguageModalOpen}
                onClose={() => setIsLanguageModalOpen(false)}
                onSelectLanguage={(language) => {
                    setSelectedLanguage(language);
                    setIsLanguageModalOpen(false);
                }}
            />
        </div>
    );
};

export default Profile;