import React, { useState } from 'react';
import Schedulemodal from '../Modal/Schedulemodal';

function Fundigcard2({
  status, load, amount, date, id,
}) {
  const updatedDate = new Date(date);
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsName = month[updatedDate.getMonth()];
  const [openModal, setOpenmodal] = useState(false);
  const closeModal = () => {
    sessionStorage.removeItem('sid', id);
    setOpenmodal(false);
  };
  return (
    <>
      <div
        className="bg-[#ffffff] sm:max-w-[570px] w-full  h-[89.1px] rounded-xl flex items-center justify-center font-sfPro shadow-[#000000] cursor-pointer"
        onClick={() => {
          sessionStorage.setItem('sid', id);
          setOpenmodal(true);
        }}
        role="none"
      >

        <div className="max-w-[513px] w-full   h-[70%]  flex items-center justify-between">
          <div className="max-w-[85px] w-full h-[49px] bg-[#EAEAEA] rounded-lg flex items-center justify-center gap-2">
            <p className="text-[#000000] font-[700] text-xl ">
              {updatedDate.getDate()}
              {' '}
            </p>
            <p className="text-[#000000] font-[300] text-base ">{monthsName}</p>
          </div>
          <div>
            <p className="text-[#000000] font-medium text-sm">Status:</p>
            <p className="font-light text-sm text-[#0000005e] capitalize">{status}</p>
          </div>
          <div>
            <p className="text-[#000000] font-medium text-sm">Loads:</p>
            <p className="font-light text-sm text-[#0000005e]">{load}</p>
          </div>
          <div>
            <p className="text-[#000000] font-medium text-sm">Funding Amount:</p>
            <p className="font-light text-sm text-[#0000005e]">
              $
              {amount}
            </p>
          </div>
        </div>
      </div>
      {openModal && <Schedulemodal status={status} closeModal={closeModal} date={date} />}
    </>
  );
}

export default Fundigcard2;
