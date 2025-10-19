import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export default function Calendar({ onDateSelect }) {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    if (onDateSelect) {
      onDateSelect(info);
    }
  };

  return (
    <div style={styles.calendarContainer}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
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
        height="auto"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
          startTime: '09:00',
          endTime: '20:00',
        }}
        events={[
          // Aquí puedes agregar turnos ocupados desde tu backend
          // { title: 'Turno ocupado', start: '2025-10-20T10:00:00' }
        ]}
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
