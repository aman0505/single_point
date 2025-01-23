import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginControl from './LoginControl';

function Login() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    if (token) {
      navigate('/');
      console.log('under condition');
    }
  }, [location]);
  const newurl = new URL('https://factoring.singlepointcapital.com/contact-us');
  return (

    <>
      {/* this is main div */}
      <div className="h-screen ">
        {/* div 1st for login  */}
        <div className="flex bg-[#ffffff] ">
          <div className=" h-screen   w-3/5 mx-40 flex flex-col justify-evenly">

            {/* div fro logo  */}
            <div className=" w-full">
              <img src="images/singlogo.png" alt="images" className="h-24" />

            </div>

            {/* div for content  */}
            <div className="">
              <h1 className="w-[221px]  text-[48px] font-[700]   ">Welcome</h1>
              <p className="text-base font-normal text-[#A0A0A0] mt-1">Please Sign in to Continue</p>
            </div>

            {/* div for login system  */}
            <LoginControl />
            {/* footer  */}
            <div className="w-full   flex justify-center text-blue-400">
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
            <img src="images/wp1.png" className="object-cover h-screen w-screen  " alt="images" />
          </div>
        </div>

      </div>

    </>

  );
}

export default Login;
