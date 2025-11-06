import { useState, useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Preloader from "../components/common/Preloader";
import Calendar from "../components/Calendar";
import ReservationModal from "../components/ReservationModal";

export default function ReservationTurns() {
  const location = useLocation();
  const navigate = useNavigate();
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    setIsLoggedIn(!!token);
    setUserEmail(email || '');
    setUserId(id ? parseInt(id) : null);
  }, []);

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
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para reservar un turno');
      navigate('/login');
      return;
    }

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

  const handleConfirmReservation = async (paymentData) => {
    const testUserId = userId || 1;
    const testUserEmail = userEmail || 'test@test.com';
    const token = localStorage.getItem('token');
    
    if (!testUserEmail || !testUserId || !token) {
      alert('Error: No se pudo identificar al usuario. Por favor inicia sesión.');
      return;
    }

    const reservationData = {
      id: selectedTimeSlot.eventId,
      token: token,
      paymentMethod: paymentData.paymentMethod,
    };

    console.log('Confirmar reserva:', reservationData);

    try {
      if (paymentData.paymentMethod === 'mercadopago') {
        console.log('Enviando datos a MP:', {
          turnId: selectedTimeSlot.eventId,
          clientId: testUserId,
          clientEmail: testUserEmail,
          amount: 5000
        });
        
        const mpResponse = await fetch('http://localhost:91/mercadopago/create-preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            turnId: selectedTimeSlot.eventId,
            clientId: testUserId,
            amount: 5000,
            title: 'Reserva de Turno - Barbería',
            description: `Turno del ${new Date(selectedTimeSlot.start).toLocaleString('es-AR')}`,
            clientEmail: testUserEmail
          })
        });
        
        if (!mpResponse.ok) {
          throw new Error('Error al crear preferencia de Mercado Pago');
        }
        
        const mpData = await mpResponse.json();
        
        localStorage.setItem('pendingTurnId', selectedTimeSlot.eventId);
        
        window.location.href = mpData.checkout_url || mpData.sandbox_init_point;
        return;
      }
      
      // Si es efectivo, confirmar la reserva directamente
      const response = await fetch('http://localhost:91/turns/reservation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      
      if (!response.ok) {
        throw new Error('Error al realizar la reserva');
      }
      
      alert('¡Reserva confirmada con éxito! Pagarás en efectivo en el local.');
      handleCloseModal();
      fetchTurnos();
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
          <p style={{ textAlign: "center", marginBottom: "1rem", color: "#666" }}>
            Haz clic en un día del mes para ver los horarios disponibles, luego selecciona un turno verde (disponible)
          </p>
          {!isLoggedIn && (
            <div style={{ 
              textAlign: "center", 
              marginBottom: "2rem",
              padding: "1rem",
              backgroundColor: "#fff3cd",
              borderRadius: "8px",
              border: "1px solid #ffc107"
            }}>
              <p style={{ margin: 0, color: "#856404" }}>
                ⚠️ Debes <strong>iniciar sesión</strong> para poder reservar un turno
              </p>
            </div>
          )}
          
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
                isLoggedIn={isLoggedIn}
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
