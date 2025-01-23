/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Delete } from '../svg/icons/icon';
import 'react-toastify/dist/ReactToastify.css';

function DraftCard({
  status, load, amount, date, _id, setFlag, flag,
}) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const updatedDate = new Date(date);
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsName = month[updatedDate.getMonth()];

  const deleteDraft = async (e) => {
    e.stopPropagation();
    try {
      const url = `https://mobile.singlepointgroup.com/api/schedule/delete-new/${_id}`;
      const responce = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responce.status === 200) {
        toast.error('Draft Deleted', {
          autoClose: 1000,
        });
        setTimeout(() => {
          setFlag(!flag);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        role="none"
        className="bg-[#ffffff] sm:max-w-[570px]  w-full h-[89.1px] rounded-xl flex items-center justify-center font-sfPro shadow-[#000000] cursor-pointer "
        onClick={() => {
          sessionStorage.setItem('sid', _id);
          navigate('/funding/create_shedule');
        }}
      >

        <div className="sm:max-w-[513px] w-full h-[70%]  flex items-center justify-between gap-4 px-2">
          <div className="flex  items-center justify-between  w-full ">
            <div className="max-w-[85px]  w-full h-[49px] bg-[#EAEAEA] rounded-lg flex items-center justify-center gap-2">
              <p className="text-[#000000] font-[700] text-xl ">
                {updatedDate.getDate()}
              </p>
              <p className="text-[#000000] font-[300] text-base ">{monthsName}</p>
            </div>
            <div>
              <p className="text-[#000000] font-medium text-sm">Status:</p>
              <p className="font-light text-sm text-[#0000005e]">{status}</p>
            </div>
            <div>
              <p className="text-[#000000] font-medium text-sm">Loads:</p>
              <p className="font-light text-sm text-[#0000005e]">{load}</p>
            </div>
            <div>
              <p className="text-[#000000] font-medium text-sm">Funding Amount:</p>
              <p className="font-light text-sm text-[#0000005e]">
                $
                {amount}
              </p>
            </div>
          </div>
          <button type="button" aria-label="button delete draft  " className="cursor-pointer" onClick={deleteDraft}>
            <Delete />
          </button>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}

export default DraftCard;
