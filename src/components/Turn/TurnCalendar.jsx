import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import "../../App.css";
import Calendar from "../../components/Calendar";
import ReservationModal from "../../components/ReservationModal";
import { useTurns } from "../../hooks/useTurns";

function TurnCard ({ turno }) {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const { turnos, isLoadingTurns, errorTurns, refetchTurnos } = useTurns();

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
    console.log('Horario seleccionado:', {
      start: info.startStr || info.start.toISOString(),
      end: info.endStr || info.end.toISOString()
    });
    
    setSelectedTimeSlot({
      start: info.startStr || info.start.toISOString(),
      end: info.endStr || info.end.toISOString(),
      eventId: info.event?.id
    });
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTimeSlot(null);
  };

  return (
    <>
      
      <main style={{ marginTop: "80px", minHeight: "calc(100vh - 200px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {errorTurns && (
            <div style={{ 
              color: "#dc3545", 
              padding: "10px", 
              backgroundColor: "#f8d7da", 
              border: "1px solid #f5c6cb", 
              borderRadius: "4px", 
              marginBottom: "20px" 
            }}>
              {errorTurns}
            </div>
          )}
          
          {isLoadingTurns ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p>Cargando turnos disponibles...</p>
            </div>
          ) : (
            <Calendar 
              events={turnos}
              onDateClick={handleDateClick}
              onDateSelect={handleDateSelect}
            />
          )}
        </div>
      </main>

      <ReservationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        selectedTimeSlot={selectedTimeSlot}
      />
    </>
  )
}

export default TurnCard