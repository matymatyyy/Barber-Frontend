import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export default function Calendar({ onDateSelect, onDateClick }) {
  const calendarRef = useRef(null);

  const handleDateClick = (info) => {
    // Si estamos en vista mensual, cambiar a vista diaria de ese día
    const calendarApi = calendarRef.current.getApi();
    
    if (calendarApi.view.type === 'dayGridMonth') {
      calendarApi.changeView('timeGridDay', info.dateStr);
    }
    
    // Ejecutar callback personalizado si existe
    if (onDateClick) {
      onDateClick(info);
    }
  };

  const handleSelect = (info) => {
    // Para selección de rangos de tiempo
    if (onDateSelect) {
      onDateSelect(info);
    }
  };

  return (
    <div style={styles.calendarContainer}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        dateClick={handleDateClick}
        select={handleSelect}
        height="auto"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '09:00',
          endTime: '20:00',
        }}
        events={[
          // Turnos desde backend
          { 
            title: 'Ocupado', 
            start: '2025-10-20T10:00:00',
            end: '2025-10-20T10:30:00',
            backgroundColor: '#999',
            borderColor: '#999'
          },
          { 
            title: 'Disponible', 
            start: '2025-10-20T11:00:00',
            end: '2025-10-20T11:30:00',
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)'
          }
        ]}
        // Personalizar el texto de los botones
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        }}
      />
    </div>
  );
}

const styles = {
  calendarContainer: {
    padding: '1rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  }
};
