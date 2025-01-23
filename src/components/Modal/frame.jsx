import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Contextapi from '../../context-api/createContext';
import {
  DisclaimerIcon, PoliciesIcon, LanguageIcon, ContactUsIcon, SignOutIcon,
} from '../svg/icons/icon';

import 'react-toastify/dist/ReactToastify.css';
import Container from '../atoms/Container';

function Frame({ closeModal }) {
  const { setIsnavabr } = useContext(Contextapi);
  const handleClose = (e) => {
    if (e.target.id === 'conatiner') closeModal();
  };
  const navigate = useNavigate();

  const logout = () => {
    closeModal();

    toast.success('Logout successful', {
      autoClose: 500,
      pauseOnHover: false,
    });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('sid');
    sessionStorage.removeItem('comId');
    sessionStorage.removeItem('logo');
    setTimeout(() => {
      setIsnavabr(false);
    }, 1000);

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (

  // <div style={{ background: 'rgba(0, 0, 0, 0.6)' }} className="fixed  w-screen h-screen top-0 left-0 cursor-pointer  absolute z-10   " onClick={handleClose} id="conatiner">

    <>
      <div
        type="button"
        role="none"
        className="w-full  flex items-center  py-2 cursor-pointer justify-evenly"
        onClick={() => { logout(); }}
      >
        <SignOutIcon />

        Sign Out

      </div>

      <ToastContainer />
    </>
  //  </div>
  );
}

export default Frame;
