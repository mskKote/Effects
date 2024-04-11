"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Auth.module.scss";
import { Link } from "@lib/navigation";

const registrationFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof registrationFormSchema>;

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(registrationFormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(JSON.stringify(data));
    // TODO: Auth via Firebase & Auth.js
  };

  return (
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
          Войти
        </button>
        <button type="button" className={styles.button}>
          Войти с помощью Google
        </button>
        <button type="button" className={styles.button}>
          Войти с помощью Github
        </button>

        <Link href="/login" className={styles.registrationLink}>
          логин
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
