import React from 'react';
import { Cross } from '../svg/icons/icon';

function Loadmodal({
  closeModal, data,
}) {
  const {
    last_updated, advance,  drop_date, pickup_date, rate,
  } = data;
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(last_updated);
  const currentMonths = month[date.getMonth()];
  const handletoClose = (e) => {
    if (e.target.id === 'modalBody') closeModal();
  };
  console.log(data);
  return (
    <div role="none" style={{ background: 'rgba(0, 0, 0, 0.5)' }} id="modalBody" className="inset-0 fixed flex flex-col justify-center items-center font-sfPro " onClick={handletoClose}>

      <button
        type="button"
        className="relative left-64 top-[-5px]   text-black     "
        onClick={() => {
          closeModal();
        }}
      >
        <Cross />
      </button>
      <div className="w-[485px] h-[325px]  rounded-xl overflow-hidden box-border">
        <div className="w-full h-[51px] flex justify-between  items-center px-[44px] bg-[#E8E8E8]">
          <p className="font-medium text-base text-[#000000]">Date</p>
          <p className="font-normal text-base text-[#000000]">
            {date.getDay()}
            {' '}
            {currentMonths}
            ,
            {' '}
            {date.getFullYear()}
          </p>

        </div>
        <div className="w-full h-[364px] bg-[#ffffff] px-[44px]  flex flex-col gap-[28px] ">
          <div className="font-bold text-lg text-[#000000] ">Loads</div>
          <div>
            {/* <p>Customer Name:Nkosinathi Meijer</p> */}
            <p>
              <span className="font-medium text-base text-[#000000]">Customer Name</span>
              :
              <span className="font-normal text-base text-[#000000]">
                {' '}
                {data.customer_name }
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Load Number</span>
              :
              <span className="font-normal text-base text-[#000000]">
                {' '}
                {data.load_id}
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Pickup City</span>
              :
              <span className="font-normal text-base text-[#000000]">
                {' '}
                {data.pickup_city || 'none'}
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Destination City</span>
              :
              <span className="font-normal text-base text-[#000000]">
                {' '}
                {data.drop_city }
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Pickup  & Drop Date</span>
              :
              <span className="font-normal text-base text-[#000000]">
                {pickup_date }
                {' '}
                &
                {' '}

                {drop_date }
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Rate  </span>
              :
              <span className="font-normal text-base text-[#000000] text-opacity-[0.5]">
                $

                {rate}
              </span>

            </p>
            <p>
              <span className="font-medium text-base text-[#000000]">Advances/Deduction </span>
              :
              <span className="font-normal text-base text-[#000000]">
                $

                {advance}
              </span>

            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Loadmodal;
