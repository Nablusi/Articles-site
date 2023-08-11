import './App.css';
import SignUp from './Pages/SignUp';
import RootLayout from './RootLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Profile';
import NewPost from './Pages/NewPost';
import Settings from './Pages/Settings';
import Home from './Pages/Home';
import SlugPage from './Pages/SlugPage';
import UpdateSlug from './Pages/UpdateSlug';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element= {<Login />} />
      <Route path='/profile/:username' element={<Profile />} />
      <Route path='/newpost' element={<NewPost />} /> 
      <Route path='/settings' element= {<Settings />} />
      <Route path='/:slug' element={<SlugPage />} />
      <Route path='/updatepage/:slug' element={<UpdateSlug />} />
    </Route>
  )
);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;
