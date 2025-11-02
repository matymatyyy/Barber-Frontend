import TurnCard from "./TurnCard";

export default function TurnList({ turns }) {
  if (!turns || turns.length === 0) {
    return <p>No se encontraron servicios</p>;
  }

  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {turns.map(turn => <TurnCard key={turn.id} turn={turn} />)}
    </div>
  );
}