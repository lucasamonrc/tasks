import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import { Header } from '../components/Header';
import { Switch } from "../components/Switch";
import { TodoItem } from "../components/TodoItem";
import api from "../services/api";
import supabase from "../services/supabase";

import styles from '../styles/pages/Home.module.css';

interface DBTodo {
  id: string;
  description: string;
  date: string;
  user_id: string;
  completed: boolean;
  created_at: string;
}

interface Todo {
  id: string;
  description: string;
  date: string;
  completed: boolean;
}

interface User {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  todos: Todo[];
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    todos: [],
  });
  const [newTodo, setNewTodo] = useState({ description: '', date: '' });

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
        todos: data.todos.map((todo: DBTodo) => ({
          id: todo.id,
          description: todo.description,
          date: new Date(todo.date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
          completed: todo.completed,
        })),
      });
    }

    if (!user.id) {
      initUserProfile().catch((err) => {
        console.error(err.message);
        localStorage.removeItem('_auth');
        router.push('/signin');
      });
    }
  }, [user, router]);

  async function handleComplete(id: string, isChecked: boolean): Promise<void> {
    const { error } = await supabase.from('todos').update({ completed: isChecked }).eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    const updatedTodos = user.todos.map((todo) => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        completed: isChecked,
      }
    });

    setUser({ ...user, todos: updatedTodos });
  }

  async function handleDelete(id: string): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      alert(error.message);
      return;
    }

    const filteredTodos = user.todos.filter((todo) => todo.id !== id);

    setUser({ ...user, todos: filteredTodos });
  }

  async function handleCreateTask(event: FormEvent): Promise<void> {
    event.preventDefault();

    const { data, error } = await supabase.from('todos').insert({
      description: newTodo.description,
      date: new Date(newTodo.date),
      user_id: user?.id,
    }).single();

    if (error) {
      alert(error.message);
      return;
    }

    const todo = {
      id: data.id,
      description: data.description,
      date: new Date(data.date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      completed: data.completed,
    }

    setUser({ ...user, todos: [...user.todos, todo] })

    setNewTodo({ description: '', date: '' });
  }

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setNewTodo({
      ...newTodo,
      [event.currentTarget.name]: event.currentTarget.value
    });
  }

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
              {user?.todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  date={todo.date}
                  completed={todo.completed}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              ))}
            </ul>
          </main>

          <footer>
            <form onSubmit={handleCreateTask}>
              <input name="description" type="text" placeholder="Task description" required onChange={handleChange} />
              <input name="date" type="date" required onChange={handleChange} />
              <button type="submit">Add task</button>
            </form>
          </footer>
        </section>
      </div>
    </>
  );
}
