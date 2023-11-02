import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
// import Footer from "./component/Footer";
const url = 'http://localhost:8080'
function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.url}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])

  return ( 
    <>
      <Toaster />
      <div>
        <Header />
      
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
        {/* <Footer/> */}
      </div>
    </>
  );
}

export default App;
