import React from 'react';

function Loader() {
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.2)' }} className="fixed inset-0     flex flex-col  justify-center items-center  "  id="conatiner">
      <div className="flex items-center justify-center ">
        <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin" />
      </div>
    </div>

  );
}

export default Loader;
