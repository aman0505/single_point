import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import Headings from './sub_components/Headings';
import SchedulTablerow from './sub_components/schedul_tablerow';
import Loader from './sub_components/Loader';
import Contextapi from '../context-api/createContext';

function CreateShedule() {
  const {
    setIsnavabr, setIsupdateload, setData, setBankDetails,
    setComcardDetails, setComcheckData, seAccountTypetFlag,setLoadHeaderDetails
  } = useContext(Contextapi);

  const token = sessionStorage.getItem('token');
  const scheduleId = sessionStorage.getItem('sid');

  const [schedulData, setSchedulData] = useState([]);
  const [flag, SetFlag] = useState(false);
  const [loaderflag, setLoaderflag] = useState(false);
  const sid = sessionStorage.getItem('sid');
  const [Isverified, setIsverified] = useState(false);
  const [canadd, setCantadd] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setData([]);
    setBankDetails([]);
    setComcardDetails([]);
    setComcheckData([]);
    sessionStorage.removeItem('loid');
    setIsupdateload(false);
    seAccountTypetFlag(true);
  setLoadHeaderDetails('Add Load Details');


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
  }, [Isverified]);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://mobile.singlepointgroup.com/api/schedule/id/${scheduleId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCantadd(response.data.can_add_load);
        setLoaderflag(false);
      } catch (error) {
        console.log(error);
        setLoaderflag(false);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setLoaderflag(true);
      try {
        const url = `https://mobile.singlepointgroup.com/api/load/fetch/${scheduleId}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchedulData(response.data.data);
        setLoaderflag(false);
      } catch (error) {
        console.log(error);
        setLoaderflag(false);
        // SetFlag(!flag);
      }
    })();
  }, [flag]);

  useEffect(() => {
    (async () => {
      try {
        const url = 'https://mobile.singlepointgroup.com/api/payment/reset-payment';
        const body = {
          schedule_id: sid,
        };
        await axios.put(url, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log(schedulData, 'chekcing');
  return Isverified && (
    <>
      {loaderflag && <Loader />}
      {/* <div role="none" className="w-11 h-11 flex items-center justify-center rounded-r-3xl fixed top-32 cursor-pointer shadow-2xl hover:bg-gray-100  bg-white" onClick={() => { navigate('/funding/drafts'); }}>
        <FiArrowLeft className="w-full " />
      </div> */}
      <div
        className="max-w-[1168px] w-full mx-auto  mt-[45px] gap-[30px] flex flex-col font-sfPro "
      >
        <div className="w-full flex justify-between ">
          <Headings
            heading="Create Funding Schedule"
            title="Submit the load information and
                  paperwork to get funded"
          />
          <div className="flex gap-[10px]  justify-center items-center">
            <Link to="/funding/addLoad">
              { canadd ? (
                <button type="button" className="text-[#ffffff] font-normal text-base w-[153px]  h-[38px] flex justify-center items-center bg-[#000000] rounded-lg">
                  {scheduleId === null ? 'Add Load' : 'Add Next Load'}
                </button>
              ) : (
                <button type="button" className="text-[#ffffff] font-normal text-base w-[153px] cursor-not-allowed h-[38px] flex justify-center items-center bg-gray-300 rounded-lg" disabled>
                  {scheduleId === null ? 'Add Load' : 'Add Next Load'}
                </button>
              )}

            </Link>

            <Link to="/funding/payment"><button type="button" className={`w-[239px] h-[38px] text-base font-normal text-[#ffffff] border flex justify-center items-center ${canadd == true ? ' bg-[#258CFB]' : 'bg-gray-300 cursor-not-allowed'} rounded-lg`} disabled={canadd == false}>Go to Payment Instructions</button></Link>
            <button
              type="button"
              className="w-32 h-[38px] text-base font-normal text-[#ffffff] border flex justify-center items-center bg-slate-600 rounded-lg"
              onClick={() => {
                navigate('/funding/drafts');
              }}
            >
              <FiArrowLeft />
              Back
            </button>
          </div>
        </div>
        <div className="w-full font-sfPro  rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="w-full font-medium text-sm bg-[#DADADADA] rounded-xl ">
              <div className="w-full h-[49px] bg-zinc-300 flex px-[18px]  ">
                <div className="w-[155px] h-full  flex items-center ">Load_Id</div>
                <div className="w-[155px] h-full flex items-center  ">Company_name</div>
                <div className="w-[155px] h-full flex items-center  ">Drop_city</div>
                <div className="w-[155px] h-full flex items-center   ">Drop_date</div>
                <div className="w-[140px] h-full flex items-center   ">pickup_city</div>
                <div className="w-[140px] h-full flex items-center   ">pickup_date</div>
                <div className="w-[140px] h-full flex items-center   ">Rate</div>
              </div>
            </thead>
            {

              schedulData.map((data, index) => (<SchedulTablerow key={data._id} flag={flag} SetFlag={SetFlag} Ldata={data} className={index % 2 === 0 ? 'bg-white' : 'bg-[#EAEAEA]'} />))

            }
          </table>
        </div>

      </div>
    </>
  );
}

export default CreateShedule;
