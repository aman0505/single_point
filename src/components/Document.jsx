/* eslint-disable max-len */
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Headings from './sub_components/Headings';
// import Fileupload from './sub_components/fileupload';
import ContextApi from '../context-api/createContext';
import Fileupload from './sub_components/Fileupload';
import Fileupload1 from './sub_components/Fileupload1';
import Loader from './sub_components/Loader';

function Document() {
  const context = useContext(ContextApi);
  const navigate = useNavigate();

  const {
    validFiles, setValidFiles, validpages, SetValidpages, validFiles1, validFiles2, setIsnavabr,
  } = context;
  const [loaderflag, setLoaderflag] = useState(false);
  const token = sessionStorage.getItem('token');

  const [loadDetails, setLoadDetails] = useState();
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [Isverified, setIsverified] = useState(false);

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
        console.log(error);
        navigate('/login');
      }
    })();
  }, [Isverified]);

  useEffect(() => {
    if (!validpages) {
      navigate('/funding/schedule');
    }
    if (errorMessage) {
      toast.warn('Please remove all unsupported files');
    }
  }, [errorMessage]);

  useEffect(() => {
    (async () => {
      try {
        const responce = await axios.get(`https://mobile.singlepointgroup.com/api/load/fetch/${sessionStorage.getItem('sid')}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoadDetails(responce.data.data[0]);
        // console.log(responce.data.data[0]._id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    const filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const handleFiles = (f) => {
    const files = f;
    for (let i = 0; i < files.length; i += 1) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i].invalid = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const fileSize = (size) => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
  };


  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.name === name);
    const index3 = unsupportedFiles.findIndex((e) => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const openImageModal = (file) => {
    const reader = new FileReader();
    modalRef.current.style.display = 'block';
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const uploadFiles = async () => {
    // required validation
    if (validFiles.length === 0) {
      toast.warn('Rate Confirmation Is Required', {
        autoClose: 3000,
      });
      return false;
    }
    if (!(loadDetails.tonu && loadDetails.fuel_adv)) {
      if (validFiles1.length === 0) {
        toast.warn(' Bill of Lading Is Required', {
          autoClose: 3000,
        });
        return false;
      }
    }

    setLoaderflag(true);
    const images = [];
    const pdf = [];
    // sepreates pdfs and images 1

    for (let i = 0; i < validFiles.length; i += 1) {
      if (validFiles[i].name.split('.').pop().toLowerCase() === 'pdf' || validFiles[i].name.split('.').pop() === 'PDF') {
        pdf.push(validFiles[i]);
      } else {
        images.push(validFiles[i]);
      }
    }
    // spereating pdfs and images
    for (let i = 0; i < validFiles1.length; i += 1) {
      if (validFiles1[i].name.split('.').pop().toLowerCase() === 'pdf' || validFiles1[i].name.split('.').pop() === 'PDF') {
        pdf.push(validFiles1[i]);
      } else {
        images.push(validFiles1[i]);
      }
    }
    for (let i = 0; i < validFiles2.length; i += 1) {
      if (validFiles2[i].name.split('.').pop().toLowerCase() === 'pdf' || validFiles2[i].name.split('.').pop() === 'PDF') {
        pdf.push(validFiles2[i]);
      } else {
        images.push(validFiles2[i]);
      }
    }
    
    const formData = new FormData();
    //  append pdf


    // for (let i = 0; i < pdf.length; i += 1) {
    //   formData.append('pdfs', pdf[i]);
    // }
    // append  images
    // for (let i = 0; i < images.length; i += 1) {
    //   formData.append('file', images[i]);
    // }



    for (let i = 0; i < validFiles.length; i += 1) {
      formData.append('rate_of_confirmation', validFiles[i]);
    }
    // append  images
    for (let i = 0; i < validFiles1.length; i += 1) {
      formData.append('bol', validFiles1[i]);
    }
    for (let i = 0; i < validFiles2.length; i += 1) {
      formData.append('supporting_doc', validFiles2[i]);
    }
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1], 'all data ');
    // }
    let url = '';
    try {
      if (sessionStorage.getItem('loid')) {
        url = `https://mobile.singlepointgroup.com/api/load/new-edit-load-doc/${sessionStorage.getItem('loid')}`;
      } else {
        url = `https://mobile.singlepointgroup.com/api/load/new-edit-load-doc/${loadDetails._id}`;
      }

      const response = await axios({
        url,
        method: 'PUT',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoaderflag(false);
        toast.success("Document Added ", {
          autoClose: 1000,
        });
        SetValidpages(false);
        setTimeout(() => {
          navigate('/funding/create_shedule');
        }, 2000);
        return true;
      }
    } catch (error) {
      console.log(error);
      setLoaderflag(false);
      toast.warn(error.response.data.error, {
        autoClose: 1000,
      });
    }
  };

  return Isverified && (
    <>
      {loaderflag && <Loader />}
      <div className="w-[1170px] h-[1092px] mx-auto flex flex-col gap-[30px] mt-[45px]">
        <div>
          <Headings
            heading="Add Load Documentation"
            title="Submit the load paperwork
                   below"
          />
        </div>
        <div className="w-full h-full bg-[#ffffff] rounded-xl py-[44px] px-[44px]   ">
          <div className="w-full  h-full  flex flex-col gap-[52px]">

            <div className="  w-full h-[267px]  flex flex-col justify-between">
              <h4 className="font-medium text-lg font-sfPro text-[#000000]">Add Rate Confirmation </h4>

              <div className="w-full h-[178px] rounded-xl bg-[#F5F5F5] border-dashed border-black border-opacity-[0.4] border-[1px] flex justify-center items-center ">
                <div className="w-[167px] h-full   flex flex-col justify-center items-center">
                  <div className="w-fullflex items-center justify-center font-normal text-base text-center text-black text-opacity-[0.4] px-2 ">

                    <p className="">Drag and Drop Here or</p>
                  </div>

                  <div
                    className="drop-container"
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                    aria-labelledby="search"
                  >

                    <div className="mt-1 flex justify-center border-1 border-gray-100  rounded-[4px] hover:cursor-pointer">
                      <div className="flex flex-col gap-2 items-center rounded-xl ">
                        {/* <BsCloudUploadFill size="1.5rem" /> */}
                        <div className="flex text-sm  bg-black rounded-[4px] ">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer  font-medium rounded-[4px]   w-[167px] h-[30px] flex items-center justify-center  text-[#ffffff] focus-within:outline-none   "
                          >
                            <span>Select files to upload</span>
                            <input
                              name="file-upload"
                              type="file"
                              className="sr-only file-input"
                              ref={fileInputRef}
                              multiple
                              onChange={filesSelected}
                            />
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-[167px] flex justify-center items-center mt-[8px]">
                    <p className="text-sm text-gray-500">( png, jpg, jpeg or pdf) </p>

                  </div>

                </div>

              </div>
              <div className="h-[22px] w-full  flex font-normal text-base font-sfPro gap-[22px] text-black text-opacity-[0.4] ">

                {
                  validFiles.map((data, i) => (
                    <div className="file-status-bar flex gap-4 items-centers" key={i}>
                      <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)} role="none">
                        <div className="file-type-logo" />
                        <span className={`file-name   ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                        <span className="file-size">
                          (
                          {fileSize(data.size)}
                          )
                        </span>
                        {' '}
                        {data.invalid && <span className="file-error-message">{errorMessage}</span>}
                      </div>
                      <button type="button" aria-label="close" className="file-remove" onClick={() => removeFile(data.name)}>
                        <svg width="18" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="9.7998" cy="9" r="9" fill="black" fillOpacity="0.2" />
                          <rect width="1.13131" height="10.1818" rx="0.565655" transform="matrix(0.707077 -0.707137 0.707077 0.707137 5.80078 5.7999)" fill="#747474" />
                          <rect width="1.13131" height="10.1818" rx="0.565655" transform="matrix(0.707077 0.707137 -0.707077 0.707137 12.999 5)" fill="#747474" />
                        </svg>

                      </button>
                    </div>
                  ))
                }

              </div>
            </div>

            <div className=" w-full h-[267px]  flex flex-col justify-between">
              <Fileupload />
            </div>
            <div className="w-full h-[267px]  flex flex-col justify-between">
              <Fileupload1 />
            </div>
            <div className="flex gap-3">

              <button type="submit" className="rounded-lg w-[90px] h-[38px] bg-[#258CFB] flex justify-center items-center font-sfPro font-medium text-lg text-[#ffffff]" onClick={() => uploadFiles()}>
                Submit
              </button>
              <button type="submit" className="rounded-lg w-[90px] h-[38px] bg-[#258CFB] flex justify-center items-center font-sfPro font-medium text-lg text-[#ffffff]" onClick={() => navigate('/funding/create_shedule')}>
                Skip
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  );
}

export default Document;
