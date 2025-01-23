import React, { useState, useEffect, useContext } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Usericon, Passicon } from './svg/icons/icon';
import 'react-toastify/dist/ReactToastify.css';
import Contextapi from '../context-api/createContext';
// main function
function LoginControl() {
  const { setLogourl } = useContext(Contextapi);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [criendicial, setCriedincial] = useState({
    username: '',
    password: '',
  });
  const handler = (e) => {
    setCriedincial({
      ...criendicial, [e.target.name]: [e.target.value],
    });
  };
  useEffect(() => {
  }, []);
  const submitDate = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = criendicial;

      // if (password === '' || username === '') {
      //   toast.warn('Please enter Credentials', {
      //     autoClose: 1000,
      //   });

      //   return false;
      // }

      // const body = {
      //   user_name: username[0],
      //   password: password[0],
      // };
      console.log(body);
      const url = 'https://mobile.singlepointgroup.com/api/auth/user/login';
      const result = await Axios.post(url, body);
      if (result.status === 200) {
        sessionStorage.setItem('logo', result.data.data.logo_url);
        setLogourl(result.data.data.logo_url);
        sessionStorage.setItem('comId', result.data.company_id);
        sessionStorage.setItem('token', result.data.token);
        toast.success('Login successful', {
          autoClose: 500,
        });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.log('catch block ', error);
      if (error.response.statusText === 'Unauthorized') {
        toast.error('Please Enter Valid credentials', {
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <>
      <div className="">
        <form method="post">
          <div className="w-full  ">
            <div className="w-full transform border-b-2 pb-2 bg-transparent text-sm duration-300 focus-within:border-slate-300 ">
              <div className="flex ">
                <div className="mr-2">
                  <Usericon />
                </div>
                <input type="text" placeholder="Username" onChange={handler} name="username" className="w-full block  border-none bg-transparent outline-none  focus:outline-none  " required />

              </div>

            </div>
            <div className="text-red-600 text-sm"><p /></div>
            <div className="w-full transform border-b-2 pb-1 mt-6 bg-transparent text-sm duration-300 focus-within:border-slate-300 ">
              <div className="flex items-center pb-1">
                <div className="mr-2 mt-1 ">
                  <Passicon />
                </div>
                <input type={flag ? 'text' : 'password'} onChange={handler} placeholder="Password" name="password" className="border-none block bg-transparent outline-none  focus:outline-none w-full" required />
                <div
                  className="text-slate-400 m-0 p-0 text-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setFlag(!flag);
                  }}
                >
                  {flag ? <BsEye /> : <BsEyeSlash />}
                </div>
              </div>
            </div>
            <div className="text-red-600 text-sm"><p /></div>
            <div className="flex justify-between ">
              <div className="mt-4 flex gap-2 items-center " />
              <div className="mt-4">
                <Link to="/forgotpassword" className="text-[#8F8F8F]">Forgot Password ?</Link>
              </div>

            </div>
            <div type="button" className="w-full h-11 bg-blue-500  flex justify-center rounded-lg mt-5 cursor-pointer " onClick={submitDate}>
              <button type="submit" className="text-white font-[500] text-lg" value="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginControl;
