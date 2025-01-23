import React, { useEffect, useState, useContext } from 'react';
import {
  NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import { CgProfile ,CgFileDocument} from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';
import {
  NotificationIcon, Profiledrpicon,
  DisclaimerIcon, PoliciesIcon, LanguageIcon, ContactUsIcon, SignOutIcon,
} from './svg/icons/icon';
import 'react-toastify/dist/ReactToastify.css';
import Container from './atoms/Container';
import Frame from './Modal/frame';
import Contextapi from '../context-api/createContext';

function Navbar() {
  const { isnavbar } = useContext(Contextapi);
  const useriogo = sessionStorage.getItem('logo');

  const location = useLocation().pathname;

  const [optionsShowing, setOptionsShowing] = useState(false);

  const closeModal = () => {
    setOptionsShowing(false);
  };

  return isnavbar && (
    <>

      <ToastContainer />
      <div className="flex flex-col bg-white   ">
        <Container className="flex p-6 justify-between items-center">

          <div className="flex items-center gap-12">

            <NavLink to="/">
              {' '}
              <img src="images/singlogo.png" alt="logo" className=" h-14 w-15 bg-gray-700 " />
            </NavLink>

            <div className="flex gap-12">

              <NavLink
                to="/"
                className={({ isActive }) => classNames(({
                  'px-2 py-[1%] rounded-lg': true,
                  'navBg text-[#258CFB]': isActive || location === '/blogpage2',
                }))}
              >
                Home
              </NavLink>

              {[{
                label: 'Credit',
                to: '/credit',
              }, {
                label: 'Funding',
                to: '/funding',
              }, {
                label: 'Account',
                to: '/account',
              },
              {
                label: 'Load Board',
                to: '/loardboard',
              }].map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) => classNames(({
                    'px-2 py-[1%] rounded-lg': true,
                    'navBg text-[#258CFB]': isActive,
                  }))}
                >
                  {label}
                </NavLink>
              ))}
            </div>

          </div>

          <div className="flex items-cente relative">

            <div
              className=" max-w-[40px] h-[40px] rounded-[50%] overflow-hidden cursor-pointer  "
              onClick={() => setOptionsShowing(!optionsShowing)}
            >
              {useriogo ? <img src={useriogo} alt="images" className="min-w-full min-h-full w-full scale-100" /> : <CgProfile className=" w-full h-full text-opacity-[.4] text-black min-w-full" />}

            </div>

            <div>
              {optionsShowing && (
                <>
                  <div style={{ boxShadow: ' 0px 4px 12px rgba(0, 0, 0, 0.15)' }} className="text-black text-opacity-[0.6] font-normal font-sfPro text-base rounded-md  w-[150px]     absolute top-8 right-1   bg-gray-50 z-10">
                    <Frame closeModal={closeModal} />
                  </div>
                  <div
                    type="button"
                    role="none"
                    className="fixed w-full h-full left-0 top-0  cursor-pointer"
                    onClick={() => setOptionsShowing(false)}
                  />
                </>
              )}
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}

export default Navbar;
