import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import "../App.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Preloader from "../components/common/Preloader";
import Calendar from "../components/Calendar";

export default function ReservationTurns() {
  const location = useLocation();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDateSelect = (info) => {
    setSelectedDate(info.dateStr);
    console.log('Fecha seleccionada:', info);
  };

  if (location.pathname !== '/reservation') {
    return <Outlet />;
  }

  return (
    <>
      <Preloader visible={preloaderVisible} />
      <Header />
      
      <main style={{ marginTop: "80px", minHeight: "calc(100vh - 200px)" }}>
        <div className="container" style={{ padding: "4rem 2rem" }}>
          <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Reserva tu Turno
          </h1>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "#666" }}>
            Selecciona el día y horario que prefieras en el calendario
          </p>
          
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Calendar onDateSelect={handleDateSelect} />
            
            {selectedDate && (
              <div style={{
                marginTop: "2rem",
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <p>Fecha seleccionada: <strong>{selectedDate}</strong></p>
                <button className="btn" style={{ marginTop: "1rem" }}>
                  <span>Confirmar Reserva</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <Outlet />
    </>
  );
}
