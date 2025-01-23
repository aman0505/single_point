import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeCard1(props) {
  const target = useRef('');
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const newMonth = new Date(props.date);
  const monthsName = month[newMonth.getMonth()];
  const year = newMonth.getFullYear();
  const date = newMonth.getDate();

  const navigate = useNavigate();
  const Navigate1 = (event) => {
    if (event.currentTarget.id === 'check') {
      sessionStorage.setItem('id', props.id);
      navigate('/blogpage2');
    }
  };
  const newurl = new URL(props.btnlink, 'http://localhost:3000');

  return (
    <div>
      <div className=" rounded-xl h-[319px] w-full relative overflow-hidden">

        <img src={props.img} alt="imges" className="h-full w-full object-cover absolute scale-100" />

        <div className="w-full h-full opacity-[.9]" style={{ backgroundImage: 'linear-gradient(360deg, #0032B1 0.06%, rgba(0, 50, 177, 0) 100%)' }} onClick={Navigate1} ref={target} id="check">
          <div className="grid grid-flow-col w-10/12 h-full absolute mx-[7%]">
            <div className="flex flex-col h-full my-24 gap-4">
              <span className="font-[400] text-xs text-white w-full ">
                {monthsName}
                {' '}
                {date}
                ,
                {' '}
                {year}
              </span>
              <p className="text-[#EAEAEA] font-[700] text-lg">
                {props.title}
              </p>
              <p className=" text-[#EAEAEA] font-[500] text-base  ">
                {props.description.substring(0, 100)}
                ...
              </p>
              <a
                href={newurl}
                type="button"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="button for navigation"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`${props.bgColor} mt-2 cursor-pointer rounded-md w-[143px] capitalize h-[37px] text-sm font-medium text-white  flex justify-center items-center `}
              >
                {props.btnlabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard1;
