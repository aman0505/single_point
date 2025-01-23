import { useRef, useMemo, useState } from 'react';

import ContextApi from './createContext';

function Context(props) {
  const [loadData, setLoadData] = useState([]);
  const [scheduleId, setScheduleId] = useState(null);
  const [validpages, SetValidpages] = useState(false);
  const [validFiles, setValidFiles] = useState([]);
  const [validFiles1, setValidFiles1] = useState([]);

  const [paymentFlag, setPaymentFlag] = useState(false);
  const [validFiles2, setValidFiles2] = useState([]);

  const [paymentdetailflag, setPaymentdetailflag] = useState(false);
  const [data, setData] = useState([]);
  const [isupdateload, setIsupdateload] = useState(false);
  const [newpickupcity, setnewpickupcity] = useState();
  const [newdropcity, setnewdropcity] = useState();

  const [editcomcard, setEditcomcard] = useState('');
  const [editcomchecks, setEditcomchecks] = useState('');
  const [editbankaccount, setEditankaccount] = useState('');

  const [editcomsflag, setEditcomsflag] = useState(false);
  const [editcomcardflag, seteditcomcardflag] = useState(false);
  const [editbanckaccountflag, setEditbanckaccountflag] = useState(false);

  const [comcheckData, setComcheckData] = useState([]);
  const [comcardDetails, setComcardDetails] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [isnavbar, setIsnavabr] = useState(false);
  const [warnflag, setWarnflag] = useState(true);
  const ref = useRef('');
  const comcardref = useRef('');
  const bankaccountref = useRef('');
  const [logourl, setLogourl] = useState('');

  const [accountTypeflag, seAccountTypetFlag] = useState(true);

  const [loadHeaderDetails, setLoadHeaderDetails] = useState('Add Load Details');
  // function  fro bankaccount edit
  const bankaccountchange = (data) => {
    setEditankaccount(data);
    setEditbanckaccountflag(true);
    setBankDetails(data);
    bankaccountref.current.click();
  };

  // function for comchecks edit
  const comcheckschange = (data) => {
    setEditcomchecks(data);
    setEditcomsflag(true);
    setComcheckData(data);
    ref.current.click();
  };

  // function for comcard edit
  const comcardedit = (data) => {
    setEditcomcard(data);
    seteditcomcardflag(true);
    setComcardDetails(data);
    comcardref.current.click();
  };
  const cardDetails = (data) => {
    setComcardDetails({
      card_holder_name: data.card_holder_name,
      card_number: data.card_number,
    });
  };

  const transformData = useMemo(() => ({
    setLoadData,
    loadData,
    scheduleId,
    setScheduleId,
    validpages,
    SetValidpages,
    validFiles,
    setValidFiles,
    validFiles1,
    setValidFiles1,
    validFiles2,
    setValidFiles2,
    paymentFlag,
    setPaymentFlag,
    editbanckaccountflag,
    paymentdetailflag,
    ref,
    bankaccountref,
    comcardref,
    comcheckschange,

    editcomchecks,
    editbankaccount,
    editcomcard,

    editcomsflag,

    setComcheckData,
    setBankDetails,
    setComcardDetails,

    comcheckData,
    bankDetails,
    comcardDetails,

    setEditcomsflag,
    seteditcomcardflag,
    setEditbanckaccountflag,

    comcardedit,
    editcomcardflag,
    bankaccountchange,

    cardDetails,

    isnavbar,
    setIsnavabr,

    setWarnflag,
    warnflag,

    setLogourl,
    logourl,

    setData,
    data,

    isupdateload,
    setIsupdateload,
    setnewdropcity,
    newdropcity,
    newpickupcity,
    setnewpickupcity,
    accountTypeflag,
    seAccountTypetFlag,
    loadHeaderDetails,
    setLoadHeaderDetails,

  }));

  const { children } = props;

  return (
    <ContextApi.Provider value={transformData}>
      {children}
    </ContextApi.Provider>
  );
}

export default Context;
