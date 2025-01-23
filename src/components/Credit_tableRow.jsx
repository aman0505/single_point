import React, { useState } from 'react';
import ModalStructure from './Modal/modal';

function TableRow(props) {
  const alldetails = props.id;

  const [openModal, setOpenmodal] = useState(false);
  const closeModal = () => {
    setOpenmodal(false);
  };



  return (
    <>
      <tr
        className={`text-[#000000] font-[400] text-sm font-sfPro h-[49px] cursor-pointer transition  ${props.className}`}
        onClick={() => {
          setOpenmodal(true);
        }}
      >
        <td className="px-[16px] py-[18px]">{props.id.mc_number}</td>
        <td className="px-[16px] py-[18px]">{props.id.customer_name}</td>
        <td className="px-[16px] py-[18px]">{props.id.city}</td>
        <td className="px-[16px] py-[18px] ">{props.id.state}</td>

      </tr>
      {openModal
        && <ModalStructure closeModal={closeModal} alldetails={alldetails} />}
    </>
  );
}

export default TableRow;
