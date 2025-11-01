import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import "../App.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Preloader from "../components/common/Preloader";
import Calendar from "../components/Calendar";
import ReservationModal from "../components/ReservationModal";

export default function ReservationTurns() {
  const location = useLocation();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const formatBackendDataToEvents = (backendData) => {
    return backendData.data.map(turno => {
      const fecha = turno.date.date.split(' ')[0];
      const horaInicio = turno.hourBegin.date.split(' ')[1];
      const horaFin = turno.hourEnd.date.split(' ')[1];
      
      return {
        id: turno.id,
        title: turno.state ? 'Ocupado' : 'Disponible',
        start: `${fecha}T${horaInicio}`,
        end: `${fecha}T${horaFin}`,
        backgroundColor: turno.state ? '#ef4444' : '#10b981',
        borderColor: turno.state ? '#ef4444' : '#10b981',
        display: 'block',
        extendedProps: {
          barberID: turno.barberID,
          clienteID: turno.clienteID,
          state: turno.state
        }
      };
    });
  };

  const fetchTurnos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:91/turns');
      const data = await response.json();
      
      const eventosFormateados = formatBackendDataToEvents(data);
      setTurnos(eventosFormateados);
    } catch (error) {
      console.error('Error al cargar turnos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();

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
    
    // Guardar el turno seleccionado
    setSelectedTimeSlot({
      start: info.startStr || info.start.toISOString(),
      end: info.endStr || info.end.toISOString(),
      eventId: info.event?.id
    });
    
    // Abrir el modal automáticamente
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTimeSlot(null);
  };

  const handleConfirmReservation = async (formData) => {
    const reservationData = {
      ...formData,
      id: selectedTimeSlot.eventId,
      id_client: 1
    };

    console.log('Confirmar reserva:', reservationData);
    
    try {
      // TODO: Descomentar cuando tengas el endpoint listo porque ahora no existe, ni ganas de hacer sabado a la noche...
      const response = await fetch('http://localhost:91/turns/reservation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      
      if (!response.ok) {
        throw new Error('Error al realizar la reserva');
      }
      alert('¡Reserva confirmada con éxito!');
      handleCloseModal();
      fetchTurnos(); // Recargar turnos
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      alert('Error al confirmar la reserva. Por favor intenta nuevamente.');
    }
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
            Haz clic en un día del mes para ver los horarios disponibles, luego selecciona un turno verde (disponible)
          </p>
          
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {loading ? (
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
        </div>
      </main>

      <ReservationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        selectedTimeSlot={selectedTimeSlot}
        onConfirm={handleConfirmReservation}
      />

      <Footer />
      <Outlet />
    </>
  );
}
