import * as yup from 'yup';
import Head from "next/head";
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import api from "../services/api";
import styles from '../styles/pages/SignIn.module.css';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();


  const handleSignIn: SubmitHandler<FieldValues> = async (formData) => {
    try {
      const { data } = await api.post('/sessions', formData);
      console.log(data);
      // router.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>Tasks | Sign in</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.box}>
          <h1>✏️ Tasks | Sign in</h1>

          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                placeholder="name@mail.com"
                required
                {...register('email')}
              />
              {!!formState.errors.email && <small>{formState.errors.email.message}</small>}
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                required
                {...register('password')}
              />
              {!!formState.errors.password && <small>{formState.errors.password.message}</small>}
            </div>

            <button type="submit" disabled={formState.isSubmitting}>{formState.isSubmitting ? 'Signing in...' : 'Sign in'}</button>
          </form>

          <Link href="/signup">
            <a>Need an account?</a>
          </Link>
        </section>
      </div>
    </>
  );
}
