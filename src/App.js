import { BrowserRouter } from "react-router-dom";
import RoutesApp from './routes/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} theme="dark"/>
      <RoutesApp/>
    </BrowserRouter>
  );
}

export default App;
