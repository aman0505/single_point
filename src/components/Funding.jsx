import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contextapi from '../context-api/createContext';
import { SinglepPintlogo } from './svg/icons/icon';
import FundingCard from './sub_components/FundingCard';
import Fundigcard2 from './sub_components/Fundigcard2';

function Funding() {
  const { setIsnavabr } = useContext(Contextapi);
  const comId = sessionStorage.getItem('comId');
  const navigate = useNavigate();
  const [isverified, setIsverified] = useState(false);
  const token = sessionStorage.getItem('token');
  const [recentShedule, setRecentShedule] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
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
        setIsverified(false);
        console.log(error);
        navigate('/login');
      }
    })();
  }, [isverified]);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://mobile.singlepointgroup.com/api/schedule/recent/${comId}`;
        const responce = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentShedule(responce.data.data);
        setCount(responce.data.count);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    <>
      {isverified
      && (
      <div className="max-w-[1168px] w-full grid mx-auto rounded-md mt-[41px] mb-7">

        <div className="flex flex-col gap-7">
          <div className="bg-blue-600 w-full h-[208px] flex justify-between rounded-md">

            <div className="flex flex-col justify-end ml-7 mb-8 gap-3">
              <p className="text-[#FECA01] text-xl font-[700] font-sfPro">Single Point</p>
              <p className="text-[#FFFFFF] font-[700] text-3xl font-sfPro">Mobile Funding</p>
            </div>
            <div className="mt-2">
              <SinglepPintlogo />

            </div>
          </div>

          <div className="w-full sm:h-[205px]   rounded-md grid grid-cols-1 sm:grid-cols-4 gap-5">
            {/* first col */}
            <div className="bg-[#ffffff] sm:col-span-2 rounded-md font-sfPro h-[205px] sm:h-full">
              <div className=" w-[90%] grid mx-auto h-full">
                <div className="w-full flex flex-col justify-around mb-2">
                  <div className="w-full">
                    <p className="w-full text-[#212121] font-[600] text-2xl  ">Funding</p>

                  </div>
                  <div className="w-full grid grid-cols-2 ">
                    <div>
                      <p className="font-[600] text-4xl text-[#258CFB]">{count.processing}</p>
                      <p className="text-[#0000005e]">Processing</p>
                    </div>
                    <div>
                      <p className="font-[600] text-4xl text-[#258CFB]">{count.funded}</p>
                      <p className="text-[#0000005e]">Funded</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <FundingCard bgColor="greadentfundingCard1" title="Schedule" location="/funding/schedule" />
            <FundingCard bgColor="greadentfundingCard2" location="/funding/drafts" title="Drafts" />

          </div>
        </div>

        <div className="mt-[37px] ">

          <h1 className="text-[#212121] font-semibold text-2xl mb-[27px]">Recent Funding </h1>

          <div className="grid  grid-cols-2  gap-[30px]">
            {
              recentShedule.map((data) => (
                <Fundigcard2 key={data._id} id={data._id} date={data.last_updated} months="Apr" status={data.status} amount={data.total_fund} load={data.loads.length} />

              ))
            }

          </div>
        </div>

      </div>
      )}
      {' '}

    </>
  );
}

export default Funding;
