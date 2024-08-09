export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: 'pending' | 'ongoing' | 'done';
  userName: string;
}