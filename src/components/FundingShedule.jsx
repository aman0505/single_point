import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import Fundigcard2 from './sub_components/Fundigcard2';
import Headings from './sub_components/Headings';
// import Contextapi from '../context-api/createContext';
import Loader from './sub_components/Loader';
import Contextapi from '../context-api/createContext';
// import {  } from 'react-router-dom';

function FundingShedule() {
  const { setIsnavabr, setIsupdateload, setData,setLoadHeaderDetails } = useContext(Contextapi);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const comId = sessionStorage.getItem('comId');
  const [totalShedule, setTotalShedule] = useState([]);
  const [isverified, setIsverified] = useState(false);
  const [loaderflag, setLoaderflag] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('loid')) {
      sessionStorage.removeItem('loid');
    }
    setIsupdateload(false);
    setData([]);
    setLoadHeaderDetails('Add Load Details');
    if (sessionStorage.getItem('sid')) {
      sessionStorage.removeItem('sid');
    }
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
        console.log(error);
        navigate('/login');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoaderflag(true);
      try {
        const url = `https://mobile.singlepointgroup.com/api/schedule/filter-data?query={"draft":false,"company_id":"${comId}"}`;
        const responce = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        });
        setTotalShedule(responce.data.data);
        setLoaderflag(false);
      } catch (error) {
        console.log(error);
        setLoaderflag(false);
      }
    })();
  }, [token]);

  return isverified && (
    <>
      {loaderflag && <Loader />}
      <div className="max-w-[1168px]  w-full h-screen mx-auto  mt-[45px] gap-[30px] flex flex-col font-sfPro">
        <div className="w-full flex justify-between items-center ">
          <Headings
            heading="Funding Schedules"
            title="Create new funding schedule or view
                recently submitted funding"
          />
          <div className="flex gap-5">

            <Link to="/funding/addLoad">
              <button type="button" className="w-[232px] h-[38px] text-base font-normal text-[#ffffff] border flex justify-center items-center bg-[#258CFB] rounded-lg">Create Funding Schedule</button>
            </Link>
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

        </div>
        <div className="w-full grid md:grid-cols-2  gap-[30px] xs:grid-cols-1  ">
          {totalShedule.map((data) => (

            <Fundigcard2 key={data._id} id={data._id} date={data.last_updated} months="Apr" status={data.status} amount={data.total_fund} load={data.loads.length} />

          ))}

        </div>
      </div>
    </>
  );
}

export default FundingShedule;
