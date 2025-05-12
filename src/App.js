import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Filials from "./pages/Filials";
import FilialPage from "./pages/FilialPage";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Filials />} />
          <Route path="/flial/:flial_id" element={<FilialPage />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
