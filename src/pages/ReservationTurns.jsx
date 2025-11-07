import { useState, useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Preloader from "../components/common/Preloader";
import Calendar from "../components/Calendar";
import ReservationModal from "../components/ReservationModal";
import FeedbackModal from "../components/common/FeedbackModal";

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

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    status: 'loading', // 'loading' | 'success' | 'error'
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    setIsLoggedIn(!!token);
    setUserEmail(email || '');
    setUserId(id ? parseInt(id) : null);
  }, []);

  const formatBackendDataToEvents = (backendData) => {
    const ahora = new Date();
    
    const inicioAyer = new Date(ahora);
    inicioAyer.setDate(inicioAyer.getDate());
    inicioAyer.setHours(0, 0, 0, 0);
    
    return backendData.data.map(turno => {
      const fecha = turno.date.date.split(' ')[0];
      const horaInicio = turno.hourBegin.date.split(' ')[1];
      const horaFin = turno.hourEnd.date.split(' ')[1];
      
      const fechaInicio = new Date(`${fecha}T${horaInicio}`);
      const esPasado = fechaInicio < inicioAyer;
      
      const estaOcupado = turno.state || esPasado;
      
      return {
        id: turno.id,
        title: esPasado ? 'Pasado' : (turno.state ? 'Ocupado' : 'Disponible'),
        start: `${fecha}T${horaInicio}`,
        end: `${fecha}T${horaFin}`,
        backgroundColor: esPasado ? '#9ca3af' : (turno.state ? '#ef4444' : '#10b981'),
        borderColor: esPasado ? '#9ca3af' : (turno.state ? '#ef4444' : '#10b981'),
        display: 'block',
        extendedProps: {
          barberID: turno.barberID,
          clienteID: turno.clienteID,
          state: estaOcupado,
          isPast: esPasado
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
      setFeedbackModal({
        isOpen: true,
        status: 'error',
        message: 'Debes iniciar sesión para reservar un turno'
      });
      return;
    }

    // Validar si el turno está ocupado o es pasado
    if (info.event) {
      const eventProps = info.event.extendedProps;
      
      if (eventProps.isPast) {
        setFeedbackModal({
          isOpen: true,
          status: 'error',
          message: 'No puedes reservar turnos en fechas u horarios pasados.'
        });
        return;
      }

      if (eventProps.state) {
        setFeedbackModal({
          isOpen: true,
          status: 'error',
          message: 'Este turno ya está ocupado. Por favor selecciona otro horario disponible.'
        });
        return;
      }
    }

    const ahora = new Date();
    const fechaSeleccionada = new Date(info.startStr || info.start);

    const inicioAyer = new Date(ahora);
    inicioAyer.setDate(inicioAyer.getDate() - 1);
    inicioAyer.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < inicioAyer) {
      setFeedbackModal({
        isOpen: true,
        status: 'error',
        message: 'No puedes reservar turnos en fechas u horarios pasados.'
      });
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

  const handleCloseFeedbackModal = () => {
    setFeedbackModal({
      isOpen: false,
      status: 'loading',
      message: ''
    });
  };

  const handleConfirmReservation = async (paymentData) => {
    const testUserId = userId || 1;
    const testUserEmail = userEmail || 'test@test.com';
    const token = localStorage.getItem('token');
    
    if (!testUserEmail || !testUserId || !token) {
      handleCloseModal();

      setFeedbackModal({
        isOpen: true,
        status: 'error',
        message: 'No se pudo identificar al usuario. Por favor inicia sesión nuevamente.'
      });
      return;
    }

    const reservationData = {
      id: selectedTimeSlot.eventId,
      token: token,
      paymentMethod: paymentData.paymentMethod,
    };

    console.log('Confirmar reserva:', reservationData);

    handleCloseModal();

    setFeedbackModal({
      isOpen: true,
      status: 'loading',
      message: 'Procesando tu reserva...'
    });

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

        setFeedbackModal({ isOpen: false, status: 'loading', message: '' });
        
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al realizar la reserva');
      }

      setFeedbackModal({
        isOpen: true,
        status: 'success',
        message: '¡Reserva confirmada con éxito! Pagarás en efectivo en el local.'
      });

      fetchTurnos();
      
    } catch (error) {
      console.error('Error al confirmar reserva:', error);

      setFeedbackModal({
        isOpen: true,
        status: 'error',
        message: error.message || 'Error al confirmar la reserva. Por favor intenta nuevamente.'
      });
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
          <div style={{ 
            textAlign: "center", 
            marginBottom: "2rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ 
                display: "inline-block", 
                width: "20px", 
                height: "20px", 
                backgroundColor: "#10b981",
                borderRadius: "4px"
              }}></span>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>Disponible</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ 
                display: "inline-block", 
                width: "20px", 
                height: "20px", 
                backgroundColor: "#ef4444",
                borderRadius: "4px"
              }}></span>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>Ocupado</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ 
                display: "inline-block", 
                width: "20px", 
                height: "20px", 
                backgroundColor: "#9ca3af",
                borderRadius: "4px"
              }}></span>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>Pasado</span>
            </div>
          </div>
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

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        status={feedbackModal.status}
        message={feedbackModal.message}
        onClose={handleCloseFeedbackModal}
        autoCloseDelay={3000}
      />

      <Footer />
      <Outlet />
    </>
  );
}
