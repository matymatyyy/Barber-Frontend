import TurnConfigDayCard from "./TurnConfigDayCard";

export default function TurnConfigDayList({ turnConfigDays }) {
  if (!turnConfigDays || turnConfigDays.length === 0) {
    return <p>No se encontraron dias</p>;
  }

  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {turnConfigDays.map(turnConfigDay => <TurnConfigDayCard key={turnConfigDay.id} turnConfigDay={turnConfigDay} />)}
    </div>
  );
}