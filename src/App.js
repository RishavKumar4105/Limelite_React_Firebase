import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Master from './Component/Layout/Master';
import AdminMaster from './Component/Layout/AdminMaster';
import About from './Component/Pages/About';
import Home from './Component/Pages/Home';
import InfluencerMaster from './Component/Layout/InfluencerMaster';
import Influencer from './Component/Pages/Influencer';
import Login from './Component/Pages/Login';
import InfluencerHome from './Component/Influencer/InfluencerHome';
import InfluencerCost from './Component/Influencer/InfluencerCost';
import InfluencerRequest from './Component/Influencer/InfluencerRequest';
import InfluencerProfile from './Component/Influencer/InfluencerProfile';
import AdminHome from './Component/Admin/AdminHome';
import Register from './Component/Pages/Register';
import AddPost from './Component/Admin/posts/AddPost';
import ManagePost from './Component/Admin/posts/ManagePost';
import EditPost from './Component/Admin/posts/EditPost';
import ViewClients from './Component/Admin/users/ViewClients';
import ViewInfluencers from './Component/Admin/users/ViewInfluencers';
import InfluencerRegister from "./Component/Pages/InfluencerRegister.js";
import AddCost from './Component/Influencer/costs/AddCost.js';
import ManageCosts from './Component/Influencer/costs/ManageCosts.js';
import EditCost from './Component/Influencer/costs/EditCost.js';
import ViewPostType from './Component/clients/ViewPostType.js';
import ViewInfluencersUser from './Component/clients/ViewInfluencersUser.js';
import ViewPriceCatalogue from './Component/clients/ViewPriceCatalogoue.js';
import ViewBooking from './Component/clients/ViewBooking.js';
import ViewBookingInfluencer from './Component/Influencer/ViewBookingInfluencer.js';
import ViewProfile from './Component/clients/ViewProfile.js';
import ViewUserProfile from './Component/Influencer/ViewUserProfile.js';
import AdminRequest from './Component/Admin/AdminRequests.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master/>}>
              <Route  path="/" element={<Home/>}/>
              <Route  path="/about" element={<About/>}/>
              <Route  path="/viewInfluencers" element={<ViewInfluencersUser/>}/>
              <Route  path="/login" element={<Login/>}/>
              <Route  path="/clientRegister" element={<Register/>}/>
              <Route path="/influencerRegister" element={<InfluencerRegister/>}/>
              <Route path='/postType' element={<ViewPostType/>}/>
              <Route path='/priceCatalogue/:id' element={<ViewPriceCatalogue/>}/>
              <Route path="/request" element={<ViewBooking/>}/>
              <Route path='/profile' element={<ViewProfile/>}/>
          </Route>  
          <Route path="/admin" element={<AdminMaster/>}>
              <Route path="/admin" element={<AdminHome/>}/>
              <Route path='/admin/requests' element={<AdminRequest/>}/>
              <Route path='/admin/addPost' element={<AddPost/>}/>
              <Route path='/admin/managePost' element={<ManagePost/>}/>
              <Route path='/admin/editPost/:id' element={<EditPost/>}/>
              <Route path='/admin/viewClient' element={<ViewClients/>}/>
              <Route path='/admin/viewInfluencer' element={<ViewInfluencers/>}/>
          </Route>
        
          <Route path="/influencer" element={<InfluencerMaster/>}>
            <Route path="/influencer" element={<InfluencerHome/>}/>
            <Route path="/influencer/cost" element={<InfluencerCost/>}/>
            <Route path="/influencer/requests" element={<ViewBookingInfluencer/>}/>
            <Route path="/influencer/profile" element={<InfluencerProfile/>}/>
            <Route path='/influencer/addCost' element={<AddCost/>}/>
            <Route path='/influencer/manageCost' element={<ManageCosts/>}/>
            <Route path='/influencer/editCost/:id' element={<EditCost/>}/>
            <Route path='/influencer/viewUserProfile/:id' element={<ViewUserProfile/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
