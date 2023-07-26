import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { HomePage } from './Pages/HomePage/HomePage';
import { SignIn } from './Pages/SignIn/SignIn';
import { ConcertPage } from './Pages/ConcertPage/ConcertPage';
import { NotFound } from './Pages/NotFoundPage/NotFoundPage';
import { SearchPage } from './Pages/SearchPage/SearchPage';
import { Provider } from 'react-redux';
import store from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
    <Header />
    <Routes>
      <Route path="" element={<HomePage />}/>
      <Route path="search" element={<SearchPage />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/concerts/:concertId" element={<ConcertPage />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </BrowserRouter>
    </Provider>
   
  )
}

export default App
