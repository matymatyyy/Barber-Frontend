export default function ReservationModal({ isOpen, onClose, selectedTimeSlot, onConfirm }) {
  if (!isOpen || !selectedTimeSlot) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
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
            onClick={onClose}
            style={styles.cancelButton}
          >
            No, Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            style={styles.confirmButton}
          >
            Sí, Confirmar
          </button>
        </div>
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
    maxWidth: '500px',
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
