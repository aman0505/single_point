import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import CreditTableRow from './Credit_tableRow';
import { Search } from './svg/icons/icon';
import Headings from './sub_components/Headings';
import Contextapi from '../context-api/createContext';

function Credit() {
  const { setIsnavabr } = useContext(Contextapi);
  const [isverified, setIsverified] = useState(false);
  const token = sessionStorage.getItem('token');
  const comid = sessionStorage.getItem('comId');

  const [searchdetails, setSearchDetails] = useState(false);

  // getting search input data

  const [search, setSearch] = useState('');
  const [totalpage, setTotalpage] = useState();
  const [number, setNumber] = useState(1);

  const [searchflag, setSearchFlag] = useState(false);

  const [quary, setQuary] = useState('');

  const [issearch, setIssearch] = useState(false);

  const anonymouHystoryset = async (quary) => {
    try {
      const body = {
        company_id: comid,
        data: quary,
      };
      await axios.post('https://mobile.singlepointgroup.com/api/anonymous-history/add', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await axios.get('https://mobile.singlepointgroup.com/api/auth/who-am-i', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsverified(true);
        setIsnavabr(true);
      } catch (error) {
        setIsverified(false);
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (number > totalpage) {
      setNumber(1);
    }

    (async () => {
      try {
        if (quary) {
          const url = `https://mobile.singlepointgroup.com/api/customer/filter?query=${quary}&page=${number}&size=10&sort={}`;

          const responce = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIssearch(false);
          setSearchDetails(responce.data.data);

          setTotalpage(responce.data.meta.total_pages);
          if (responce.data.data.length <= 0) {
            setSearchDetails(false);
            setIssearch(true);
            setNumber(0);
            anonymouHystoryset(quary);
            // console.log(quary,"@@@@@@@@@@@@@@@@@");
          }
        } else {
          setSearchDetails(false);
          setIssearch(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchflag]);

  const clearSearch = () => {
    setIssearch(false);

    setQuary('');
    setSearch('');
    setSearchDetails('');
  };

  return isverified && (
    <div className="grid max-w-[1168px] w-full mx-auto mt-[39px] mb-24">

      <Headings heading="Credit Portal" title="Enter the motor carrier number or entity name of your customer" />

      <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12)' }} className="w-full border rounded-2xl bg-[#FFFFFF]   h-[48px] mt-[26px] flex">
        <form
          className="w-full h-full flex pr-3"
          onClick={() => {
            setNumber(1);
          }}
          role="none"
        >
          <input
            type="text"
            name="search"
            id="search"
            // value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className=" placeholder:text-black placeholder:text-opacity-[0.4] px-6 rounded-2xl w-full bg-transparent h-full focus:outline-none py-1 "
            placeholder=" MC Number or Company Name"
          />

          <div className="flex justify-between w-16 items-center">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setQuary(search);
                setNumber(1);
                setSearchFlag(!searchflag);
              }}
            >
              <Search />
            </button>
            <AiOutlineDelete className=" h-6 w-6 text-black text-opacity-[.5] cursor-pointer" onClick={() => { clearSearch(); }} />
          </div>
        </form>

      </div>
      <div className="flex gap-2 items-center mt-5 justify-end">
        {number > 1
          ? <button type="button" className="w-20 h-7 bg-white rounded cursor-pointer flex justify-center items-center" onClick={() => { setNumber(number - 1); setSearchFlag(!searchflag); }}>Previous</button>
          : <button type="button" className="cursor-pointer rounded opacity-20 bg-gray-400 w-20 h-7 flex justify-center items-center" disabled>Previous</button>}

        <div className="flex gap-2">
          <div>
            {quary ? number : '0'}

          </div>
          <div>
            of

          </div>
          <div>
            {quary ? totalpage : '0'}

          </div>

        </div>

        {number < totalpage ? (
          <button
            type="button"
            className="cursor-pointer bg-white rounded w-20 h-7 flex justify-center items-center"
            onClick={() => {
              setNumber(number + 1);
              setSearchFlag(!searchflag);
            }}
          >
            Next
          </button>
        ) : <button type="button" className="cursor-pointer w-20 opacity-20 bg-gray-400 rounded h-7 flex justify-center items-center" disabled>Next</button>}

      </div>
      {issearch && (
      <div className="mx-auto my-4  text-center ">
        {' '}
        No result found
        <br />
        Please Contact Credit Department
        <br />

        888-890-3928
        <br />

        credit@singlepointgroup.com
      </div>
      )}
      {searchdetails && (
        <div className="mt-12 w-full credit-table    h-[550px]    ">

          <div className="rounded-lg  overflow-hidden">
            <table className="table-auto w-full  font-sfPro  relative   ">
              <thead className=" text-left  text-[#000000] font-[500] text-sm w-[49px]">
                <tr className="bg-zinc-300 ">
                  <th className=" px-[16px] py-[18px] ">MC Number</th>
                  <th className="px-[16px] py-[18px]">Company Name </th>
                  <th className="px-[16px] py-[18px]">City</th>
                  <th className="px-[16px] py-[18px]">State</th>
                </tr>
              </thead>
              <tbody className="">
                {

                      searchdetails.map((id, index) => (<CreditTableRow id={id} key={id.mc_number} className={index % 2 === 0 ? 'bg-white' : 'bg-[#EAEAEA]'} />))
                    }
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}

export default Credit;
