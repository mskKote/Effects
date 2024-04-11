"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./Auth.module.scss";
import { Link } from "@lib/navigation";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert(JSON.stringify(data));
    // Добавьте здесь логику для отправки данных на сервер или обработки введенных данных
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Логин"
        className={styles.input}
        {...register("email", { required: true })}
      />

      <input
        type="password"
        placeholder="Пароль"
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
      </div>

      <Link href="/registration" className={styles.registrationLink}>
        Регистрация
      </Link>
    </form>
  );
};

export default LoginForm;
