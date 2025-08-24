import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {location.pathname === "/" && (
        <>
          <h1>Bienvenido a mi App 🚀</h1>
          <p>Esta es la página de inicio.</p>
          <button onClick={goToLogin} style={{ padding: "10px 20px", marginTop: "20px" }}>
            Ir al Login
          </button>
        </>
      )}

      <Outlet />
    </div>
  );
}
