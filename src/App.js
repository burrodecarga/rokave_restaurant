import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Ordenes from './components/pages/Ordenes';
import Menu from './components/pages/Menu';
import Sidebar from './components/ui/Sidebar';
import Agregar from './components/pages/Agregar';
import FirebaseContext from './firebase/context';
import firebase from './firebase';




function App() {
  return (
   <FirebaseContext.Provider
   value={{ firebase }}
   >

    <BrowserRouter>
    <div className='flex'>
        <Sidebar/>
        <div className='md:w-3/5 xl:w-4/5'>
      <Routes>
      <Route path="/" element={<Ordenes />}/>
      <Route path="menu" element={<Menu/>} />
      <Route path="nuevo-platillo" element={<Agregar/>} />
      </Routes>
        </div>
    </div>
  
      
    </BrowserRouter>
   </FirebaseContext.Provider>

   
  );
}

export default App;
