import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { CgFileDocument } from 'react-icons/cg';
import { useNavigate } from 'react-router';
import { Delete, Edit } from '../svg/icons/icon';
import ScheduleModal from '../Modal/Loadmodal';
import 'react-toastify/dist/ReactToastify.css';
import Contextapi from '../../context-api/createContext';

function SchedulTablerow({
  Ldata, SetFlag, className, flag,
}) {
  const {
    SetValidpages, setData, setIsupdateload,
    setnewdropcity,
    setnewpickupcity,
    setLoadHeaderDetails,
  } = useContext(Contextapi);
  const navigate = useNavigate();
  const [openModal, setOpenmodal] = useState(false);

  // const [dropCity, setDropCity] = useState('');
  // const [pickupCity, setPickupCity] = useState('');

  // const [pickupState, setPickupState] = useState();
  // const [dropState, setDropState] = useState();

  const closeModal = () => {
    setOpenmodal(false);
  };
  const token = sessionStorage.getItem('token');

  const deleteLoad = async () => {
    const deletedata = {
      is_new: true,
    };

    try {
      const url = `https://mobile.singlepointgroup.com/api/load/new-delete/${Ldata._id}`;
      const responce = await axios.delete(url, {
        data: deletedata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (responce.status === 200) {
        SetFlag(!flag);
        toast.error('Load Deleted', {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
      SetFlag(!flag);
    }
  };
  const editLoad=()=>{
    setIsupdateload(true);

    setnewdropcity(null);
    setnewpickupcity(null);
    setData(Ldata);
    setnewdropcity(null);
    setnewpickupcity(null);
    setData(Ldata);
    setnewdropcity(null);
    setnewpickupcity(null);
    sessionStorage.setItem('loid', Ldata._id);
    setLoadHeaderDetails('Edit Load Details');
    navigate('/funding/addLoad');
  }

  const editdocument = () => {
    SetValidpages(true);
    sessionStorage.setItem('loid', Ldata._id);
    navigate('/document');
  };
  return (
    <>
      <div role="row" aria-label="details of loads " className={`w-full h-[49px] flex px-[18px] pr-[36px] ${className}`}>
        <div
          className="w-full  h-full  flex cursor-pointer "
          onClick={() => {
            setOpenmodal(true);
          }}
        >
          <div className="w-[155px] h-full flex items-center font-normal text-sm font-sfPro ">{Ldata.load_id}</div>
          <div className="w-[155px] h-full flex items-center font-normal text-sm font-sfPro  ">{Ldata.customer_name}</div>
          <div className="w-[155px] h-full flex items-center  font-normal text-sm font-sfPro ">{Ldata.drop_city}</div>
          <div className="w-[155px] h-full flex items-center font-normal text-sm font-sfPro  ">{Ldata.drop_date}</div>
          <div className="w-[140px] h-full flex items-center  font-normal text-sm font-sfPro  ">{Ldata.pickup_city || 'none'}</div>
          <div className="w-[140px] h-full flex items-center font-normal text-sm font-sfPro  ">{Ldata.pickup_date || 'none'}</div>
          <div className="w-[120px] h-full flex items-center  font-normal text-sm font-sfPro">{Ldata.rate}</div>
        </div>
        <div className="w-full  flex items-center justify-between">
          <button
            type="button"
            aria-label="delete load "
            className="cursor-pointer"
            onClick={deleteLoad}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete load"
          >
            <Delete />
          </button>

          <button
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit load"
            onClick={editLoad}
          >

            <Edit className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex justify-center items-center"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Document"
            onClick={() => {
              editdocument();
            }}
          >

            <CgFileDocument className="h-6 w-5  text-black text-opacity-[0.5]" />
          </button>
        </div>
      </div>
      {
        openModal && (
        <ScheduleModal
          data={Ldata}
          closeModal={closeModal}
        />
        )
      }
      <ToastContainer />
    </>
  );
}

export default SchedulTablerow;
