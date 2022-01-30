import * as yup from 'yup';
import Head from "next/head";
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import api from "../services/api";
import styles from '../styles/pages/SignUp.module.css';
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('You must confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();

  const handleSignUp: SubmitHandler<FieldValues> = async (formData) => {
    try {
      await api.post('/users', formData);
      alert('Account created successfully! Redirecting back to Sign In page...');
      router.push('/signin');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>Tasks | Sign up</title>
      </Head>
      <div className={styles.container}>
        <section className={styles.box}>
          <h1>✏️ Tasks | Sign up</h1>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Full name"
                required
                {...register('name')}
              />
              {!!formState.errors.name && <small>{formState.errors.name.message}</small>}
            </div>

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

            <div className={styles.field}>
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="********"
                required
                {...register('confirmPassword')}
              />
              {!!formState.errors.confirmPassword && <small>{formState.errors.confirmPassword.message}</small>}
            </div>

            <button type="submit" disabled={formState.isSubmitting}>{formState.isSubmitting ? 'Submitting...' : 'Submit'}</button>
          </form>

          <Link href="/signin">
            <a>Already have an account?</a>
          </Link>
        </section>
      </div>
    </>
  );
}
