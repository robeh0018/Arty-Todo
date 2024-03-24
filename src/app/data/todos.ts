import type {Todo} from "../todos";
import {v4 as uuidV4} from 'uuid';

//  To simulated yesterday date.
const getYesterdayDate = (): Date => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  return yesterdayDate;
}

export const initialTodos: Todo[] = [
  {
    id: uuidV4(),
    title: 'Feed the dogs',
    date: getYesterdayDate(),
    completed: false,
  },
  {
    id: uuidV4(),
    title: 'Feed the cats',
    date: new Date(),
    completed: false,
  },
  {
    id: uuidV4(),
    title: 'Study Angular',
    date: new Date(),
    completed: true,
  },
  {
    id: uuidV4(),
    title: 'Make my Todo App',
    date: new Date(),
    completed: false,
  },
  {
    id: uuidV4(),
    title: 'Study Next',
    date: new Date(),
    completed: true,
  },
  {
    id: uuidV4(),
    title: 'Fix bugs',
    date: new Date(),
    completed: true,
  },

  {
    id: uuidV4(),
    title: 'Get a date',
    date: new Date(),
    completed: true,
  },

]
