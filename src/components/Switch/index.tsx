import styles from './Switch.module.css';

interface SwitchProps {
  name: string;
}

export function Switch({ name }: SwitchProps) {
  return (
    <div className={styles.switch}>
      <input type="checkbox" className="switch" />
      <label>{' ' + name}</label>
    </div>
  );
}