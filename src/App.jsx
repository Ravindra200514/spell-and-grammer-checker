import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout"; 

// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));
const SpellGrammar = lazy(() => import("./pages/SpellGrammar"));
const Translation = lazy(() => import("./pages/Translate"));

function App() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Wrap everything inside the Layout component */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/spell-grammar" element={<SpellGrammar/>} />
            <Route path="/translation" element={<Translation/>} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
