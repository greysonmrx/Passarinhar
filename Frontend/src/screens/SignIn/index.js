import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import { signInRequest } from "../../store/modules/auth/actions";

import logo from "../../assets/logo.jpg";

import { Button } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
});

export default function SignIn() {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Passarinhar" width="200" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <Button type="submit" disabled={loading}>
          {!loading ? "Entrar" : "Carregando..."}
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    </>
  );
}
