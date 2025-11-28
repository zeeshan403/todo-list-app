
export interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'inprogress' | 'complete';
}