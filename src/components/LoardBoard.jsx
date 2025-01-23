import React from 'react';
import Container from './atoms/Container';

function LoardBoard() {
  const newurl = new URL('https://singlepoint.free-load-board.com/');
  return (
    <Container>
      <div className=" rounded-xl h-[373px] max-w-[1170px] w-full relative overflow-hidden mt-[80px] mb-[20px]">

        <img src="images/unnamed1.png" alt="imges" className="h-full w-full object-cover absolute " />
        <div className="w-full h-full flex justify-end gap-[9px] flex-col opacity-[0.9] px-[44px] py-[40px] absolute" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 100%)' }}>
          <p className="font-medium text-2xl font-sfPro text-[#ffffff]">Load Board</p>
          <p
            style={{
              fontWeight: '200',
            }}
            className="    text-[#ffffff]  text-[18px]  ml-[4px]"
          >
            {' '}
            Single Point offers a members-only load
            board to keep you loaded and on the road

          </p>
          <a href={newurl} target="_blank" rel="noreferrer">
            {' '}
            <button
              type="button"

              className="flex items-center justify-center  w-[188px] h-[53px] rounded-xl bg-[#258CFB]  font-normal text-lg text-[#ffffff] "
            >
              Enter Load Board
              {' '}

            </button>

          </a>

        </div>
      </div>
      <div className="w-full mt-[40px]  ">

        {' '}
        <p className="font-medium text-base text-[#000000]">Load Board Benefits</p>
        <ul className="list-disc list-inside  mt-[12px]">
          <li>
            Save time and reduce empty miles

          </li>

          <li>
            Easily find and book the loads you want

          </li>
          <li>
            Filter search results to find preferred lanes
          </li>
          <li>
            Earn more per mile
          </li>

        </ul>

      </div>
    </Container>
  );
}

export default LoardBoard;
