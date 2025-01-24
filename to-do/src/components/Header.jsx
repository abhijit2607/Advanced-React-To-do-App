import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-0">
        <img className="cursor-pointer" src={`${process.env.PUBLIC_URL}/Container.png`} alt="Logo" />
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="nav-icons"
          src={`${process.env.PUBLIC_URL}/search.svg`}
          alt="Search Icon"
        />
        <img
          className="nav-icons"
          src={`${process.env.PUBLIC_URL}/grid-view.svg`}
          alt="Grid View Icon"
        />
        <img
          className="nav-icons"
          src={`${process.env.PUBLIC_URL}/dark-theme.svg`}
          alt="Dark Theme Icon"
        />
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 transition-colors duration-150"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
