import { useState } from "react";
import { useTurnConfigDays } from "../../hooks/useTurnConfigDays";
function TurnConfigDayCreateForm({ turnConfigDay }) {

    const {turnConfigDays, error, createTurnConfigDay} = useTurnConfigDays();
    const [day, setDay] = useState("Martes");
    const [hourBegin, setHourBegin] = useState('');
    const [hourEnd, setHourEnd] = useState('');
    const [turnTime, setTurnTime] = useState('');
    const [turnConfigId, setTurnConfigId] = useState(0);
    const [isCreateFormShown, setIsCreateFormShown] = useState(false);

    const showCreateForm = () => {
        if(isCreateFormShown === false) {
        setIsCreateFormShown(true);
        } else {
          setIsCreateFormShown(false);
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
                    <input 
                        type="number" 
                        value={turnConfigId}
                        onChange={(e) => setTurnConfigId(e.target.value)} 
                    />
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
        </div>
    );
}
export default TurnConfigDayCreateForm;