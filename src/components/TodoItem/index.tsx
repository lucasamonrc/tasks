import { FiTrash2 } from 'react-icons/fi'

import styles from './TodoItem.module.css';

interface TodoItemProps {
  id: string;
  description: string;
  date: string;
}

export function TodoItem({ id, description, date }: TodoItemProps) {
  return (
    <li className={styles.todoItem}>
      <div>
        <input id={id} type="checkbox" className={styles.todo} />
        <label htmlFor={id}>{description}</label>
      </div>
      <div>
        <time>{date}</time>
        <button><FiTrash2 size={16} /></button>
      </div>
    </li>
  );
}