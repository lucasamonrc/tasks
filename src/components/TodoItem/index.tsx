import { FiTrash2 } from 'react-icons/fi'

import styles from './TodoItem.module.css';

interface TodoItemProps {
  id: string;
  description: string;
  date: string;
  completed: boolean;
  handleComplete: (id: string, isChecked: boolean) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export function TodoItem({ id, description, date, completed, handleComplete, handleDelete }: TodoItemProps) {


  return (
    <li className={styles.todoItem}>
      <div>
        <input id={id} type="checkbox" className={styles.todo} defaultChecked={completed} onChange={(e) => handleComplete(id, e.target.checked)} />
        <label htmlFor={id} className={completed ? 'striked' : ''}>{description}</label>
      </div>
      <div>
        <time>{date}</time>
        <button onClick={() => handleDelete(id)}><FiTrash2 size={16} /></button>
      </div>
    </li>
  );
}