import {Timestamp} from "firebase/firestore";

export interface TodosResponse {
  id: string;
  date: Timestamp;
  completed: boolean;
  title: string;
  userId: string;
}

export interface TodoFirebaseData {
  completed: boolean;
  title: string;
  date: Timestamp;
  userId: string;
}
