export type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
  priority: number;
  createdAt: string;
};

export type EditedTodo = {
  title: string;
  content: string;
  priority: number;
};
