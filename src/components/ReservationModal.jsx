import { useState } from 'react';

export default function ReservationModal({ isOpen, onClose, selectedTimeSlot, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState(''); // 'cash' o 'mercadopago'
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  if (!isOpen || !selectedTimeSlot) return null;

  const handleInitialConfirm = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleFinalConfirm = () => {
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    onConfirm({ paymentMethod });
    
    setShowPaymentOptions(false);
    setPaymentMethod('');
  };

  const handleClose = () => {
    setShowPaymentOptions(false);
    setPaymentMethod('');
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={handleClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        
        {!showPaymentOptions ? (
          <>
            <h2 style={styles.modalTitle}>¿Confirmar Reserva?</h2>
            
            <div style={styles.appointmentInfo}>
              <p><strong>Fecha y Hora:</strong></p>
              <p>{new Date(selectedTimeSlot.start).toLocaleString('es-ES')}</p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>Duración:</strong> {new Date(selectedTimeSlot.start).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedTimeSlot.end).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div style={styles.modalButtons}>
              <button
                type="button"
                onClick={handleClose}
                style={styles.cancelButton}
              >
                No, Cancelar
              </button>
              <button
                type="button"
                onClick={handleInitialConfirm}
                style={styles.confirmButton}
              >
                Sí, Continuar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.modalTitle}>Método de Pago</h2>
            
            <p style={styles.paymentDescription}>
              Selecciona cómo deseas pagar tu servicio:
            </p>

            <div style={styles.paymentOptions}>
              <div 
                style={{
                  ...styles.paymentCard,
                  ...(paymentMethod === 'cash' ? styles.paymentCardSelected : {})
                }}
                onClick={() => handlePaymentSelection('cash')}
              >
                <div style={styles.paymentIcon}>💵</div>
                <h3 style={styles.paymentTitle}>Efectivo en el Local</h3>
                <p style={styles.paymentText}>
                  Paga cuando llegues a tu cita
                </p>
                {paymentMethod === 'cash' && (
                  <div style={styles.checkmark}>✓</div>
                )}
              </div>

              <div 
                style={{
                  ...styles.paymentCard,
                  ...(paymentMethod === 'mercadopago' ? styles.paymentCardSelected : {})
                }}
                onClick={() => handlePaymentSelection('mercadopago')}
              >
                <div style={styles.paymentIcon}>💳</div>
                <h3 style={styles.paymentTitle}>Mercado Pago</h3>
                <p style={styles.paymentText}>
                  Paga ahora de forma segura
                </p>
                {paymentMethod === 'mercadopago' && (
                  <div style={styles.checkmark}>✓</div>
                )}
              </div>
            </div>

            <div style={styles.modalButtons}>
              <button
                type="button"
                onClick={() => setShowPaymentOptions(false)}
                style={styles.cancelButton}
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                style={{
                  ...styles.confirmButton,
                  opacity: paymentMethod ? 1 : 0.5,
                  cursor: paymentMethod ? 'pointer' : 'not-allowed'
                }}
                disabled={!paymentMethod}
              >
                Confirmar Reserva
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2.5rem',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#666',
    lineHeight: 1,
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s',
  },
  modalTitle: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  appointmentInfo: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    textAlign: 'center',
    border: '2px solid #daa520',
  },
  paymentDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '2rem',
    fontSize: '1rem',
  },
  paymentOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  paymentCard: {
    position: 'relative',
    padding: '1.5rem',
    border: '2px solid #ddd',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  paymentCardSelected: {
    borderColor: '#daa520',
    backgroundColor: '#fffbf0',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(218, 165, 32, 0.3)',
  },
  paymentIcon: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  },
  paymentTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  paymentText: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0,
  },
  checkmark: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#daa520',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  modalButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  cancelButton: {
    flex: 1,
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #ddd',
    backgroundColor: '#fff',
    color: '#666',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  confirmButton: {
    flex: 1,
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    backgroundColor: '#daa520',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
