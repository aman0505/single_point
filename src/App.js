import './App.css';
import {
  Routes,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Context from './context-api/useContext';
import Navbar from './components/Navbar';
import Credit from './components/Credit';
import Funding from './components/Funding';
import Account from './components/Account';
import BlogPage2 from './components/BlogPage2';
import Drafts from './components/Drafts';
import FundingShedule from './components/FundingShedule';
import Createshedule from './components/CreateScedule';
import Addload from './components/AddLoad';
import Fundingpayment from './components/FundingPayment';
import Notification from './components/Notification';
import ForgotPassword from './components/ForgotPassword';
import Document from './components/Document';
import LoardBoard from './components/LoardBoard';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="flex flex-col min-w-min">
      <Context>

        <Router>

          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogpage2" element={<BlogPage2 />} />
          </Routes>

          <Routes>
            <Route path="/credit" element={<Credit />} />
          </Routes>

          <Routes>
            <Route path="/funding" element={<Funding />} />
          </Routes>
          <Routes>
            <Route path="/funding/drafts" element={<Drafts />} />
          </Routes>
          <Routes>
            <Route path="/funding/schedule" element={<FundingShedule />} />
          </Routes>
          <Routes>
            <Route path="/funding/create_shedule" element={<Createshedule />} />
          </Routes>
          <Routes>
            <Route path="/funding/addLoad" element={<Addload />} />
          </Routes>
          <Routes>
            <Route path="/document" element={<Document />} />
          </Routes>
          <Routes>
            <Route path="/funding/payment" element={<Fundingpayment />} />
          </Routes>
          <Routes>
            <Route path="/account" element={<Account />} />
          </Routes>
          <Routes>
            <Route path="/loardboard" element={<LoardBoard />} />
          </Routes>
          <Routes>
            <Route path="/notification" element={<Notification />} />
          </Routes>
          <Routes>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>

        </Router>

      </Context>

    </div>

  );
}

export default App;
