import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Header } from '../components/Header';
import { Switch } from "../components/Switch";
import { TodoItem } from "../components/TodoItem";
import api from "../services/api";

import styles from '../styles/pages/Home.module.css';

interface Todo {
  id: string;
  description: string;
  date: string;
  completed: boolean
}

interface User {
  id: string;
  name: string;
  email: string;
  todos: Todo[];
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function initUserProfile() {
      const token = localStorage.getItem('_auth');

      if (!token) {
        throw new Error('invalid or missing auth token');
      }

      const { data } = await api.get('/users', {
        headers: {
          'Authorization': token,
        }
      });

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        todos: data.todos,
      });
    }

    if (!user) {
      initUserProfile().catch((err) => {
        console.error(err.message);
        localStorage.removeItem('_auth');
        router.push('/signin');
      });
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Tasks | Home</title>
      </Head>
      <div>
        <Header logout={() => {
          localStorage.removeItem('_auth');
          router.push('/signin');
        }} />

        <section className={styles.container}>
          <header>
            <h2>{user?.name}&apos;s To do:</h2>

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
