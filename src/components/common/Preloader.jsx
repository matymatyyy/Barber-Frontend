export default function Preloader({ visible }) {
  if (!visible) return null;
  
  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  );
}