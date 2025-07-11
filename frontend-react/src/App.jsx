import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './context/AuthProvider'
import Dashboard from './components/Dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


function AppLayout() {
    const location = useLocation();
    const hidingRoutes = ['/register', '/login'];

    const shouldHideLayout = hidingRoutes.includes(location.pathname); 

    return (
      <>
        {!shouldHideLayout && <Header/>}

          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>}/> 
            
            <Route path='/login' element={<PublicRoute> <Login/> </PublicRoute>}/>
            <Route path='/dashboard' element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
            {/* Add other routes branch dev */}
          </Routes>

        {!shouldHideLayout && <Footer/>} 
      </>
    );
}

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <AppLayout/>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App
