const Spinner = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};

export default Spinner;

const styles = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
};