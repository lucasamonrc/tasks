import Head from "next/head";

import { Header } from '../components/Header';
import { Switch } from "../components/Switch";
import { TodoItem } from "../components/TodoItem";

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tasks | Home</title>
      </Head>
      <div>
        <Header logout={() => { }} />

        <section className={styles.container}>
          <header>
            <h2>To do:</h2>

            <section>
              <Switch name="Sort by date" />
              <Switch name="Filter completed" />
            </section>
          </header>

          <main>
            <ul className={styles.tasks}>
              <TodoItem id="1" description="some task" date="2022-01-29" />
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
    </>
  );
}
