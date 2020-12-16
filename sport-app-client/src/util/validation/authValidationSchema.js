import * as Yup from 'yup'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from "../../constants";

export const signInValidationSchema = Yup.object({
  username: Yup.string().required("Nazwa użytkownika jest wymagana"),
  password: Yup.string().required("Hasło jest wymagane")
});

export const signUpValidationSchema = Yup.object({
  username: Yup.string()
  .min(USERNAME_MIN_LENGTH, `Nazwa użytkownika nie może być krótsza niż ${USERNAME_MIN_LENGTH} znaki`)
  .max(USERNAME_MAX_LENGTH, `Nazwa użytkownika nie może być dłuższa niż ${USERNAME_MAX_LENGTH} znaków`)
  .required("Nazwa użytkownika jest wymagana"),
  email: Yup.string().email().required("E-mail jest wymagany"),
  password: Yup.string()
  .min(PASSWORD_MIN_LENGTH, `Hasło musi zawierać conajmniej ${PASSWORD_MIN_LENGTH} znaków`)
  .max(PASSWORD_MAX_LENGTH, `Hasło nie może być dłuższe niż ${PASSWORD_MAX_LENGTH} znaków`)
  .required("Hasło jest wymagane"),
  passwordConfirm: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać'),
  acceptTerms: Yup.boolean().oneOf([true], 'Zaakceptuj regulamin')
});