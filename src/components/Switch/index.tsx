import styles from './Switch.module.css';

interface SwitchProps {
  name: string;
  on: boolean;
  toggle: () => void
}

export function Switch({ name, on, toggle }: SwitchProps) {
  return (
    <div className={styles.switch}>
      <input type="checkbox" className="switch" defaultChecked={on} onChange={toggle} />
      <label>{' ' + name}</label>
    </div>
  );
}