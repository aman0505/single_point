import React from 'react';

function HomeCard2(props) {
  return (
    <div className=" rounded-xl relative overflow-hidden greadent ">

      <img src={props.img} alt="image" className="w-full h-full object-cover mix-blend-overlay  absolute " />

      <div className="grid grid-flow-col w-10/12 h-full  absolute mx-[7%]">
        <div className=" flex  flex-col h-[70%] w-full  absolute md:mt-[35%] mt-[19%] justify-evenly ">
          <div>

            <button className={`px-5 py-2 ${props.bgColor} text-sm font-medium text-white rounded flex justify-center items-center `}>{props.btnlabel}</button>
          </div>
          <p className="mt-5 text-[#EAEAEA] font-[700] text-lg  ">
            {props.title}
          </p>

          <p className="mt-3 font-[400] text-xs text-white">{props.date}</p>
        </div>
      </div>

    </div>
  );
}

export default HomeCard2;
