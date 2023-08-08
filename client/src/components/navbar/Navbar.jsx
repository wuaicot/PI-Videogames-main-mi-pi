import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import logoApp from "../MainPage/media/Logo_APP.png";

const NavBar = () => {
  return (
    
    <div className={style.container_nav}>
      <NavLink to="/" className={style.logolink}>
          <img src={logoApp} alt="logoApp" className={style.logo} /> 
        </NavLink>
      <div className={style.container_link}>
        <NavLink to="/create_game" className={style.create_link}>
          ➕ Crear Juegos
        </NavLink>
      </div>      
      <SearchBar />
    </div>
  );
};

export default NavBar;
/*<div className={style.container_nav}>
        <NavLink to="/" className={style.logolink}>
          <img src={logoApp} alt="logoApp" className={style.logo} /> Inicio
        </NavLink>
      </div>
       */