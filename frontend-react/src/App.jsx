import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function AppLayout() {
    const location = useLocation();
    const hidingRoutes = ['/register', '/login'];

    const shouldHideLayout = hidingRoutes.includes(location.pathname);

    return (
      <>
        {!shouldHideLayout && <Header/>}
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            {/* Add other routes */}
          </Routes>

        {!shouldHideLayout && <Footer/>}
      </>
    );
}

function App() {

  return (
    <>
    <BrowserRouter>
      <AppLayout/>
    </BrowserRouter>
    </>
  );
}

export default App
