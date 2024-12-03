import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssistantPage from "./pages/Assistant/Assistant";
import HomePage from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="assistant" element={<AssistantPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
