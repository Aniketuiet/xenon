import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="shadow-lg w-full h-[56px] px-2 md:px-4 z-50 bg-zinc-50 border-t-2">
      {/* desktop */}

      <div className="flex items-center h-full justify-between font-bold ">
        <Link to={""}>
          My Shop
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex font-semibold">
         
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
            <Link to={""}>Since @2020</Link>
            <Link to={"menu/64d79ef245d9dc4ff54f1b2e"}>CopyRight@aniketkumar</Link>
          </nav>

        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Footer;
