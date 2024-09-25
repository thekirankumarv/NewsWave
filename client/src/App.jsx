import { useState } from "react";
import "./App.css"; 
import Header from "./components/Header"; 
import AllNews from "./components/AllNews"; 
// import Footer from "./components/Footer"; // Importing Footer component (commented out)
// import Cards from "./components/Cards"; // Importing Cards component (commented out)
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews"; 

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importing routing components

function App() {
  const [count, setCount] = useState(0); // State variable (currently unused)

  return (
    <div className="w-full">
      <BrowserRouter>
        <Header /> {/* Rendering Header component */}
        <Routes>
          <Route path="/" element={<AllNews />} /> {/* Route for AllNews component */}
          <Route path="/top-headlines/:category" element={<TopHeadlines />} /> {/* Route for TopHeadlines component */}
          <Route path="/country/:iso" element={<CountryNews />} /> {/* Route for CountryNews component */}
        </Routes>
        {/* <Cards />  */} {/* Render Cards component (currently commented out) */}
        {/* <Footer />   */} {/* Render Footer component (currently commented out) */}
      </BrowserRouter>
    </div>
  );
}

export default App;
