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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderVisible(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDateClick = (info) => {
    console.log('Día clickeado:', info.dateStr);
    setSelectedDate(info.dateStr);
  };

  const handleDateSelect = (info) => {
    // Cuando selecciona un rango horario específico
    console.log('Horario seleccionado:', {
      start: info.startStr,
      end: info.endStr
    });
    setSelectedTimeSlot({
      start: info.startStr,
      end: info.endStr
    });
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
          <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Reserva tu Turno
          </h1>
          <p style={{ textAlign: "center", marginBottom: "3rem", color: "#666" }}>
            Haz clic en un día del mes para ver los horarios disponibles
          </p>
          
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Calendar 
              onDateClick={handleDateClick}
              onDateSelect={handleDateSelect}
            />
            
            {selectedTimeSlot && (
              <div style={{
                marginTop: "2rem",
                padding: "2rem",
                background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                borderRadius: "12px",
                textAlign: "center",
                border: "2px solid var(--accent)"
              }}>
                <h3 style={{ color: "var(--dark)", marginBottom: "1rem" }}>
                  Horario Seleccionado
                </h3>
                <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  <strong>Inicio:</strong> {new Date(selectedTimeSlot.start).toLocaleString('es-ES')}
                </p>
                <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                  <strong>Fin:</strong> {new Date(selectedTimeSlot.end).toLocaleString('es-ES')}
                </p>
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