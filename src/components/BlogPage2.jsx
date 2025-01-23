import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contextapi from '../context-api/createContext';

function BlogPage2(props) {
  const { setIsnavabr } = useContext(Contextapi);
  console.log(props.data);
  const navigate = useNavigate();
  const [isverified, setIsverified] = useState(false);
  const token = sessionStorage.getItem('token');
  console.log('blogpage');
  const id = sessionStorage.getItem('id');
  const [data, setData] = useState([]);
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const newMonth = new Date(data.last_updated);
  console.log(newMonth);
  const monthsName = month[newMonth.getMonth()];
  const year = newMonth.getFullYear();
  const date = newMonth.getDate();

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

        console.log(error);
        navigate('/login');
      }
    })();
  }, [isverified]);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://mobile.singlepointgroup.com/api/notification/id/${id}`;

        const responce = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsverified(true);
        setData(responce.data);
      } catch (error) {
        navigate('/');
        console.log(error);
        setIsverified(true);
      }
    }

    )();
  }, [id]);

  return isverified && (
  <div className=" mt-6 mx-auto  w-[1168px] mb-8">
    <div className="h-40">
      <h1 className=" mt-2 text-center text-[34px] font-[700] text-[#333333]">
        {data.title}
      </h1>
      <p className="text-center mt-2 text-[#333333] font-normal text-base">
        {monthsName}
        {' '}
        {date}
        ,
        {year}
      </p>
    </div>
    <div className="w-full  h-[385px] rounded-lg shadow-xl bg-slate-300 ">
      <div className="h-full w-full">

        <img src={data.image_url} alt="imgaes" className=" w-full h-full object-cover " />
      </div>
    </div>
    <div className="mt-5 grid w-3/6 mx-auto">
      <p className="text-center text-[#4F4F4F]  font-normal text-base">
        {data.description}
      </p>
    </div>
  </div>
  );
}

export default BlogPage2;
