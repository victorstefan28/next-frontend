export interface ICompetition {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  numberOfParticipants: number;
  dayLeft: number;
  participants?: IParticipant[];
}

export interface IParticipant {
  id: string;
  name: string;
  points: number;
}
