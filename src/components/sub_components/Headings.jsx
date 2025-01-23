import React from 'react';

function Headings(props) {
  return (

    <div className="w-full">
      <h1 className="text-[#000000] font-medium text-2xl ">{props.heading}</h1>
      <p className=" font-normal text-base " style={{ color: 'rgba(0,0,0,0.5)' }}>{props.title}</p>
    </div>

  );
}

export default Headings;
