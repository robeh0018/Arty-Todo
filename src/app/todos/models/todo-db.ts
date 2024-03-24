import {Timestamp} from "firebase/firestore";

export interface TodosResponse {
  id: string;
  date: Timestamp;
  completed: boolean;
  title: string;
}

export interface TodoData {
  completed: boolean;
  title: string;
  date: Timestamp;
}
