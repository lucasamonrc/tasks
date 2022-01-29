import { FiTrash2 } from 'react-icons/fi'

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <nav>
          <h1>✏️ Tasks</h1>
          <button>logout</button>
        </nav>
      </header>

      <section className={styles.container}>
        <header>
          <h2>To do:</h2>

          <section>
            <div>
              <input type="checkbox" className="switch" />
              <label>{' '}Sort by date</label>
            </div>

            <div>
              <input type="checkbox" className="switch" />
              <label>{' '}Filter completed</label>
            </div>
          </section>
        </header>

        <main>
          <ul className={styles.tasks}>
            <li>
              <div>
                <input id="1" type="checkbox" className="todo" />
                <label htmlFor="1">Some task</label>
              </div>
              <div>
                <time>2020-01-01</time>
                <button><FiTrash2 size={16} /></button>
              </div>
            </li>
          </ul>
        </main>

        <footer>
          <form>
            <input type="text" placeholder="Task description" required />
            <input type="date" required />
            <button type="submit">Add task</button>
          </form>
        </footer>
      </section>
    </div>
  );
}
