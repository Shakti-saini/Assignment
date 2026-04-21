import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendEmail from "./Pages/email";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<SendEmail />} />
      </Routes>

      {/* ✅ Toast container must be here */}
      <ToastContainer position="top-right" autoClose={3000} />

    </BrowserRouter>
  );
}

export default App;