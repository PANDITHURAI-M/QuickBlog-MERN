import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/Admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import Addblog from './pages/Admin/Addblog';
import ListBlog from './pages/Admin/ListBlog';
import Comments from './pages/Admin/Comments';
import Login from './components/Admin/Login';

import {Toaster} from "react-hot-toast";
import { useAppContext } from './context/AppContext';

const App = ()=>{
  
  const {token}= useAppContext();
return(
  <div>
    <Toaster/>
    <Routes >
      <Route path='/' element={ <Home/> } />
      <Route path="/blog/:id" element={<Blog/>} />
      <Route path="/admin" element={ token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<Addblog />} />
          <Route path="ListBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
       </Route>
    </Routes>
 
  </div>
);
}

export default App;
