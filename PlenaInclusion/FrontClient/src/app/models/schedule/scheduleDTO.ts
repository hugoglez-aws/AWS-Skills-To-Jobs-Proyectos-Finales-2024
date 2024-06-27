import { activityDTO } from "../activity/activityDTO";
import { CampaignDTO } from "../campaign/campaignDTO";
import { typeDTO } from "../type/typeDTO";

export interface scheduleDTO {
    ID_Schedule?: string,
    Address: string,
    DayOfWeek: string,
    StartHour: string,
    FinishHour: string,
    Frequency: string,
    StartDate: Date,
    FinishDate: Date,
    Capacity: number,
    Attendance: number,
    ID_Activity: string,
    ID_Type: string,
    ID_Campaign?: string,
    Activity?: activityDTO,
    Type?: typeDTO,
    Campaign?: CampaignDTO
}