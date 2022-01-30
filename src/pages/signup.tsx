import Head from "next/head";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../styles/pages/SignUp.module.css';

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

  const handleSignUp: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData);
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
