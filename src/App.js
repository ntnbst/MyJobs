import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import { RenderRoutes, ROUTES } from './routes/routes';
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RenderRoutes routes={ROUTES} />
      </div>
    </BrowserRouter>
  );
}

export default App;
