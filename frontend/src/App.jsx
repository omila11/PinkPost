import './styles/global.css'
import Home from './pages/Home'
import Shop from './pages/Shop'
import CreateBox from './pages/CreateBox'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  // Simple routing based on window location
  const path = window.location.pathname;
  
  if (path === '/admin/dashboard') {
    return <AdminDashboard />;
  }
  
  if (path === '/shop') {
    return <Shop />;
  }
  
  if (path === '/create' || path === '/create-box') {
    return <CreateBox />;
  }
  
  if (path === '/checkout') {
    return <Checkout />;
  }
  
  if (path === '/payment') {
    return <Payment />;
  }
  
  if (path === '/signin') {
    return <SignIn />;
  }
  
  if (path === '/signup') {
    return <SignUp />;
  }
  
  if (path === '/about') {
    return <About />;
  }
  
  if (path === '/contact') {
    return <Contact />;
  }
  
  if (path === '/faq' || path === '/faqs') {
    return <FAQs />;
  }
  
  return <Home />;
}

export default App
