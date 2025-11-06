import { useState, useEffect } from 'react';

export const useTurns = () => {
  const [turnos, setTurnos] = useState([]);
  const [isLoadingTurns, setIsLoadingTurns] = useState(false);
  const [errorTurns, setErrorTurns] = useState(null);

  const formatBackendDataToEvents = (backendData) => {
    return backendData.data.map(turno => {
      const fecha = turno.date.date.split(' ')[0];
      const horaInicio = turno.hourBegin.date.split(' ')[1];
      const horaFin = turno.hourEnd.date.split(' ')[1];
      
      return {
        id: turno.id,
        title: turno.state ? 'Ocupado' : 'Disponible',
        start: `${fecha}T${horaInicio}`,
        end: `${fecha}T${horaFin}`,
        backgroundColor: turno.state ? '#ef4444' : '#10b981',
        borderColor: turno.state ? '#ef4444' : '#10b981',
        display: 'block',
        extendedProps: {
          barberID: turno.barberID,
          clienteID: turno.clienteID,
          state: turno.state
        }
      };
    });
  };

  const fetchTurnos = async () => {
    try {
      setIsLoadingTurns(true);
      setErrorTurns(null);
      const response = await fetch('http://localhost:91/turns');
      
      if (!response.ok) {
        throw new Error('Error al cargar los turnos');
      }
      
      const data = await response.json();
      const eventosFormateados = formatBackendDataToEvents(data);
      setTurnos(eventosFormateados);
    } catch (error) {
      console.error('Error al cargar turnos:', error);
      setErrorTurns(error.message);
    } finally {
      setIsLoadingTurns(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  return {
    turnos,
    isLoadingTurns,
    errorTurns,
    searchTurnos: fetchTurnos, 
    refetchTurnos: fetchTurnos 
  };
};