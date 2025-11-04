import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export default function Calendar({ events, onDateSelect, onDateClick, isLoggedIn }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    const styleId = 'calendar-hide-events-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .fc-dayGridMonth-view .fc-event {
          display: none !important;
        }
        .fc-timegrid .fc-scrollgrid-section-header {
          display: none !important;
        }
        .fc-timegrid-slot {
          cursor: not-allowed !important;
          background: #f9f9f9;
        }
        .fc-event {
          cursor: pointer;
        }
        .fc-event[data-ocupado="true"] {
          cursor: not-allowed !important;
          opacity: 0.7;
        }
        .fc-event:hover {
          opacity: 0.8;
        }
        .calendar-not-logged {
          position: relative;
        }
        .calendar-not-logged::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleDateClick = (info) => {
    const calendarApi = calendarRef.current.getApi();
    
    if (calendarApi.view.type === 'dayGridMonth') {
      calendarApi.changeView('timeGridDay', info.dateStr);
    }
    
    if (onDateClick) {
      onDateClick(info);
    }
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const isOcupado = event.extendedProps.state;
    
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para reservar un turno');
      return;
    }
    
    if (isOcupado) {
      alert('Este turno ya está ocupado. Por favor selecciona otro horario disponible.');
      return;
    }
    
    // Llamar a onDateSelect cuando se hace clic en un turno disponible
    if (onDateSelect) {
      onDateSelect({
        start: event.start,
        end: event.end,
        startStr: event.startStr,
        endStr: event.endStr,
        event: event
      });
    }
  };

  return (
    <div style={styles.calendarContainer} className={!isLoggedIn ? 'calendar-not-logged' : ''}>
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
        slotMaxTime="22:00:00"
        slotDuration="00:30:00"
        allDaySlot={false}
        selectable={false}
        selectMirror={false}
        editable={false}
        eventClick={handleEventClick}
        dayMaxEvents={true}
        weekends={true}
        eventDisplay="block"
        displayEventTime={true}
        displayEventEnd={true}
        dateClick={handleDateClick}
        height="auto"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '09:00',
          endTime: '20:00',
        }}
        events={events || []}
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
