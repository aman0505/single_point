import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { RateIcon, CustomerIcon, CardNumIcon } from '../../svg/icons/icon';
import 'react-toastify/dist/ReactToastify.css';
import Contextapi from '../../../context-api/createContext';
import Loader from '../Loader';

function Comcard() {
  const comid = sessionStorage.getItem('comId');
  const [cardDetsils, setCardDetails] = useState([]);
  const [loaderflag, setLoaderFlag] = useState(false);
  const {
    paymentFlag,
    setPaymentFlag,
    comcardDetails,
    setComcardDetails,
    editcomcardflag,
    editcomcard,
    cardDetails,
  } = useContext(Contextapi);

  const [isCheckedbox, setIsCheckedbox] = useState(false);
  const token = sessionStorage.getItem('token');
  const sid = sessionStorage.getItem('sid');

  const handler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setComcardDetails({
      ...comcardDetails, [e.target.name]: e.target.value,
    });
  };

  const handlerCheckbox = (e) => {
    setIsCheckedbox(e.target.checked);
  };

  document.querySelector('input').addEventListener('mouseup', (e) => {
    e.stopPropagation();
  });

  useEffect(() => {
    (async () => {
      const url = `https://mobile.singlepointgroup.com/api/company/id/${comid}`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCardDetails(response.data.record.cards);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [paymentFlag]);

  useEffect(() => {

  }, [paymentFlag]);

  const submit = async (e) => {
    e.preventDefault();

    if (comcardDetails.length === 0) {
      toast.warn('Please Fill The Data ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    if (comcardDetails.amount === '' || comcardDetails.card_number === '' || comcardDetails.card_holder_name === '') {
      toast.warn('Please Fill The Data ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    try {
      if (comcardDetails.card_number) {
        if ((comcardDetails.card_number).length !== 4) {
          toast.warn('Card Number Must Be 4 Digit', {
            autoClose: 1500,
            pauseOnHover: false,
          });
          return false;
        }
      }
      const url = 'https://mobile.singlepointgroup.com/api/payment/add';
      const body = {
        comdata_cards: {
          card_number: Number(comcardDetails.card_number),
          card_holder_name: comcardDetails.card_holder_name,
          amount: Number(comcardDetails.amount),
        },
        schedule_id: sid,
        card_save: isCheckedbox,
      };
      setLoaderFlag(true);
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoaderFlag(false);

      toast.success(response.data.message, {
        autoClose: 1500,
        pauseOnHover: false,
      });
      setPaymentFlag(!paymentFlag);
    } catch (error) {
      console.log(error);
      toast.warn(error.response.data.error, {
        autoClose: 1500,
        pauseOnHover: false,
      });
      setLoaderFlag(false);
    }
  };

  const updateDate = async () => {
    console.log(comcardDetails);
    if (comcardDetails.length === 0) {
      toast.warn('Please Fill The Data ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    if (comcardDetails.amount === 0) {
      toast.warn('Amount Must Be Greater Than 0 ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
   
    console.log( comcardDetails.hasOwnProperty('amount'));
    if (!comcardDetails.hasOwnProperty('amount')) {
      toast.warn('Amount Must  Required ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    if (!comcardDetails.hasOwnProperty('card_number')) {
      toast.warn('card Number Must Required ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    if (!comcardDetails.hasOwnProperty('card_holder_name')) {
      toast.warn('Card Holder Name Must Required ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }

    if (comcardDetails.amount === '' || comcardDetails.card_number === '' || comcardDetails.card_holder_name === '') {
      toast.warn('Please Fill The Data ', {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return false;
    }
    if (comcardDetails.card_number) {
      if ((comcardDetails.card_number).length !== 4) {
        toast.warn('Card Number Must Be 4 Digit', {
          autoClose: 1500,
          pauseOnHover: false,
        });
        return false;
      }
    }
    console.log(comcardDetails, '%%%%');
    try {
      const url = 'https://mobile.singlepointgroup.com/api/payment/edit-payment';
      const body = {
        schedule_id: sid,
        pay_id: editcomcard.id,
        payment_type: 'comdata_cards',
        data: {

          amount: Number(comcardDetails.amount),
          card_number: Number(comcardDetails.card_number),
          card_holder_name: comcardDetails.card_holder_name,
          id: editcomcard.id,
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

        // setComcardDetails([]);
        setPaymentFlag(!paymentFlag);
        toast.success('Payment Updated', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      setLoaderFlag(false);
    }
  };

  return (
    <>
      {loaderflag && <Loader />}
      <div>
        <div className="mt-[36] h-[610px] w-[512px]  flex flex-col justify-between  transition-all duration-200">
          <h1 className="h-6 w-full  text-xl font-medium font-sfPro">Saved Cards</h1>
          <div className="h-[137px] w-full  flex gap-[14px] rounded-xl ">
            <div className="w-full px-6 h-[137px] overflow-x-scroll flex items-center  gap-3 scroll whitespace-nowrap scroll-smooth scrollbar-hide">

              {cardDetsils.map((data, index) => (
                <div role="none" className="w-[249px] cursor-pointer   h-full flex flex-col  justify-center rounded-xl pr-[40px] pl-[20px] " onClick={() => { cardDetails(data); }} style={{ background: index % 2 === 0 ? 'linear-gradient(251.59deg, #47B2FF -6.9%, #1565C2 103.63%)' : 'linear-gradient(244.44deg, #FDBA04 -7.52%, #FD9904 101.5%)' }}>
                  <p className="text-[#ffffff] font-medium text-base  ">
                    XXXX-XXXX-XXXX-
                    {data.card_number}
                  </p>
                  <p className="font-medium text-xs " style={{ color: ' rgba(255, 255, 255, 0.4' }}>{data.card_holder_name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[273px] w-full  rounded-xl flex flex-col justify-between ">
            <h1 className="w-[512px] font-medium text-xl text-[#000000]">Add a New Card</h1>
            <div className="pb-[16px] border-b-[1px]">
              <div className="flex gap-[18px] h-[19px]  items-center ">
                <div><CustomerIcon /></div>
                <input value={comcardDetails.card_holder_name} onChange={handler} type="text" placeholder="Card Holder Name" name="card_holder_name" className="focus:outline-none placeholder:text-black placeholder:text-opacity-[0.4]" />
              </div>
            </div>
            <div className="pb-[16px] border-b-[1px]">
              <div className="flex gap-[18px] h-[19px]  items-center ">
                <div><CardNumIcon /></div>
                <input value={comcardDetails.card_number} onChange={handler} type="number" placeholder="Card Number" name="card_number" className="focus:outline-none placeholder:text-black placeholder:text-opacity-[0.4]" />
              </div>
            </div>
            <div className="pb-[16px] border-b-[1px]">
              <div className="flex gap-[18px] h-[19px]  items-center ">
                <div><RateIcon /></div>
                <input
                  value={comcardDetails.amount}
                  onChange={handler}
                  type="number"
                  placeholder="Requested Amount"
                  className="focus:outline-none placeholder:text-black placeholder:text-opacity-[0.4]"
                  name="amount"
                />
              </div>
            </div>
            <div className="flex items-center gap-[18px]">
              <input onChange={handlerCheckbox} type="checkbox" name="card_save" value="true" className="w-[18px] h-[18px] " />
              <p
                className="font-normal text-base "
                style={{
                  color: 'rgba(0, 0, 0, 0.4)',

                }}
              >
                Do you want to save the card?
              </p>
            </div>
          </div>
          {editcomcardflag ? <button type="submit" onClick={updateDate} className="w-[254px] h-[53px] bg-[#258CFB] flex justify-center items-center font-medium text-lg text-[#ffffff] font-sfPro rounded-xl">Update Payment Instruction</button> : <button type="submit" onClick={submit} className="w-[254px] h-[53px] bg-[#258CFB] flex justify-center items-center font-medium text-lg text-[#ffffff] font-sfPro rounded-xl">Add Payment Instruction</button>}
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default Comcard;
