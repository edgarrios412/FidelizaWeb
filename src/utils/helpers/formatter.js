export function formatDate(dateString) {
    // Crear un objeto Date a partir de la cadena de fecha y hora
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        throw new Error("La fecha proporcionada no es válida.");
    }

    // Extraer el día, mes, año
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript empiezan en 0
    const year = date.getFullYear().toString().substr(-2); // Últimos dos dígitos del año

    // Extraer hora y minutos
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Determinar AM o PM y convertir al formato de 12 horas
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Ajustar 0 a 12 para la medianoche

    // Construir la nueva cadena de fecha y hora en el formato deseado
    const newDateString = `${day}/${month}/${year} ${hours.toString().padStart(2, '0')}:${minutes} ${period}`;

    return newDateString;
}
