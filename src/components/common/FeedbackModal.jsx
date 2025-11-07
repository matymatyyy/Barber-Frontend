import { useEffect } from 'react';

export default function FeedbackModal({ 
  isOpen, 
  status, // 'loading' | 'success' | 'error'
  message,
  onClose,
  autoCloseDelay = 7000
}) {
  
  useEffect(() => {
    if (isOpen && (status === 'success' || status === 'error') && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, status, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: (
            <div className="spinner">
              <div className="spinner-circle"></div>
            </div>
          ),
          title: 'Procesando...',
          bgColor: '#3b82f6',
          showCloseButton: false
        };
      case 'success':
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="none"/>
              <path d="M8 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: '¡Éxito!',
          bgColor: '#10b981',
          showCloseButton: true
        };
      case 'error':
        return {
          icon: (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" fill="none"/>
              <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
          title: 'Error',
          bgColor: '#ef4444',
          showCloseButton: true
        };
      default:
        return {
          icon: null,
          title: '',
          bgColor: '#6b7280',
          showCloseButton: true
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="icon-container">
            {config.icon}
          </div>
          
          <h2 className="modal-title">{config.title}</h2>
          
          {message && (
            <p className="modal-message">{message}</p>
          )}
          
          {config.showCloseButton && (
            <button 
              className="close-button"
              onClick={onClose}
              style={{ backgroundColor: config.bgColor }}
            >
              Cerrar
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-container {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: slideUp 0.3s ease-out;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .icon-container {
          margin-bottom: 1.5rem;
        }

        .spinner {
          width: 64px;
          height: 64px;
          position: relative;
        }

        .spinner-circle {
          width: 100%;
          height: 100%;
          border: 4px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 1rem 0;
        }

        .modal-message {
          font-size: 1rem;
          color: #6b7280;
          margin: 0 0 1.5rem 0;
          line-height: 1.5;
        }

        .close-button {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }

        .close-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .close-button:active {
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
