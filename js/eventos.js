// eventos.js

$(document).ready(function() {
    $('#calendar').fullCalendar({
        // Customize calendar appearance and behavior
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',
        events: [
            {
                title: 'Concierto en Vivo',
                start: '2024-12-20T19:00:00',
                description: 'Disfruta de una noche de música en vivo.',
                color: '#ff6666', // Custom color for event
                url: '#'
            },
            {
                title: 'Torneo de Bowling',
                start: '2024-12-22T14:00:00',
                description: 'Ven y participa en nuestro torneo de Bowling.',
                color: '#66b3ff',
                url: '#'
            },
            {
                title: 'Taller de Arte',
                start: '2024-12-25T10:00:00',
                description: 'Un taller donde podrás mostrar tu creatividad.',
                color: '#ffcc00',
                url: '#'
            },
            {
                title: 'Noche de Juegos Retro',
                start: '2024-12-30T20:00:00',
                description: 'Revive los mejores juegos retro en nuestra zona de arcade.',
                color: '#66cc33',
                url: '#'
            }
        ],
        eventClick: function(event) {
            alert('Evento: ' + event.title + '\nDescripción: ' + event.description);
            // You can customize the event details further or show more information
        }
    });
});
