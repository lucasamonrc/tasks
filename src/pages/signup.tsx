import Head from "next/head";
import Link from "next/link";

import styles from '../styles/pages/SignUp.module.css';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Tasks | Sign up</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.box}>
          <h1>✏️ Tasks | Sign up</h1>

          <form>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" placeholder="Full name" required />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" placeholder="name@mail.com" required />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input type="password" placeholder="********" required />
            </div>

            <div className={styles.field}>
              <label>Confirm password</label>
              <input type="password" placeholder="********" required />
            </div>

            <button type="submit">Submit</button>
          </form>

          <Link href="/signin">
            <a>Already have an account?</a>
          </Link>
        </section>
      </div>
    </>
  );
}
