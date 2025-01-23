import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Currancy } from '../../svg/icons/icon';
import Contextapi from '../../../context-api/createContext';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

function BankAccount() {
  const {
    paymentFlag,
    setPaymentFlag,
    editbanckaccountflag,
    bankDetails,
    setBankDetails,
    editbankaccount,
    accountTypeflag,
    seAccountTypetFlag,
  } = useContext(Contextapi);
  const token = sessionStorage.getItem('token');
  const sid = sessionStorage.getItem('sid');
  const [loaderflag, setLoaderflag] = useState(false);
  const handler = (e) => {
    setBankDetails({
      ...bankDetails, [e.target.name]: e.target.value,

    });
  };
  

  // const [checkahc,setCheckahc]=useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = 'https://mobile.singlepointgroup.com/api/payment/add';

    if (accountTypeflag) {
      bankDetails.payment_type = 'Wire Transfer';
    } else {
      bankDetails.payment_type = 'ACH Depsit';
    }
    const body = {

      bank_accounts: {
        payment_type: bankDetails.payment_type,
        amount: Number(bankDetails.amount),
      },
      schedule_id: sid,
    };
    try {
      setLoaderflag(true);
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaymentFlag(!paymentFlag);
      setLoaderflag(false);
      toast.success(response.data.message, {
        autoClose: 1500,
        pauseOnHover: false,
      });
    } catch (error) {
      setLoaderflag(false);
      toast.warn(error.response.data.error, {
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  const update = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const url = 'https://mobile.singlepointgroup.com/api/payment/edit-payment';

      if (accountTypeflag) {
        bankDetails.payment_type = 'Wire Transfer';
      } else {
        bankDetails.payment_type = 'ACH Depsit';
      }

      const body = {
        schedule_id: sid,
        pay_id: editbankaccount.id,
        payment_type: 'bank_accounts',
        data: {
          payment_type: bankDetails.payment_type,
          amount: Number(bankDetails.amount),
          id: editbankaccount.id,
        },
      };
      setLoaderflag(true);
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setBankDetails([]);
        setPaymentFlag(!paymentFlag);
        setLoaderflag(false);
        toast.success('Payment Updated', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      setLoaderflag(false);

      toast.warn(error.response.data.error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      {loaderflag && <Loader />}
      <div className="w-full h-full   ">
        <div className=" w-full h-[35px] border-b-[1px] border-b-gray-300  flex gap-[18px] items-center pb-[16px]   ">

          <div><Currancy /></div>
          <input onChange={handler} value={bankDetails.amount} type="number" placeholder="Requested Amount " name="amount" className="w-full focus:outline-none placeholder:text-black placeholder:text-opacity-[0.4]" />

        </div>
        <div className="w-[134px] h-[98px] flex flex-col justify-between mt-[28px] ">
          <h4>Type</h4>
          <div className="w-full h-[24px]  gap-[13px] flex items-center">
            {bankDetails.payment_type === 'Wire Transfer' ? <input onChange={() => { seAccountTypetFlag(true); }} type="radio" id="radio" name="payment_type" value="Wire Transfer" checked={accountTypeflag} /> : <input onChange={() => { seAccountTypetFlag(true); }} type="radio" id="radio" name="payment_type" value="Wire Transfer" checked={accountTypeflag} />}

            <p className="font-normal text-base text-[#000000]">Wire Transfer</p>
          </div>
          <div className="w-full h-[24px] flex  gap-[13px] items-center">
            {bankDetails.payment_type === 'ACH Depsit' ? <input onChange={() => { seAccountTypetFlag(false); }} type="radio" id="radio" name="payment_type" value="ACH Depsit" checked={!accountTypeflag} /> : <input onChange={() => { seAccountTypetFlag(false); }} type="radio" id="radio" name="payment_type" value="ACH Depsit" checked={!accountTypeflag} />}

            <p className="font-normal text-base text-[#000000]">ACH Depsit</p>
          </div>
        </div>
        {editbanckaccountflag ? <button onClick={update} type="submit" className=" mt-[41px] w-[254px] h-[53px] flex justify-center items-center rounded-xl bg-[#258CFB] font-medium text-lg text-[#ffffff] ">Update Payment Instruction</button>
          : (
            <button onClick={sendData} type="submit" className=" mt-[41px] w-[254px] h-[53px] flex justify-center items-center rounded-xl bg-[#258CFB] font-medium text-lg text-[#ffffff] ">

              Add Payment Instruction
            </button>
          )}
        <ToastContainer />
      </div>

    </>
  );
}

export default BankAccount;
