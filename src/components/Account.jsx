import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import webdriver from 'selenium-webdriver';
// import chromedriver from 'chromedriver';
import Container from './atoms/Container';
import Contextapi from '../context-api/createContext';

function Account() {
  const { setIsnavabr } = useContext(Contextapi);
  const navigate = useNavigate();
  const [isverified, setIsverified] = useState(false);
  const token = sessionStorage.getItem('token');
  const newurl = new URL('https://portal.singlepointgroup.com/');
  useEffect(() => {
    (async () => {
      try {
        await axios.get('https://mobile.singlepointgroup.com/api/auth/who-am-i', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsverified(true);
        setIsnavabr(true);
      } catch (error) {
        setIsverified(false);
        console.log(error);
        navigate('/login');
      }
    })();
  }, [isverified]);
  return (
    <Container className="mt-[52px]">

      <div className=" rounded-xl h-[373px]  max-w-[1170px] w-full relative overflow-hidden">

        <img src="images/unnamed.png" alt="imges" className="h-full w-full object-cover absolute " />
        <div className="w-full h-full flex justify-end gap-[9px] flex-col opacity-[0.9] px-[44px] py-[40px] absolute" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 100%)' }}>
          <p className="font-medium text-2xl font-sfPro text-[#ffffff]">Account Management</p>
          <p
            style={{
              fontWeight: '200',
            }}
            className="    text-[#ffffff]  text-[18px]  ml-[4px]"
          >
            Login to the Single Point client web portal to manage your account from anywhere.

          </p>
          <a href={newurl} target="_blank" rel="noreferrer">
            {' '}
            <button type="button" className="flex items-center justify-center  w-[188px] h-[53px] rounded-xl bg-[#258CFB] font-sfPro font-normal text-lg text-[#ffffff] ">Web Portal Login </button>
            {' '}
          </a>

        </div>
      </div>
      <div className="w-full mt-[40px]  ">

        {' '}
        <p className="font-medium text-base text-[#000000]">Web Portal Benefits</p>

        <p className=" font-normal text-base text-[#000000] mt-[12px]">From the web portal, you can:</p>
        <ul className="list-disc list-inside  mt-[12px]">
          <li>
            <span className="text-base font-bold text-[#000000]"> View </span>

            up-to-date financial information at a glance on the dashboard
          </li>
          <li>
            <span className="text-base font-bold text-[#000000]"> Review </span>

            and understand the status of account receivable
          </li>
          <li>
            <span className="text-base font-bold text-[#000000]"> Create and submit </span>
            purchase batches 
          </li>
          <li>
            <span className="text-base font-bold text-[#000000]"> Request and print </span>

            report and exports
          </li>
          <li>
            <span className="text-base font-bold text-[#000000]"> Search </span>

            existing invoices, payments, transactions, and debtors
          </li>
          <li>
            <span className="text-base font-bold text-[#000000]"> Add </span>

            debtors, request credit and disbursements, and much more
          </li>

        </ul>

      </div>
    </Container>
  );
}
export default Account;
