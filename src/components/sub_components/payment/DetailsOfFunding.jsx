import { useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {
  BankAccoundICon, ComChecksIcon, ComCardIcon, Delete, Edit,
} from '../../svg/icons/icon';
import Contextapi from '../../../context-api/createContext';
import 'react-toastify/dist/ReactToastify.css';

function DetailsOfFunding({ comdataCard, comchecks1, bankaccount }) {
  const sid = sessionStorage.getItem('sid');
  const token = sessionStorage.getItem('token');
  const {
    comcheckschange, comcardedit, bankaccountchange,
    setPaymentFlag, paymentFlag, seAccountTypetFlag,
  } = useContext(Contextapi);
  const deletecomcard = async (data) => {
    const url = 'https://mobile.singlepointgroup.com/api/payment/delete-payment';
    const body = {
      schedule_id: sid,
      pay_id: data.id,
      payment_type: 'comdata_cards',

    };
    try {
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.error('payment deleted', {
          autoClose: 1000,
        });
        setPaymentFlag(!paymentFlag);
      }
    } catch (error) {
      toast.warn('Something Went Wrong ', {
        autoClose: 1000,
      });
    }
  };
  // delete bankaccount payment
  const deletebankpayment = async (data) => {
    const url = 'https://mobile.singlepointgroup.com/api/payment/delete-payment';
    const body = {
      schedule_id: sid,
      pay_id: data.id,
      payment_type: 'bank_accounts',

    };
    try {
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.error('payment deleted', {
          autoClose: 1000,
        });
        setPaymentFlag(!paymentFlag);
      }
    } catch (error) {
      toast.warn('Something Went Wrong ', {
        autoClose: 1000,
      });
    }
  };
  // delete comchecks payment
  const deletecomcheckspayment = async (data) => {
    const url = 'https://mobile.singlepointgroup.com/api/payment/delete-payment';
    const body = {
      schedule_id: sid,
      pay_id: data.id,
      payment_type: 'comchecks',

    };
    try {
      const response = await axios.put(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.error('payment deleted', {
          autoClose: 1000,
        });
        setPaymentFlag(!paymentFlag);
      }
    } catch (error) {
      toast.warn('Something Went Wrong ', {
        autoClose: 1000,
      });
    }
  };

  return (

    <div
      style={{
        boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.12)',
      }}
      className="w-full pb-12 bg-[#ffffff] rounded-xl px-[36px] py-[30px] transition-all duration-1000 ease-in-out "
    >
      {/* content body */}
      {/* card 1st */}
      {
        bankaccount.map((data, index) => (
          <>
            <div className="w-full h-[96.9px]  flex flex-col justify-between mb-4 transition-all duration-1000 ease-in-out" key={data._id}>
              <h1>Bank Account</h1>
              <div className="w-full h-[48px]  flex items-center gap-10  ">
                <div className=" w-[340px]  h-full flex  items-center gap-[51px] ">
                  {/* 1st icon */}
                  <div
                    className="w-[48px]  h-[48px] rounded-xl flex justify-center items-center "
                    style={{
                      background: ' rgba(37, 140, 251, 0.2)',
                    }}
                  >
                    <BankAccoundICon />
                  </div>
                  <p
                    className="font-medium text-base  "
                    style={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {data.payment_type}
                  </p>
                </div>
                <div className="w-[230.73px] h-full items-center  flex justify-between ">
                  <div
                    className="font-semibold text-xl  h-full items-center flex  "
                    style={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    $
                    {data.amount}

                  </div>
                  <div className="w-[50px] h-full items-center  flex justify-between ">
                    <div
                      onClick={() => {
                        if (data.payment_type === 'Wire Transfer') {
                          seAccountTypetFlag(true);
                        }
                        if (data.payment_type === 'ACH Depsit') {
                          seAccountTypetFlag(false);
                        }
                        bankaccountchange(data);
                      }}
                      role="none"
                    >
                      <Edit />

                    </div>
                    <div className="cursor-pointer" role="none" onClick={() => { deletebankpayment(data); }}><Delete /></div>
                  </div>
                </div>
              </div>
            </div>
            {index === bankaccount.length - 1 ? <hr className="border-[1px solid] " /> : ''}

          </>
        ))
      }
      {/* card 2nd */}
      {comdataCard.map((comdata, comindex) => (
        <>
          <div className="w-full h-[96.9px]  flex flex-col justify-between mb-4 transition-all duration-1000 ease-in-out" key={comdata._id}>
            <h1>Comcard</h1>
            <div className="w-full h-[48px]  flex items-center gap-10  ">
              <div className=" w-[300px]   h-full flex  items-center gap-[50px] ">
                {/* 3rd icon */}
                <div
                  className="w-[48px]  h-[48px] rounded-xl flex justify-center items-center "
                  style={{
                    background: ' rgba(55, 188, 80, 0.2)',
                  }}
                >
                  <ComChecksIcon />
                </div>
                <div
                  className="font-medium text-base  items-center"
                  style={{
                    color: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div className=" w-35">
                    <p>{comdata.card_holder_name}</p>
                    <p>
                      **** **** ****
                      {' '}
                      {comdata.card_number}
                    </p>
                  </div>

                </div>
              </div>
              <div className="w-[200px] h-full items-center   flex justify-between">
                <div
                  className="font-semibold text-xl  h-full items-center flex "
                  style={{
                    color: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  $
                  {comdata.amount}
                </div>
                <div className="w-[50px] h-full items-center  flex justify-between  ">
                  <div onClick={() => comcardedit(comdata)} className="cursor-pointer" type="button" role="none"><Edit /></div>
                  <div onClick={() => deletecomcard(comdata)} className="cursor-pointer" type="button" role="none"><Delete /></div>
                </div>
              </div>
            </div>
          </div>
          {comindex === comchecks1.length - 1 ? <hr className="border-[1px solid ] " /> : ''}
        </>
      ))}

      {/* card 3rd */}

      {
        comchecks1.map((data, index) => (
          <div className="w-full h-[96.9px]  flex flex-col justify-between mb-4 transition-all duration-1000 ease-in-out" key={data._id}>
            <h1>Comcheck</h1>
            <div className="w-full h-[48px]  flex items-center gap-10  ">
              <div className=" w-[340px]  h-full flex  items-center gap-[51px]">
                {/* 2st icon */}
                <div
                  className="w-[48px]  h-[48px] rounded-xl flex justify-center items-center "
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                  }}
                >
                  <ComCardIcon />
                </div>
                <p
                  className="font-medium text-base  "
                  style={{
                    color: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  comcheck
                </p>
              </div>
              <div className="w-[230.73px] h-full items-center  flex justify-between ">
                <div
                  className="font-semibold text-xl  h-full items-center flex  "
                  style={{
                    color: 'rgba(0, 0, 0, 0.4)',
                  }}
                >
                  $
                  {data.amount}

                </div>
                <div className="w-[50px] h-full items-center  flex justify-between ">
                  <div role="none" type="button" onClick={() => { comcheckschange(data); }} className="cursor-pointer"><Edit /></div>
                  <div role="none" onClick={() => { deletecomcheckspayment(data); }} className="cursor-pointer" type="button"><Delete /></div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <ToastContainer />
    </div>
  );
}

export default DetailsOfFunding;
