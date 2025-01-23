import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import Loader from './sub_components/Loader';
import DraftCard from './sub_components/DraftCard';
import Headings from './sub_components/Headings';
import Contextapi from '../context-api/createContext';

function Drafts() {
  const { setIsnavabr } = useContext(Contextapi);

  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [daftData, setDraftData] = useState([]);
  const comid = sessionStorage.getItem('comId');
  const token = sessionStorage.getItem('token');
  const [loaderflag, setLoaderFlag] = useState(false);
  const [isverified, setIsverified] = useState(false);

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
        navigate('/login');
      }
    })();
  }, [isverified]);

  useEffect(() => {
    if (sessionStorage.getItem('sid')) {
      sessionStorage.removeItem('sid');
    }
    (async () => {
      setLoaderFlag(true);
      try {
        const url = `https://mobile.singlepointgroup.com/api/schedule/drafts/${comid}`;
        const responce = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDraftData(responce.data);
        setLoaderFlag(false);
      } catch (error) {
        console.log(error);
        setLoaderFlag(false);
      }
    })();
  }, [flag]);

  return isverified && (
    <>
      {loaderflag && <Loader />}
      {/* <div role="none" className="w-11 h-11 flex items-center justify-center rounded-r-3xl fixed top-32 cursor-pointer shadow-2xl hover:bg-gray-100  bg-white" onClick={() => { navigate('/funding'); }}>
        <FiArrowLeft className="w-full " />
      </div> */}
      <div className="max-w-[1168px] w-full h-screen  mx-auto mt-[45px]  ">
        <div className="w-full flex justify-between items-center">

          <Headings heading="Drafts" title="My Drafts" />
          <button
            type="button"
            className="w-32 h-[38px] text-base font-normal text-[#ffffff] border flex justify-center items-center bg-slate-600 rounded-lg"
            onClick={() => {
              navigate('/funding');
            }}
          >
            <FiArrowLeft />
            Back
          </button>
        </div>

        <div className="grid  grid-cols-1 sm:grid-cols-2  gap-[30px] mt-5">
          {daftData.map((data) => (

            // eslint-disable-next-line max-len, no-underscore-dangle
            <DraftCard key={data._id} setFlag={setFlag} flag={flag} _id={data._id} date={data.last_updated} status={data.status} amount={data.total_fund} load={data.loads.length} />
          ))}

        </div>
      </div>
    </>
  );
}

export default Drafts;
