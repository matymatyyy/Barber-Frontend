import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [cellphone, setCellphone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:91/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dni, cellphone }),
      });

      if (res.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert("Error al registrarse");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
        />
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>Registrarse</button>
      </form>
    </div>
  );
}
