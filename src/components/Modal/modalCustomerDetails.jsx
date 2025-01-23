import React, { useState,useEffect } from 'react';
import axios from 'axios';

function ModalCustomerDetails({ data }) {
  const [dropcity, setDropCity] = useState('');
  const [pickupcity,setPickupcity]=useState('');
//   console.log(dropcity, 'drop city id ');
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    (async () => {
      try {
        const url1 = `https://mobile.singlepointgroup.com/api/address/city/id/${data.pickup_city}`;
        const response = await axios.get(url1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          if (response.data[0]) {
            setPickupcity(response.data[0].name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data.pickup_city]);


  useEffect(() => {
    (async () => {
      try {
        const url1 = `https://mobile.singlepointgroup.com/api/address/city/id/${data.drop_city}`;
        const response = await axios.get(url1, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          if (response.data[0]) {
            setDropCity(response.data[0].name);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data.drop_city]);



  return (
    <>
      <div className="mt-3">
        {/* <p>Customer Name:Nkosinathi Meijer</p> */}
        <p>
          <span className="font-medium text-base text-[#000000]">Customer Name</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            {data.customer_name}
          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Load Number</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            {data.load_id}
            {' '}
          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Pickup City</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            {data.pickup_city}
          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Destination City</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            {data.drop_city}
          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Pickup  & Drop Date</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            {data.pickup_date}
            {' '}
            &
            {' '}
            {data.drop_date}
            {' '}
          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Rate</span>
          :
          <span className="font-normal text-base text-[#000000] text-opacity-[0.5]">
            {' '}
            $
            {data.rate}

          </span>

        </p>
        <p>
          <span className="font-medium text-base text-[#000000]">Advances/Deduction</span>
          :
          <span className="font-normal text-base text-[#000000]">
            {' '}
            $
            {data.advance}

          </span>

        </p>
      </div>
      <hr className="border mt-1" />
    </>
  );
}

export default ModalCustomerDetails;
