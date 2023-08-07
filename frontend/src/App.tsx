import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import { HomePage } from "./Pages/HomePage/HomePage";
import { SignIn } from "./Pages/SignInOut/SignIn";
import { ConcertPage } from "./Pages/ConcertPage/ConcertPage";
import { NotFound } from "./Pages/NotFoundPage/NotFoundPage";
import { SearchPage } from "./Pages/SearchPage/SearchPage";
import { BookingPage } from "./Pages/BookingPage/BookingPage";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { Thanks } from "./Pages/Thanks/Thanks";
import { PromocodesPage } from "./Pages/Admin/PromocodesPage/PromocodesPage";
import { BookedPage } from "./Pages/BookedPage/BookedPage";
import { Pay } from "./Pages/PayPage/Pay";
import { AddConcertPage } from "./Pages/Admin/AddConcertPage/AddConcertPage";
import { MainAdminPage } from "./Pages/Admin/MainPage/MainAdminPage";
import { AddPromocodePage } from "./Pages/Admin/AddPromocodePage/AddPromocodePage";
import { PurchasedPage } from "./Pages/PurchasedPage/PurchasedPage";
import { ConcertsPage } from "./Pages/Admin/ConcertsPage/ConcertsPage";
import { SignOutPage } from "./Pages/SignInOut/SignOut";
import { AuthProvider } from "./Authorization/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />

          <Route path="/signin" element={<SignIn action="signin" />} />
          <Route
            path="/signin-callback"
            element={<SignIn action="signin-callback" />}
          />

          <Route path="/signout" element={<SignOutPage action="signout" />} />
          <Route
            path="/signout-callback"
            element={<SignOutPage action="signout-callback" />}
          />

          <Route path="/concerts/:concertId" element={<ConcertPage />} />
          <Route path="/booking/:concertId" element={<BookingPage />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/booked" element={<BookedPage />} />
          <Route path="/purchased" element={<PurchasedPage />} />
          <Route path="/pay/:bookingId" element={<Pay />} />
          <Route path="/admin/addConcert" element={<AddConcertPage />} />
          <Route path="/admin/addPromocode" element={<AddPromocodePage />} />
          <Route path="/admin/promocodes" element={<PromocodesPage />} />
          <Route path="/admin/concerts" element={<ConcertsPage />} />
          <Route path="/admin" element={<MainAdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </AuthProvider>
    
  );
}

export default App;
