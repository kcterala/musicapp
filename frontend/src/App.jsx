import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";

import AddSong from "./pages/AddSong";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<HomePage />} />

          <Route path="/song" element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
