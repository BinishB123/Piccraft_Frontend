// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginOrSignUp from "./pages/SignUpOrLogin";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<LoginOrSignUp value={true} />} />
          <Route path="/login" element={<LoginOrSignUp value={false} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
