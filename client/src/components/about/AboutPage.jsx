import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "AboutPage.module.css";
import logoApp from "../MainPage/media/Logo_APP.png";
import { SiGithub } from 'react-icons/si'
// import { SiReact, SiRedux, SiReactrouter, SiStyledcomponents, SiNodedotjs, SiExpress, SiPostgresql, SiSequelize } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedinIn } from 'react-icons/fa'

 const AboutPage = () => {
  return (
    <ComponentContainer>

      <Title>
        <h1 data-text='Rodolfo Linares'>Rodolfo Linares</h1>
      </Title>      
      
      <Description>
        <span>Este es mi proyecto personal para el Bootcamp de SoyHenry, el cual consiste en desarrollar una plataforma para videojuegos utilizando la API de rawg.io. Podrás realizar búsquedas, crear, filtrar y ordenar tus videojuegos favoritos.</span>
      </Description>      

      <div>
        <div className='tecnologiesTitle'>
          <h3>Technologies:</h3>
        </div>
        <TecnologiesContainer>
          <TecnologieInfo className='react'>
            <TecnologieIcon><SiReact className='icon' /></TecnologieIcon>
            <TecnologieText><span>React</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='redux'>
            <TecnologieIcon><SiRedux className='icon' /></TecnologieIcon>
            <TecnologieText><span>Redux</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='reactRouter'>
            <TecnologieIcon><SiReactrouter className='icon' /></TecnologieIcon>
            <TecnologieText><span>React Router</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='styledComponents'>
            <TecnologieIcon><SiStyledcomponents className='icon' /></TecnologieIcon>
            <TecnologieText><span>styled components</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='node'>
            <TecnologieIcon><SiNodedotjs className='icon' /></TecnologieIcon>
            <TecnologieText><span>Node.js</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='express'>
            <TecnologieIcon><SiExpress className='icon' /></TecnologieIcon>
            <TecnologieText><span>Express.js</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='postgresql'>
            <TecnologieIcon><SiPostgresql className='icon' /></TecnologieIcon>
            <TecnologieText><span>PostgreSQL</span></TecnologieText>
          </TecnologieInfo>
          <TecnologieInfo className='sequelize'>
            <TecnologieIcon><SiSequelize className='icon' /></TecnologieIcon>
            <TecnologieText><span>Sequelize</span></TecnologieText>
          </TecnologieInfo>
        </TecnologiesContainer>
      </div>

      <div>
        <div className='contactTitle'>
          <h3>Contact:</h3>
        </div>
        <ContactContainer>
          <a href="https://github.com/wuaicot">
            <ContactInfo className='linkedinContact'>
              <ContactIcon><SiGithub className='icon githubIcon' /></ContactIcon>
              <ContactText><span>wuaicot</span></ContactText>
            </ContactInfo>
          </a>
          <a href="https://www.linkedin.com/feed/">
            <ContactInfo className='githubContact'>
              <ContactIcon><FaLinkedinIn className='icon linkedinIcon' /></ContactIcon>
              <ContactText><span>R. Linares</span></ContactText>
            </ContactInfo>
          </a>
          <ContactInfo className='gmailContact'>
            <ContactIcon><FcGoogle className='icon gmailIcon' /></ContactIcon>
            <ContactText><span>wuaicot8@gmail.com</span></ContactText>
          </ContactInfo>
        </ContactContainer>
      </div>

    </ComponentContainer>
  )
}

export default AboutPage;
