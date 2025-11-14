
export enum DayOfWeek {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface Lecture {
  id: string;
  name: string;
  type: string;
  professor?: string;
  startTime: string;
  location: string;
  day: DayOfWeek;
}
