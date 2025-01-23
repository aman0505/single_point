import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeCard1 from './sub_components/HomeCard1';
// import HomeCard2 from './sub_components/HomeCard2';
import Container from './atoms/Container';
import Contextapi from '../context-api/createContext';

function Home() {
  const { setIsnavabr } = useContext(Contextapi);
  const navigate = useNavigate();
  const [notifiactionData, setNotifiactionData] = useState([]);
  const [isverified, setIsverified] = useState(false);
  const token = sessionStorage.getItem('token');
  // console.log(notifiactionData[0].type)
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
        // console.log(error);
        navigate('/login');
      }
    })();
  }, [isverified]);

  useEffect(() => {
    // console.log('fetching notifiaction');
    // console.log(token);
    if (sessionStorage.getItem('id')) {
      sessionStorage.removeItem('id');
    }

    (async () => {
      try {
        const url = 'https://mobile.singlepointgroup.com/api/notification/all';

        const responce = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifiactionData(responce.data);
        // console.log(responce.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isverified && (
      <div className="w-full">

        <Container className="h-screen mt-[52px] rounded-xl">

          <div className="grid w-full  md:grid-cols-2 gap-7 md:h-[319px] rounded-xl grid-cols-1 h-full  ">

            {/* first col */}
            { notifiactionData.map((data) => (
              <HomeCard1
                {...{
                  description: data.description,
                  bgColor: 'bg-[#258CFB]',
                  img: data.image_url,
                  title: data.title,
                  date: data.last_updated,
                  btnlabel: data.type,
                  btnlink: data.url,
                  id: data._id,
                }}
              />
            ))}
          </div>
        </Container>

      </div>
      )}
    </>
  );
}

export default Home;
