import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import Headings from './sub_components/Headings';
import BankAccount from './sub_components/payment/BankAccount';
import Comcard from './sub_components/payment/Comcard';
import Comchecks from './sub_components/Comchecks';
import 'react-toastify/dist/ReactToastify.css';

// import {
//   BankAccoundICon, ComChecksIcon, ComCardIcon, Delete, Edit, RateIcon, CustomerIcon, CardNumIcon,
// } from './svg/icons/icon';
import Contextapi from '../context-api/createContext';
import DetailsOfFunding from './sub_components/payment/DetailsOfFunding';
import Loader from './sub_components/Loader';

function Fundingpayment() {
  const navigate = useNavigate();
  const [loaderflag, setLoaderFlag] = useState(false);
  const {
    paymentFlag,
    ref,
    bankaccountref,
    comcardref,
    setEditcomsflag,
    seteditcomcardflag,
    setEditbanckaccountflag,
    setBankDetails,
    setComcheckData,
    setComcardDetails,
    setIsnavabr,
    setWarnflag,
  } = useContext(Contextapi);
  const [paymentdetailflag, setPaymentdetailflag] = useState(false);
  const [borderColor1, setBorderColor1] = useState('border-b-4 border-[#258CFB]');
  const [borderColor2, setBorderColor2] = useState(null);
  const [borderColor3, setBorderColor3] = useState(null);
  const [context, setContext] = useState(<BankAccount />);

  const [height, setHeight] = useState('h-[409px]');
  const sid = sessionStorage.getItem('sid');
  const token = sessionStorage.getItem('token');
  const [fundingDetails, setFundingDetails] = useState({});
  const [comdataCard, setComdataCard] = useState([]);
  const [comchecks1, setComchecks] = useState([]);
  const [bankaccount, setBankaccount] = useState([]);
  const [Isverified, setIsverified] = useState(false);

  // Authorization
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
        setWarnflag(false);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.warn('Please Dont Leave This Page Before Submit Your Payment ', {
        autoClose: 5000,
        position: 'top-center',
        className: 'w-[500px]',
      });
    });
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    (async () => {
      const url = `https://mobile.singlepointgroup.com/api/payment/schedule-id/${sid}`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        });
        // eslint-disable-next-line max-len
        setFundingDetails(response.data);
        // eslint-disable-next-line max-len
        if (response.data.comdata_cards.length || response.data.comchecks.length || response.data.bank_accounts.length) {
          setComdataCard(response.data.comdata_cards);
          setComchecks(response.data.comchecks);
          setBankaccount(response.data.bank_accounts);
          setPaymentdetailflag(true);
        } else {
          setPaymentdetailflag(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [paymentFlag, paymentdetailflag]);

  const BankAccound = () => {
    if (borderColor2 || borderColor3) {
      setComcheckData('');
      setComcardDetails('');
      setContext(<BankAccount />);
      setBorderColor2(null);
      setHeight('h-[409px]');
      setBorderColor3(null);
      setBorderColor1('border-b-4 border-[#258CFB]');
      setEditcomsflag(false);
      seteditcomcardflag(false);
    }
  };
  const Comcards = () => {
    if (borderColor1 || borderColor3) {
      setContext(<Comcard />);
      setBorderColor1(null);
      setBorderColor3(null);
      setHeight('h-[750px]');
      setBorderColor2('border-b-4 border-[#258CFB]');
      setEditcomsflag(false);
      setEditbanckaccountflag(false);
      setBankDetails('');
      setComcheckData('');
    }
  };
  const comchecks = () => {
    if (borderColor2 || borderColor1) {
      setBankDetails('');
      setComcardDetails('');
      setContext(<Comchecks />);

      setBorderColor1(null);
      setBorderColor2(null);
      setHeight('h-[283px]');
      setBorderColor3('border-b-4 border-[#258CFB]');
      seteditcomcardflag(false);
      setEditbanckaccountflag(false);
    }
  };
  const scheduleComplete = async () => {
    setLoaderFlag(true);
    const url = 'https://mobile.singlepointgroup.com/api/schedule/new-completed';
    const body = {
      schedule_id: sid,
      is_new: true,
    };
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      if (response.status === 200) {
        setLoaderFlag(false);
        toast.success('Schedule Completed', {
          autoClose: 1000,
        });
        navigate('/funding');
      }
    } catch (error) {
      setLoaderFlag(false);

      console.log(error);
    }
  };
  return Isverified && (
    <>
      {loaderflag && <Loader />}
      <div className="w-[1168px] mx-auto mt-[45px] font-sfPro  ">
        <div className="flex justify-between items-center">

          <Headings
            heading="Payment Instructions"
            title="Enter the payment instructions
          below"
          />
          <button
            type="button"
            className="w-32 h-[38px] text-base font-normal text-[#ffffff] border flex justify-center items-center bg-slate-600 rounded-lg"
            onClick={() => {
              navigate('/funding/create_shedule');
            }}
          >
            <FiArrowLeft />
            Back
          </button>
        </div>
        <div className="w-full flex gap-9 mt-[30px]">
          {/* first col */}
          <div style={{ boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.12)' }} className={`w-[620px] ${height} bg-[#ffffff] rounded-xl px-[36px] py-[30px] transition-all duration-200 overflow-hidden flex flex-col gap-[38px]`}>
            {/* nav toggle */}
            <div className="w-full h-[35px]  flex justify-between">
              <div type="button" ref={bankaccountref} role="none" className={`w-[150.67px] h-full flex flex-col justify-between ${borderColor1} cursor-pointer transition-all duration-200 `} onClick={BankAccound}>
                <h3 className="font-[500] text-base text-black">Bank Account</h3>

              </div>
              <div type="button" ref={comcardref} role="none" className={`w-[150.67px] h-full flex flex-col justify-between ${borderColor2} cursor-pointer  transition-all duration-100`} onClick={Comcards}>
                <h3 className="font-[500] text-base text-black">Comcard</h3>

              </div>
              <div type="button" ref={ref} role="none" className={`w-[150.67px] h-full flex flex-col justify-between ${borderColor3} cursor-pointer  transition-all duration-100`} onClick={comchecks}>
                <h3 className="font-[500] text-base text-black">Comchek</h3>

              </div>

            </div>
            {context}
          </div>

          {/*  2nd col  */}
          <div className="w-[514px] flex  flex-col gap-[28px]  ">
            {/* first row div */}
            {/* outer dib\v */}
            {paymentdetailflag && <DetailsOfFunding comdataCard={comdataCard} comchecks1={comchecks1} bankaccount={bankaccount} />}

            {/* 2nd row */}
            <div
              style={{
                boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.12)',
              }}
              className="w-full h-[276.16px] mb-11 bg-[#ffffff] rounded-xl px-[36px] py-[30px] flex flex-col justify-between"
            >
              {/* innner div  */}
              <div className="w-full h-[107.16px]  flex">
                <div className="w-[50%] h-full  flex flex-col  justify-between">
                  <p className="font-[500] text-base text-black">Total Fund:</p>
                  <p className="font-[500] text-base text-black">Advances/Deductions:</p>
                  <p className="font-[500] text-base text-black">Balance fund:</p>

                </div>
                <div className="w-[50%] h-full  flex flex-col justify-between text-right">
                  <p className="font-normal text-base text-black">
                    $
                    {fundingDetails.total_fund}
                  </p>
                  <p className="font-normal text-base text-black">
                    $
                    {fundingDetails.advance}
                  </p>
                  <p className="font-normal text-base text-black">
                    $
                    {fundingDetails.payment_left}
                  </p>

                </div>
              </div>
              <button
                type="submit"
                onClick={scheduleComplete}
                className={`font-sfPro leading-5  w-[102px] h-[53px] rounded-xl  ${fundingDetails.payment_left !== 0 ? ' bg-slate-300' : 'bg-[#258CFB]'} flex items-center justify-center font-[500] text-lg text-[#ffffff] `}
                disabled={fundingDetails.payment_left !== 0}
              >
                Submit

              </button>

            </div>

          </div>

        </div>
      </div>
      <ToastContainer />
    </>

  );
}

export default Fundingpayment;
