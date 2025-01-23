import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cross } from '../svg/icons/icon';
import ModalCustomerDetails from './modalCustomerDetails';

function Schedulemodal({ closeModal, date, status }) {
  const handletoClose = (e) => {
    if (e.target.id === 'modalBody') closeModal();
  };

  const sid = sessionStorage.getItem('sid');
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const token = sessionStorage.getItem('token');
  const [details, setDetails] = useState([]);
  const newDate = new Date(date);
  const newmonths = month[newDate.getMonth()];
  const [pdfurl, setPdfurl] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const url = `https://mobile.singlepointgroup.com/api/load/fetch/${sid}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setDetails(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const url = `https://mobile.singlepointgroup.com/api/schedule/id/${sid}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPdfurl(new URL(response.data.pdf_url));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div role="none" style={{ background: 'rgba(0, 0, 0, 0.5)' }} id="modalBody" className="inset-0 fixed flex flex-col justify-center items-center font-sfPro " onClick={handletoClose}>

      <button
        type="button"
        className="relative left-64 top-[5px]   text-black"
        onClick={() => {
          closeModal();
        }}
      >
        <Cross />
      </button>
      <div className="w-[485px] h-[450px] bg-slate-600  overflow-hidden rounded-xl  box-border">
        <a
          href={pdfurl || ''}
          type="button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="button for navigation"
          className="w-full cursor-pointer"
        >
          {' '}
          <div className="w-full h-[51px]  flex  items-center  gap-[130px]  px-[44px] bg-[#FFFFFF]">
            <div className="flex gap-[18.25px] items-center">

              <div className="h-full ">
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.3828 9.27734C27.6172 9.51172 27.75 9.82812 27.75 10.1602V34.25C27.75 34.9414 27.1914 35.5 26.5 35.5H1.5C0.808594 35.5 0.25 34.9414 0.25 34.25V1.75C0.25 1.05859 0.808594 0.5 1.5 0.5H18.0898C18.4219 0.5 18.7422 0.632813 18.9766 0.867188L27.3828 9.27734ZM24.8672 10.7344L17.5156 3.38281V10.7344H24.8672ZM18.7352 22.893C18.1422 22.8734 17.5117 22.9191 16.7957 23.0086C15.8465 22.423 15.2074 21.6188 14.7535 20.4371L14.7953 20.266L14.8437 20.0637C15.0117 19.3555 15.102 18.8387 15.1289 18.3176C15.1492 17.9242 15.1273 17.5613 15.0574 17.225C14.9285 16.4988 14.4148 16.0742 13.7676 16.048C13.1641 16.0234 12.6094 16.3605 12.4676 16.8828C12.2367 17.7273 12.3719 18.8387 12.8613 20.734C12.2379 22.2203 11.4141 23.9629 10.8613 24.9348C10.1234 25.3152 9.54883 25.6613 9.06602 26.0449C8.4293 26.5516 8.03164 27.0723 7.92227 27.6191C7.86914 27.8727 7.94922 28.2039 8.13164 28.4754C8.33867 28.7832 8.65039 28.9832 9.02422 29.0121C9.96758 29.0852 11.127 28.1125 12.407 25.916C12.5355 25.873 12.6715 25.8277 12.8375 25.7715L13.3023 25.6145C13.5965 25.5152 13.8098 25.4441 14.0207 25.3758C14.9348 25.0781 15.6262 24.8902 16.2551 24.7832C17.348 25.3684 18.6113 25.752 19.4621 25.752C20.1645 25.752 20.6391 25.3879 20.8105 24.8148C20.9609 24.3117 20.8418 23.7281 20.5184 23.4055C20.184 23.077 19.5691 22.9199 18.7352 22.893ZM9.04805 27.9094V27.8953L9.05312 27.882C9.11028 27.7343 9.18365 27.5933 9.27187 27.4617C9.43906 27.2047 9.66914 26.9344 9.9543 26.6465C10.1074 26.4922 10.2668 26.3418 10.4539 26.173C10.4957 26.1355 10.7629 25.8977 10.8129 25.8508L11.2492 25.4445L10.932 25.9496C10.4508 26.7168 10.0156 27.2691 9.64297 27.6293C9.50586 27.7621 9.38516 27.8598 9.2875 27.9227C9.25526 27.9442 9.22114 27.9628 9.18555 27.9781C9.16953 27.9848 9.15547 27.9887 9.14141 27.9898C9.12656 27.9917 9.11148 27.9897 9.09766 27.984C9.08295 27.9778 9.0704 27.9675 9.06157 27.9542C9.05275 27.9409 9.04804 27.9253 9.04805 27.9094ZM13.9676 19.3828L13.8793 19.5391L13.8246 19.368C13.7035 18.984 13.6145 18.4055 13.5898 17.8836C13.5617 17.2898 13.609 16.9336 13.7965 16.9336C14.0598 16.9336 14.1805 17.3555 14.1898 17.9902C14.1984 18.548 14.1105 19.1285 13.9672 19.3828H13.9676ZM13.7406 21.6664L13.8004 21.5082L13.882 21.6566C14.3387 22.4863 14.9313 23.1785 15.5828 23.6609L15.7234 23.7648L15.552 23.8C14.9141 23.932 14.3199 24.1305 13.5074 24.4582C13.5922 24.4238 12.6629 24.8043 12.4277 24.8945L12.2227 24.973L12.332 24.7824C12.8145 23.9426 13.2602 22.934 13.7402 21.6664H13.7406ZM19.8977 24.6453C19.5906 24.7664 18.9297 24.6582 17.766 24.1613L17.4707 24.0355L17.791 24.0121C18.7012 23.9445 19.3457 23.9945 19.7215 24.132C19.8816 24.1906 19.9883 24.2645 20.0355 24.3488C20.0604 24.3888 20.0688 24.4368 20.0589 24.4828C20.049 24.5288 20.0215 24.5692 19.9824 24.5953C19.9576 24.6172 19.9288 24.6342 19.8977 24.6453Z" fill="#FF2727" />
                </svg>

              </div>
              <div>

                <p className="text-[#258CFB]">View PDF file </p>
              </div>
            </div>
            <div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1.55228 12 2 12.4477 2 13V17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H17C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V17C20 17.7957 19.6839 18.5587 19.1213 19.1213C18.5587 19.6839 17.7957 20 17 20H3C2.20435 20 1.44129 19.6839 0.87868 19.1213C0.31607 18.5587 0 17.7956 0 17V13C0 12.4477 0.447715 12 1 12Z" fill="#999999" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L10 11.5858L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289Z" fill="#999999" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C10.5523 0 11 0.447715 11 1V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V1C9 0.447715 9.44772 0 10 0Z" fill="#999999" />
              </svg>

            </div>

          </div>

        </a>

        <div className="w-full h-[51px] flex justify-between  items-center px-[44px] bg-[#D8D8D8]">
          <p className="font-medium text-base text-[#000000]">Status</p>
          <p className="font-normal text-base text-[#000000] capitalize">{status}</p>

        </div>
        <div className="w-full h-[51px] flex justify-between  items-center px-[44px] bg-[#E8E8E8]">
          <p className="font-medium text-base text-[#000000]">Date</p>
          <p className="font-normal text-base text-[#000000]">
            {newmonths}
            {' '}
            {newDate.getDate()}
            ,
            {' '}
            {newDate.getFullYear()}
          </p>

        </div>

        <div className="w-full h-[300px] bg-[#ffffff] px-[44px]  flex flex-col gap-[22px] ">
          <div className="font-bold text-lg text-[#000000] ">Loads</div>
          <div className="w-full  h-full overflow-scroll scroll-smooth scrollbar-hide  ">

            {details.map((data) => (
              <ModalCustomerDetails data={data} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export default Schedulemodal;
