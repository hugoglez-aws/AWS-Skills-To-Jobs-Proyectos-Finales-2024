import { scheduleDTO } from "../schedule/scheduleDTO";
import { UserDTO } from "../user/userDTO";

export interface userScheduleDTO {
    ID: string,
    AttendanceDate: string,
    Comment: string,
    Rating: number,
    UserIDUser: string,
    ScheduleIDSchedule: string,
    Schedule: scheduleDTO,
    User: UserDTO
}