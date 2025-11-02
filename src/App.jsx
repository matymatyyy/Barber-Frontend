import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Preloader from "./components/common/Preloader";
import ScrollToTop from "./components/common/ScrollToTop";
import HeroSlider from "./components/sections/HeroSlider";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import Team from "./components/sections/Team";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import CTA from "./components/sections/CTA";

export default function App() {
  const location = useLocation();
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const scrollTimer = setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 900);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [location]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Si estamos en una ruta hija (login, register, reservation), solo mostrar el Outlet
  if (location.pathname !== '/') {
    return <Outlet />;
  }

  return (
    <>
      <Preloader visible={preloaderVisible} />
      <Header />
      <HeroSlider onNavClick={handleNavClick} />
      <About onNavClick={handleNavClick} />
      <Services />
      <Contact />
      <Team />
      <Testimonials />
      <Pricing />
      <CTA onNavClick={handleNavClick} />
      <Footer />
      <ScrollToTop />
      <Outlet />
    </>
  );
}
