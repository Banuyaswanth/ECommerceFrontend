import {Route, Routes} from "react-router-dom";
import Orders from "./Components/OrdersPage/index"
import ProductRatingsAndReviews from "./Components/ProductPageReviews";
import './App.css';
import Compare from "./Components/ComparePage";

function App() {
  return (
    <Routes>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/compare" element={<Compare/>}/>
      <Route path="/reviews" element={<ProductRatingsAndReviews/>}/>
    </Routes>
  );
}

export default App;
