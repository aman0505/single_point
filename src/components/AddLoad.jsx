/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Headings from './sub_components/Headings';
import {
  CustomerIcon, Loadicon, RateIcon, CalculatorIcon, LocationIcon, BuildingIcon, CalenderIcon,
}
  from './svg/icons/icon';
import 'react-toastify/dist/ReactToastify.css';
import contextapi from '../context-api/createContext';
import Loader from './sub_components/Loader';

function AddLoad() {
  const {
    SetValidpages, setIsnavabr, data, setData, isupdateload, setIsupdateload, loadHeaderDetails,
  } = useContext(contextapi);
  const navigate = useNavigate();
  const [loaderflag, setLoaderflag] = useState(false);
  const [dateinputtype, setDateinputtype] = useState('text');
  const [dateinputtype2, setDateinputtype2] = useState('text');
  const [Isverified, setIsverified] = useState(false);
  // inputs data
  let loadData = {};
  const token = sessionStorage.getItem('token');

  const comId = sessionStorage.getItem('comId');
  // country name
  const [state, setState] = useState([]);
  // city name
  const [pickupcity, setPickupcity] = useState([]);
  const [dropstate, setDropstate] = useState([]);

  const getcitysnames = async (cityid) => {
    try {
      const url = `https://mobile.singlepointgroup.com/api/address/city/id/${cityid}`;
      const responce = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return (responce.data[0].name);
      // console.log();
    } catch (error) {
      console.log(error);
    }
  };
  const getstatesnames = async (stateid) => {
    try {
      const url = `https://mobile.singlepointgroup.com/api/address/state/id/${stateid}`;
      const responce = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return (responce.data[0].name);
      // console.log();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const valid = await axios.get('https://mobile.singlepointgroup.com/api/auth/who-am-i', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (valid.status === 200) {
          setIsverified(true);
          setIsnavabr(true);
          return true;
        }
        navigate('/login');
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    })();
  }, [Isverified]);

  useEffect(() => {
    (async () => {
      try {
        const url = 'https://mobile.singlepointgroup.com/api/address/state/all';
        const stateData = await axios(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setState(stateData.data);
        // console.log(stateData.data)
      } catch (error) {
        console.log(error);
      }
    }
    )();
  }, []);
  const checkhandler = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setData({ ...data, [event.target.name]: true });
    } else if (value === 'tonu') {
      delete data.tonu;
      setData({ ...data, [event.target.name]: false });
    } else {
      delete data.fuel_adv;
      setData({ ...data, [event.target.name]: false });
    }
  };
  const handler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setData({
      ...data, [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!(Object.prototype.hasOwnProperty.call(data, 'rate') && Object.prototype.hasOwnProperty.call(data, 'customer_name') && Object.prototype.hasOwnProperty.call(data, 'load_id'))) {
      toast.warn('please Fill the required data', {
        autoClose: 2000,
      });
    } else if (data.rate === '' || data.customer_name === '' || data.load_id === '') {
      toast.warn('please Fill the required data', {
        autoClose: 2000,
      });
    } else {
      setLoaderflag(true);
      loadData = data;
      SetValidpages(true);
      if (!Object.prototype.hasOwnProperty.call(loadData, 'tonu')) {
        loadData.tonu = false;
      }
      if (!Object.prototype.hasOwnProperty.call(loadData, 'fuel_adv')) {
        loadData.fuel_adv = false;
      }
      // loadData.is_new = true;
      loadData.company_id = comId;
      loadData.rate = Number(loadData.rate);
      loadData.advance = Number(loadData.advance);
      if (sessionStorage.getItem('sid')) {
        loadData.schedule_id = sessionStorage.getItem('sid');
      }
      console.log(loadData, '@@@@@@@');
      const pickupcityname = await getcitysnames(loadData.pickup_city_id);
      console.log(pickupcityname);
      const dropcityname = await getcitysnames(loadData.drop_city_id);
      console.log(dropcityname);
      const pickupstatename = await getstatesnames(loadData.pickup_state_id);
      const dropstatename = await getstatesnames(loadData.drop_state_id);
      console.log(dropstatename, pickupstatename);
      loadData.pickup_city = pickupcityname;
      loadData.pickup_state = pickupstatename;
      loadData.drop_city = dropcityname;
      loadData.drop_state = dropstatename;
      console.log(loadData);
      try {
        const responce = await axios.post('https://mobile.singlepointgroup.com/api/load/new-add', loadData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responce.status === 200) {
          toast.success('Load Added', {
            autoClose: 2000,
          });
          if (responce.data.schedule_id) {
            sessionStorage.setItem('sid', responce.data.schedule_id);
            setLoaderflag(false);
            navigate('/document');
          }
        }
      } catch (error) {
        setLoaderflag(false);
        toast.warn(error.response.data.error, {
          autoClose: 2000,
        });
        console.log(error.response.data.error);
      }
    }
  };

  const dropState = async () => {
    try {
      const url = `https://mobile.singlepointgroup.com/api/address/city/state-id/${data.drop_state_id}`;
      const cityname = await axios(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDropstate(cityname.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!(Object.prototype.hasOwnProperty.call(data, 'rate') && Object.prototype.hasOwnProperty.call(data, 'customer_name'))) {
      toast.warn('Please Fill the required data', {
        autoClose: 2000,
      });
    } else if (data.rate === '' || data.customer_name === '') {
      toast.warn('Please Fill the required data', {
        autoClose: 2000,
      });
    } else {
      // setLoadData(data);
      setLoaderflag(true);
      data.rate = Number(data.rate);
      data.advance = Number(data.advance);
      loadData = data;
      SetValidpages(true);
      if (!Object.prototype.hasOwnProperty.call(loadData, 'tonu')) {
        loadData.tonu = false;
      }
      if (!Object.prototype.hasOwnProperty.call(loadData, 'fuel_adv')) {
        loadData.fuel_adv = false;
      }
      delete loadData.load_id;
      console.log(loadData, '@@@@@@@');

      const pickupcityname = await getcitysnames(loadData.pickup_city_id);
      console.log(pickupcityname);
      const dropcityname = await getcitysnames(loadData.drop_city_id);
      console.log(dropcityname);
      const pickupstatename = await getstatesnames(loadData.pickup_state_id);
      const dropstatename = await getstatesnames(loadData.drop_state_id);
      console.log(dropstatename, pickupstatename);
      loadData.pickup_city = pickupcityname;
      loadData.pickup_state = pickupstatename;
      loadData.drop_city = dropcityname;
      loadData.drop_state = dropstatename;
      console.log(loadData);
      const newloaddata = {
        id: sessionStorage.getItem('loid'),
        data: loadData,
      };
      try {
        const responce = await axios('https://mobile.singlepointgroup.com/api/load/edit-load-info', {
          method: 'PUT',
          data: newloaddata,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responce.status === 200) {
          setIsupdateload(false);
          toast.success('Load Edited Successfully', {
            autoClose: 2000,
          });
          setLoaderflag(false);
          navigate('/funding/create_shedule');
          // }
        }
      } catch (error) {
        setLoaderflag(false);
        console.log(error);
        toast.warn(error.response.data.error, {
          autoClose: 2000,
        });
      }
    }
  };

  const pickupcitylist = async () => {
    try {
      const url = `https://mobile.singlepointgroup.com/api/address/city/state-id/${data.pickup_state_id}`;
      const cityname = await axios(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPickupcity(cityname.data);
      // console.log(cityname.data)
    } catch (error) {
      console.log(error);
    }
  };

  return Isverified && (
    <>
      {loaderflag && <Loader />}
      <div className="max-w-[1168px] w-full  mx-auto mt-[45px] ">
        <Headings
          heading={loadHeaderDetails}
          title="Enter the load information below"
        />
        <form>
          <div className="w-full h-[722px] px-[44px] py-[44px] mt-[30px] mb-28 bg-[#ffffff] rounded-xl overflow-hidden font-sfPro font-normal text-base">
            <div className="w-[1084px] h-full flex flex-col gap-[36px]  justify-around">

              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }} className=" w-full flex gap-[19px] pb-[8px] justify-center items-center">
                <div>
                  <CustomerIcon />
                </div>
                <input onChange={handler} value={data.customer_name} type="text" placeholder="Customer Name*" name="customer_name" className="placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none focus:outline-none " required />
              </div>
              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }} className="placeholder:text-black placeholder:text-opacity-[0.4] w-full flex gap-[19px] pb-[8px] justify-center items-center">
                <div>
                  <Loadicon />
                </div>
                {isupdateload ? <input onChange={handler} value={data.load_id} type="text" placeholder="Load Number*" name="load_id" className=" placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none focus:outline-none bg-zinc-200 " required disabled /> : <input onChange={handler} type="number" placeholder="Load Number *" name="load_id" className=" placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none focus:outline-none  " required />}
                {/* <input onChange={handler} value={data.load_id} type="number" placeholder="Load Number" name="load_id" className=" placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none focus:outline-none  " required /> */}
              </div>
              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }} className=" w-full flex gap-[19px] pb-[8px] justify-center items-center">
                <div>
                  <RateIcon />
                </div>
                <input onChange={handler} value={data.rate} type="number" placeholder="Rate*" name="rate" className=" placeholder:text-black placeholder:text-opacity-[0.4] w-full block  border-none bg-transparent outline-none focus:outline-none" required />
              </div>
              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }} className="  w-full flex gap-[19px] pb-[8px] justify-center items-center">
                <div>
                  <CalculatorIcon />
                </div>
                <input onChange={handler} value={data.advance} type="number" placeholder="Advance/Deduction" name="advance" className="placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none focus:outline-none  " required />
              </div>
              <div className="w-full  flex gap-[30px]">

                <div className="max-w-[526px] w-full  flex justify-center items-center gap-[19px] pb-[8px]" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }}>
                  <LocationIcon />
                  {/* <input type="text" placeholder="Select State" name='pickup_city' className="placeholder:text-black placeholder:text-opacity-[0.4] w-full block  border-none bg-transparent outline-none focus:outline-none " required></input> */}
                  <select onChange={handler} placeholder="Select State" name="pickup_state_id" id="state" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro  font-normal text-base  transition-all duration-400 ease-in-out   w-full block  border-none bg-transparent outline-none focus:outline-none " required>

                    {data.pickup_state ? <option value={data.pickup_state_id} className="  " disabled selected>{data.pickup_state}</option> : <option value="" className="  " disabled selected>Select State</option>}

                    {state.map((stateData) => (<option key={stateData.id} value={stateData.id}>{stateData.name}</option>))}

                  </select>
                </div>

                <div
                  className="max-w-[526px]  w-full flex justify-center items-center gap-[19px] pb-[8px]"
                  style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }}
                  onClick={() => {
                    pickupcitylist();
                  }}
                  role="none"
                >
                  <BuildingIcon />
                  {/* <input type="text" placeholder="pickup City" name='pick_city' className="placeholder:text-black placeholder:text-opacity-[0.4] w-full block border-none bg-transparent outline-none  focus:outline-none  " required></input> */}
                  <select onChange={handler} placeholder="Select State" name="pickup_city_id" id="state" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro  font-normal text-base  transition-all duration-400 ease-in-out   w-full block  border-none bg-transparent outline-none focus:outline-none " required>
                    {data.pickup_city ? <option value={data.pickup_city_id} className="  " disabled selected>{data.pickup_city}</option> : <option value="" className="  " disabled selected>Pickup_city</option>}

                    {/* <option value="" className="  " disabled selected>Pickup City</option> */}

                    {pickupcity.map((data1) => (<option key={data1.id} value={data1.id}>{data1.name}</option>))}

                  </select>
                </div>

              </div>
              {/* select location fields */}

              <div className="w-full  flex gap-[30px]">
                <div className="max-w-[526px] w-full flex justify-center items-center gap-[19px] pb-[8px]" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }}>
                  <LocationIcon />
                  {/* <input type="text" placeholder="Select State" name='dropSate' className="placeholder:text-black placeholder:text-opacity-[0.4] w-full block  border-none bg-transparent outline-none focus:outline-none" required></input> */}
                  <select onChange={handler} placeholder="Select State" name="drop_state_id" id="state" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro  font-normal text-base  transition-all duration-400 ease-in-out   w-full block  border-none bg-transparent outline-none focus:outline-none " required>
                    {/* <option value="" className="  " disabled selected>Select State </option> */}
                    {data.drop_state ? <option value={data.drop_state_id} className="  " disabled selected>{data.drop_state}</option> : <option value="" className="  " disabled selected>Select State </option>}

                    {state.map((data) => (<option key={data.id} value={data.id}>{data.name}</option>))}

                  </select>
                </div>

                <div role="none" className="max-w-[526px] w-full flex justify-center items-center gap-[19px] pb-[8px]" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }} onClick={() => { dropState(); }}>
                  <BuildingIcon />
                  <select onChange={handler} placeholder="Select State" name="drop_city_id" id="state" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro  font-normal text-base  transition-all duration-400 ease-in-out   w-full block  border-none bg-transparent outline-none focus:outline-none " required>
                    {/* <option value="" className="  " disabled selected>Drop City </option> */}
                    {data.drop_city ? <option value={data.drop_city_id} className="  " disabled selected>{data.drop_city}</option> : <option value="" className="  " disabled selected>Drop_city</option>}

                    {dropstate.map((data1) => (<option key={data1.id} value={data1.id}>{data1.name}</option>))}

                  </select>
                </div>
              </div>

              <div className="w-full  flex gap-[30px]">
                <div className="max-w-[526px] w-full datepicker form-floating flex justify-center items-center gap-[19px] pb-[8px]" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }}>
                  <CalenderIcon />
                  {data.pickup_date ? <input onChange={handler} value={data.pickup_date} type={dateinputtype2} onFocus={() => { setDateinputtype2('date'); }} placeholder="Pickup Date" name="pickup_date" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none  focus:outline-none" required /> : <input onChange={handler} type={dateinputtype2} onFocus={() => { setDateinputtype2('date'); }} placeholder="Pickup Date" name="pickup_date" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none  focus:outline-none" required />}
                  {/* <input onChange={handler} type={dateinputtype2} onFocus={() => { setDateinputtype2('date'); }} placeholder="Pickup Date" name="pickup_date" className="  invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none  focus:outline-none" required /> */}
                </div>

                <div className="w-[526px]  flex justify-center items-center gap-[19px] pb-[8px]" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.4)' }}>
                  <CalenderIcon />
                  {data.drop_date ? <input onChange={handler} type={dateinputtype} value={data.drop_date} onFocus={() => { setDateinputtype('date'); }} placeholder="Drop Date" name="drop_date" className="invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none focus:outline-none  " required /> : <input onChange={handler} type={dateinputtype} onFocus={() => { setDateinputtype('date'); }} placeholder="Drop Date" name="drop_date" className="invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none focus:outline-none  " required /> }
                  {/* <input onChange={handler} type={dateinputtype} onFocus={() => { setDateinputtype('date'); }} placeholder="Drop Date" name="drop_date" className="invalid:text-black invalid:text-opacity-[0.4] font-sfPro w-full block font-normal text-base border-none bg-transparent outline-none focus:outline-none  " required /> */}
                </div>
              </div>

              <div className="max-w-[2263px] w-full h-[19px] flex items-center gap-[48px]">
                <div className=" gap-[12px] flex items-center justify-center">
                  {data.fuel_adv ? <input type="checkbox" onChange={checkhandler} name="fuel_adv" value="fuel_adv" checked /> : <input type="checkbox" onChange={checkhandler} name="fuel_adv" value="fuel_adv" />}
                  {/* <input type="checkbox" onChange={checkhandler} name="fuel_adv" value="fuel_adv" /> */}
                  <p className="font-normal text-base">Fuel Advance</p>
                </div>
                <div className="flex gap-[12px] items-center justify-center">
                  {data.tonu ? <input type="checkbox" onChange={checkhandler} name="tonu" value="tonu" checked /> : <input type="checkbox" onChange={checkhandler} name="tonu" value="tonu" />}
                  {/* <input type="checkbox" onChange={checkhandler} name="tonu" value="tonu" /> */}
                  <p className="font-normal text-base">TONU</p>
                </div>
              </div>
              <div className=" w-full h-[52px] flex gap-3">
                <button className="w-[90px] h-[38px] bg-slate-600 flex justify-center items-center rounded-lg text-[#ffffff]" type="submit" onClick={() => { navigate(-1); }}>Cancel</button>

                {isupdateload ? <button className="w-[90px] h-[38px] bg-[#258CFB] flex justify-center items-center rounded-lg text-[#ffffff]" type="submit" onClick={updateData}>Update</button> : <button className="w-[90px] h-[38px] bg-[#258CFB] flex justify-center items-center rounded-lg text-[#ffffff]" type="submit" onClick={submitData}>Submit</button>}
                {/* <button className="w-[102px] h-[52px] bg-[#258CFB] flex justify-center items-center rounded-xl text-[#ffffff]" type="submit" onClick={submitData}>Submit</button> */}

              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddLoad;
