import React, { useEffect } from 'react';
import axios from 'axios';
import {
  CheckSignModal, Contacticon, AddressIcon, Cross, NoBuy, ContactDepartment,
} from '../svg/icons/icon';

function ModalStructure(props) {
  const handleClose = (e) => {
    if (e.target.id === 'conatiner') props.closeModal();
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        console.log();
        const url = 'https://mobile.singlepointgroup.com/api/history/add';
        const body = {
          company_id: sessionStorage.getItem('comId'),
          customer_id: props.alldetails._id,
        };
        await axios.post(url, body, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
    return () => clearTimeout(timer);
  }, [props.alldetails._id]);

  return (
    <div role="none" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0     flex flex-col  justify-center items-center  " onClick={handleClose} id="conatiner">
      <button
        type="button"
        className="relative top-[43px] left-[167px]  text-[#FFFFFF]     "
        onClick={() => {
          props.closeModal();
        }}
      >
        <Cross />
      </button>
      <div className=" w-[309px] h-[397px]  bg-[#F5F5F5] mx-auto my-11 rounded-lg overflow-hidden relative     ">

        <div className=" h-[147px] w-full] bg-[#258CFB] " />

        <div className="  mx-9 h-full w-[245px]  absolute top-0 flex flex-col justify-around">
          <div className=" ml-2">
            <span className=" font-normal font-sfPro text-sm text-[#FFFFFF] leading-5  ">{props.alldetails.mc_number}</span>
            <p className="font-[400] text-sm text-[#ffffff]">{props.alldetails.customer_name}</p>

          </div>
          <div className="w-[245px] h-[69px] rounded-xl bg-[#ffffff]">

            <div className="mx-[22px]  h-full flex gap-3  items-center  font-sfPro">
              <div>

                {props.alldetails.credit_status === 'approved' ? <CheckSignModal /> : ''}
                {props.alldetails.credit_status === 'no buy' ? <NoBuy /> : ''}
                {props.alldetails.credit_status === 'contact credit department' ? <ContactDepartment /> : ''}

              </div>
              <div>
                <p className="font-[400] text-xs ">Status</p>
                <p className="font-[400] text-sm capitalize">{props.alldetails.credit_status}</p>

              </div>
            </div>
          </div>

          <div className="h-[155px] w-full  bg-[#FFFFFF] rounded-lg flex flex-col justify-evenly ">

            <div className="flex mx-[22px] gap-3  font-sfPro">
              <div>
                <Contacticon />
              </div>
              <div>
                <p className="text-[#258CFB]  font-[400] text-xs">Contact Details</p>

                <p className="text-[#000000] font-[400] text-sm">{props.alldetails.phone}</p>
              </div>
            </div>

            <div className="flex mx-[22px] gap-3  font-sfPro">
              <div>
                <AddressIcon />
              </div>
              <div>
                <p className="text-[#258CFB]  font-[400] text-xs">Address</p>

                <p className="text-[#000000] font-[400] text-sm">
                  {props.alldetails.city}
                  ,
                  {' '}
                  {' '}

                  {props.alldetails.state}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ModalStructure;
