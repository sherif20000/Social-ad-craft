import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import SharePreview from "@/pages/SharePreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/share" element={<SharePreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
