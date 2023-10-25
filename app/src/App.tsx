import "./App.css";
// import Home from "./components/Home";
import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Todolist from "./components/Todolist";
import Addform from "./components/Addform";

function Loading() {
  return <p>Loading ...</p>;
}

function App() {
  return (
    <div>
      {/* <Home /> */}
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todolist  />} />
            <Route path="/add" element={<Addform />} />

            
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;