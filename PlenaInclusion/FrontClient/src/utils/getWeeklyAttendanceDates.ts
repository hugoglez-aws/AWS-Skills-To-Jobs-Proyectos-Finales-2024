/**
 * Funcion cuya utilidad es calcular los dias de asistencia entre una fecha de inicio
 * y una fecha final, semanalmente se calculan todos los dias que tiene que asistir
 * un usuario a una actividad, contando desde el dia en el que se apunta.
 * @param startDate 
 * @param endDate 
 * @returns 
 */
export function getWeeklyAttendanceDates(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = new Date(startDate);
    let finishDate = new Date(endDate);
    let nowADay = new Date();
    nowADay.setHours(1, 0, 0, 0);
    while (currentDate <= finishDate) {
        if (currentDate >= nowADay) {
            dates.push(currentDate.toISOString().split('T')[0]);
        }
        currentDate.setDate(currentDate.getDate() + 7);
    }
    return dates;
}