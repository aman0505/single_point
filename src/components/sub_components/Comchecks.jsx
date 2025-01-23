import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Currancy } from '../svg/icons/icon';
import Contextapi from '../../context-api/createContext';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

function Comchecks() {
  const {
    paymentFlag,
    setPaymentFlag,
    editcomchecks,
    editcomsflag,
    setComcheckData,
    comcheckData,
  } = useContext(Contextapi);
  const token = sessionStorage.getItem('token');
  const sid = sessionStorage.getItem('sid');
  const [loaderflag, setLoaderFlag] = useState(false);
  document.querySelector('input').addEventListener('mouseup', (e) => {
    e.stopPropagation();
  });

  const handler = (e) => {
    setComcheckData({
      ...comcheckData, [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  }, [paymentFlag]);

  const submit = async (e) => {
    e.preventDefault();

    if (comcheckData.amount === '') {
      toast.warn('Please Enter Amount', {
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
    const url = 'https://mobile.singlepointgroup.com/api/payment/add';
    const body = {
      comchecks: {
        amount: Number(comcheckData.amount),
      },
      schedule_id: sid,
    };

    try {
      setLoaderFlag(true);
      const responce = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoaderFlag(false);

      toast.success(responce.data.message, {
        autoClose: 1500,
        pauseOnHover: false,
      });
      setPaymentFlag(!paymentFlag);
    } catch (error) {
      console.log(error);
      setLoaderFlag(false);
      toast.warn(error.response.data.error, {
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  const updateData = async (editcomchecksdata) => {
    try {
      const url = 'https://mobile.singlepointgroup.com/api/payment/edit-payment/';

      const body = {
        schedule_id: sid,
        pay_id: editcomchecksdata.id,
        payment_type: 'comchecks',
        data: {
          amount: Number(comcheckData.amount),
          id: editcomchecksdata.id,
        },
      };
      setLoaderFlag(true);
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoaderFlag(false);

        setComcheckData([]);
        setPaymentFlag(!paymentFlag);
        toast.success('Payment Updated', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      setLoaderFlag(false);
    }
  };

  return (
    <>
      {loaderflag && <Loader />}
      <div className="w-full h-full   ">
        <div className=" w-full h-[35px] border-b-[1px] border-b-gray-300  flex gap-[18px] items-center pb-[16px]   ">

          <div><Currancy /></div>
          <input onChange={handler} type="number" value={comcheckData.amount} placeholder="Requested Amount " name="amount" className=" w-full focus:outline-none placeholder:text-black placeholder:text-opacity-[0.4]" />

        </div>
        {editcomsflag ? <button onClick={() => updateData(editcomchecks)} type="submit" className=" mt-[41px] w-[254px] h-[53px] flex justify-center items-center rounded-xl bg-[#258CFB] font-medium text-lg text-[#ffffff] ">Update Payment Instruction</button> : <button onClick={submit} type="submit" className=" mt-[41px] w-[254px] h-[53px] flex justify-center items-center rounded-xl bg-[#258CFB] font-medium text-lg text-[#ffffff] ">Add Payment Instruction</button>}
        {/* <button onClick={submit} type="submit" className=" mt-[41px] w-[254px] h-[53px] flex justify-center items-center rounded-xl bg-[#258CFB] font-medium text-lg text-[#ffffff] ">Add Payment Instruction</button> */}
        <ToastContainer />
      </div>
    </>
  );
}

export default Comchecks;
