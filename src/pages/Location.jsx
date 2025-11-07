import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function LocationPage() {
  return (
    <>
      <Header />
      
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <div style={styles.mapSection}>
            <div style={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3270.806234567890!2d-60.46197!3d-34.64522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDM4JzQyLjgiUyA2MMKwMjcnMzEuMSJX!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
                width="100%"
                height="500"
                style={styles.iframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Barber Shop"
              ></iframe>
            </div>
          </div>
          <div style={styles.infoSection}>
            <div style={styles.infoGrid}>
              <div style={styles.infoCard}>
                <div style={styles.iconCircle}>📍</div>
                <h3 style={styles.cardTitle}>Dirección</h3>
                <p style={styles.cardText}>
                  UTN - Edificio Nuevo<br />
                  Chacabuco, Buenos Aires<br />
                  Argentina
                </p>
                <p style={styles.coordinates}>
                  34°38'42.8"S 60°27'31.1"W
                </p>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.iconCircle}>📞</div>
                <h3 style={styles.cardTitle}>Contacto</h3>
                <p style={styles.cardText}>
                  <strong>Teléfono:</strong><br />
                  2352 551599
                </p>
                <p style={styles.cardText}>
                  <strong>Email:</strong><br />
                  info@barbershop.com
                </p>
              </div>
              <div style={styles.infoCard}>
                <div style={styles.iconCircle}>🕐</div>
                <h3 style={styles.cardTitle}>Horarios</h3>
                <p style={styles.cardText}>
                  <strong>Lunes - Viernes</strong><br />
                  11:30 AM - 8:00 PM
                </p>
                <p style={styles.cardText}>
                  <strong>Sábado - Domingo</strong><br />
                  9:00 AM - 8:00 PM
                </p>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination="
                target="_blank"
                rel="noopener noreferrer"
                style={styles.directionsButton}
              >
                <span style={styles.buttonIcon}>🧭</span>
                Cómo llegar
              </a>
              <a 
                href="https://wa.me/5492352551599"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.callButton}
              >
                <span style={styles.buttonIcon}>💬</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    marginTop: '80px', // Espacio para el header fijo
  },
  header: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '3rem 2rem',
    textAlign: 'center',
    borderBottom: '3px solid #d4af37',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#d4af37',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#ccc',
    margin: 0,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  mapSection: {
    marginBottom: '3rem',
  },
  mapContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
  },
  iframe: {
    border: 0,
    display: 'block',
  },
  infoSection: {
    marginBottom: '3rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  iconCircle: {
    width: '60px',
    height: '60px',
    backgroundColor: '#d4af37',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    margin: '0 auto 1rem',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  cardText: {
    fontSize: '0.95rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '0.8rem',
  },
  coordinates: {
    fontSize: '0.85rem',
    color: '#888',
    fontFamily: 'monospace',
    marginTop: '0.5rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  directionsButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#d4af37',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
  },
  callButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#1a1a1a',
    color: '#d4af37',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  buttonIcon: {
    fontSize: '1.2rem',
  },
};
