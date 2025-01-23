import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FundShedulogo } from '../svg/icons/icon';

function FundingCard(props) {
  const navigate = useNavigate();
  return (

    <div
      className={`${props.bgColor}   rounded-md font-sfPro cursor-pointer h-[205px] `}
      onClick={() => {
        navigate(props.location);
      }}
    >

      <div className="flex flex-col justify-end mx-7 w-[82%]  h-full ">
        <div className="mb-[32px]">
          <div className="w-[50px] h-[50px]  bg-[#FFFFFF] bg-opacity-[0.15] flex items-center justify-center rounded-xl overflow-hidden ">
            <FundShedulogo />
          </div>

          <div className="font-[600] text-[22px]  text-[#FFFFFF]">
            {props.title}
          </div>
        </div>
      </div>
    </div>

  );
}

export default FundingCard;
