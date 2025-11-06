import { useState } from "react";
import moment from "moment";
import { useTurnConfigDays } from "../../hooks/useTurnConfigDays";
function TurnConfigDayCard({ turnConfigDay }) {

  const [isUpdateFormShown, setIsUpdateFormShown] = useState(true);
  const [isCreateFormShown, setIsCreateFormShown] = useState(false);
  
  const showUpdateForm = () => {
    if(isUpdateFormShown === true) {
      setIsUpdateFormShown(false);
    } else {
      setIsUpdateFormShown(true);
    }
    
  };

  const showCreateForm = () => {
    if(isCreateFormShown === false) {
      setIsCreateFormShown(true);
    } else {
      setIsCreateFormShown(false);
    }
  }

    const {turnConfigDays, error, updateTurnConfigDay, deleteTurnConfigDay, createTurnConfigDay} = useTurnConfigDays();
    const [day, setDay] = useState("Martes");
    const [hourBegin, setHourBegin] = useState('');
    const [hourEnd, setHourEnd] = useState('');
    const [turnTime, setTurnTime] = useState('');

    const turnConfigDayId = turnConfigDay.id;
    const turnConfigId = turnConfigDay.turnConfigId;

  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        await updateTurnConfigDay (turnConfigDayId, turnConfigId, day, hourBegin, hourEnd, turnTime);
        console.log("llegue aca");
      } catch (error) {
        console.error("hermoso error");
      }
  
    }

    const handleCreate = async (e) => {
      e.preventDefault();
  
      try {
        await createTurnConfigDay (turnConfigId, day, hourEnd, turnTime, hourBegin);
        console.log("llegue aca");
      } catch (error) {
        console.error("hermoso error");
      }
  
    }

    const handleDeleteTurnConfigDay = async () => {
        const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres eliminar este dia? Esta acción no se puede deshacer."
      );

      if (!confirmDelete) {
        return;
      }

      try {
        await deleteTurnConfigDay(turnConfigDayId);
        console.log("llegue aca");
      } catch (error) {
        console.error("hermoso error");
      }
    }

  return (
    <div>
      {isCreateFormShown ?
      (
        <>
        <form onSubmit={handleCreate}>
          <h3>
            <select onChange={(e) => setDay(e.target.value) }>
              <option value={"Martes"}>Martes</option>
              <option value={"Miercoles"}>Miercoles</option>
              <option value={"Jueves"}>Jueves</option>
              <option value={"Viernes"}>Viernes</option>
              <option value={"Sabado"}>Sabado</option>
            </select>
          </h3>
          <p>
            <label>Inicio de jornada</label>
            <input 
              type="time" 
              min="00:00"
              max="23:59"
              value={hourBegin}
              onChange={(e) => setHourBegin(e.target.value)}
            />
          </p> 
          <p>
            <label>Fin de jornada</label>
            <input 
              type="time"  
              min="00:00"
              max="23:59"
              value={hourEnd}
              onChange={(e) => setHourEnd(e.target.value)}
            />
          </p> 
          <p>
            <label>Duracion de cada turno</label>
            <input 
              type="time" 
              min="00:00"
              max="01:00"
              value={turnTime}
              onChange={(e) => setTurnTime(e.target.value)}
            />
          </p>   
          <p>ID: {turnConfigDay.id}</p>
          <input 
            type="submit" 
          />
        </form>


        </>
      )
      :
      (
        <>
        <button onClick={showCreateForm}>+</button>
        </>
      )
      }


    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      
      {isUpdateFormShown ?
      ( 
        <>
        {console.log(turnConfigDay)}
        <h3>{turnConfigDay.day}</h3>
        <p>Jornada: {moment(turnConfigDay.hourEnd.date).format("HH:mm")} -- {moment(turnConfigDay.turnTime.date).format("HH:mm")}</p>
        <p>Duracion de turnos: {moment(turnConfigDay.hourBegin.date).format("HH:mm")}</p>
        <p>ID Configuracion: {turnConfigDay.turnConfigId}</p>
        <p>ID: {turnConfigDay.id}</p>
        </>
      )  
      :
      (
        <>
    <form onSubmit={handleUpdate}>
    <h3>
      <select onChange={(e) => setDay(e.target.value) }>
        <option value={"Martes"}>Martes</option>
        <option value={"Miercoles"}>Miercoles</option>
        <option value={"Jueves"}>Jueves</option>
        <option value={"Viernes"}>Viernes</option>
        <option value={"Sabado"}>Sabado</option>
      </select>
    </h3>
    <p>
      <label>Inicio de jornada</label>
      <input 
        type="time" 
        placeholder={moment(turnConfigDay.hourBegin.date).format("HH:mm")}
        min="00:00"
        max="23:59"
        value={hourBegin}
        onChange={(e) => setHourBegin(e.target.value)}
      />
  </p> 
  <p>
      <label>Fin de jornada</label>
      <input 
        type="time" 
        placeholder={moment(turnConfigDay.hourEnd.date).format("HH:mm")}   
        min="00:00"
        max="23:59"
        value={hourEnd}
        onChange={(e) => setHourEnd(e.target.value)}
      />
  </p> 
  <p>
      <label>Duracion de cada turno</label>
      <input 
        type="time" 
        placeholder={moment(turnConfigDay.turnTime.date).format("HH:mm")}  
        min="00:00"
        max="01:00"
        value={turnTime}
        onChange={(e) => setTurnTime(e.target.value)}
      />
  </p>
        
  <p>ID: {turnConfigDay.id}</p>
  <input 
  type="submit" 
  />
</form>
        </>
      )  
      } 
      <div /*style={styles.buttonSection}*/>
        <button onClick={handleDeleteTurnConfigDay}>
          x
        </button>
        <button onClick={showUpdateForm}/*style={styles.editButton}*/>
          e
        </button>
      </div>

    </div>
    </div>
  );
}
export default TurnConfigDayCard
