import Head from "next/head";
import Link from "next/link";

import styles from '../styles/pages/SignIn.module.css';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Tasks | Sign in</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.box}>
          <h1>✏️ Tasks | Sign in</h1>

          <form>
            <div className={styles.field}>
              <label>Email</label>
              <input type="text" placeholder="name@mail.com" required />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input type="password" placeholder="********" required />
            </div>

            <button type="submit">Add task</button>
          </form>

          <Link href="/signup">
            <a>Need an account?</a>
          </Link>
        </section>
      </div>
    </>
  );
}
