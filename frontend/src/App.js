import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import User from './pages/User'
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
      <div className='wrapper'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users/:userId' element={<User />} />
          <Route path='/new-post' element={<PrivateRoute />}>
            <Route path='/new-post' element={<NewPost />} />
          </Route>
          <Route path='/posts/:postId' element={<Post />} />
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
