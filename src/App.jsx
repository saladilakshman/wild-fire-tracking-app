import { useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage";
import Map from "./pages/map";
import { HashRouter, Routes, Route } from "react-router-dom";
function App() {
  useEffect(() => {
    if (
      HTMLScriptElement.supports &&
      HTMLScriptElement.supports("speculationrules")
    ) {
      const speculationtag = document.createElement("script");
      speculationtag.type = "speculationrules";
      const specrules = {
        prefetch: [
          {
            source: "list",
            urls: ["/", "/map"],
          },
        ],
        prerender: [
          {
            source: "list",
            urls: ["/map"],
          },
        ],
      };
      speculationtag.textContent = JSON.stringify(specrules);
    } else {
      console.log("speculation rules is not supported in your browser");
    }
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
