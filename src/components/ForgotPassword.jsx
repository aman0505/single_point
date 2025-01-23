import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Usericon } from './svg/icons/icon';

import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [criendicial, setCriedincial] = useState('');
  const newurl = new URL('https://factoring.singlepointcapital.com/contact-us');

  const handler = (e) => {
    setCriedincial({
      ...criendicial, [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
  }, []);
  const submitDate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { email } = criendicial;

      if (email === undefined) {
        toast.warn('Please Enter Email', {
          autoClose: 1000,
        });
        return false;
      }
      if (email === '') {
        toast.warn('Please Enter Email', {
          autoClose: 1000,
        });

        return false;
      }
      const url = 'https://mobile.singlepointgroup.com/api/notification/forgot-password';
      const result = await Axios.post(url, email);
      if (result.status === 200) {
        toast.success('Request Sent', {
          autoClose: 500,
        });
      }
    } catch (error) {
      toast.warn('Something went wrong ', {
        autoClose: 1000,
      });
      console.log(error);
    }
  };
  return (

    <>
      <ToastContainer />
      {/* this is main div */}
      <div className="h-screen ">
        {/* div 1st for login  */}
        <div className="flex bg-[#ffffff] ">
          <div className=" h-screen   w-3/5 mx-40 flex flex-col justify-evenly">

            {/* div fro logo  */}
            <div className=" w-full ">
              <img src="images/singlogo.png" alt="images" className="h-24" />

            </div>

            {/* div for content  */}
            <div className="">
              <h1 className="w-full  text-[48px] font-[700]   ">Reset Password</h1>
              <p className="text-base font-normal text-[#A0A0A0] mt-1">
                Enter the email associated with your account and we’ll send you an updated password

              </p>
            </div>

            {/* div for login system  */}
            <div className="">
              <form method="post">
                <div className="w-full  ">
                  <div className="w-full transform border-b-2 pb-2 bg-transparent text-sm duration-300 focus-within:border-slate-300 ">
                    <div className="flex ">
                      <div className="mr-2">
                        <Usericon />
                      </div>
                      <input type="text" placeholder="Email Address" onChange={handler} name="email" className="w-full block  border-none bg-transparent outline-none  focus:outline-none  " required />

                    </div>

                  </div>

                  <div type="button" className="w-full h-11 bg-blue-500  flex justify-center rounded-lg mt-5 cursor-pointer " onClick={submitDate}>
                    <button type="submit" className="text-white font-[500] text-lg font-sfPro" value="submit">Send Request</button>
                  </div>

                  <div className="w-full  mt-[19px] flex flex-col items-center justify-between gap-[29px]">
                    <Link to="/login">
                      {' '}
                      <p className="font-medium text-sm text-[#258CFB] font-sfPro file:">Back to Login</p>
                    </Link>
                    <p className="font-normal text-xs font-sfPro text-black text-opacity-[0.6]">Did not  receive the email? Check your spam folder.</p>
                  </div>

                </div>
              </form>
            </div>
            {/* footer  */}
            <div className="w-full   flex justify-center items-center text-blue-400">
              <a
                href={newurl}
                target="_blank"
                rel="noopener noreferrer"

              >
                {' '}
                <span className=" mr-2 cursor-pointer block ">Contact Us  </span>
              </a>

            </div>

          </div>

          {/* div 2nd fro image  */}
          <div className=" w-4/5 h-screen rounded-l-[45px]   overflow-hidden  hidden lg:block">
            <img src="images/forgotpw.jpg" className="object-cover h-screen w-screen  " alt="images" />
          </div>
        </div>

      </div>

    </>

  );
}

export default ForgotPassword;
