import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { HomePage } from './Pages/HomePage/HomePage';
import { SignIn } from './Pages/SignIn/SignIn';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="" element={<HomePage />}/>
      <Route path="/signin" element={<SignIn />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
