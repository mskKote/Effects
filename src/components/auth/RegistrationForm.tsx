"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Auth.module.scss";
import { Link } from "@lib/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGithub,
  signInWithGoogle,
} from "@lib/firebase/auth";

const registrationFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof registrationFormSchema>;

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(registrationFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    alert(JSON.stringify(data));
    await createUserWithEmailAndPassword(data.email, data.password);
    // TODO: перекинуть на логин или сразу пустить
  };

  const RegisterViaGoogle = async () => await signInWithGoogle();
  const RegisterViaGithub = async () => await signInWithGithub();

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Логин"
          autoComplete="email"
          className={styles.input}
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Пароль"
          autoComplete="new-password"
          className={styles.input}
          {...register("password", { required: true })}
        />

        <div className={styles.buttons}>
          <button type="submit" className={styles.button}>
            Зарегаться
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={RegisterViaGoogle}
          >
            Зарегаться с помощью Google
          </button>
          {/* // TODO add Github provider */}
          {/* // TODO: i18n */}
          <button
            type="button"
            className={styles.button}
            onClick={RegisterViaGithub}
          >
            Зарегаться с помощью Github
          </button>

          {/* //TODO i18n ссылку */}
          <Link href="/login" className={styles.registrationLink}>
            К логину
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
