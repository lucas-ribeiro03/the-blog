"use server";

import { verifyPassword } from "@/lib/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";

type LoginActionState = {
  username: string;
  error: string;
};

export const loginAction = async (
  state: LoginActionState,
  formData: FormData
) => {
  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      error: "Dados inválidos",
    };
  }

  const username = formData.get("username")?.toString().trim() || undefined;
  const password = formData.get("password")?.toString().trim() || undefined;

  if (!username || !password) {
    return {
      username: "",
      error: "Digite o usuário e a senha",
    };
  }

  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || ""
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username: "",
      error: "Usuário ou senha inválidos",
    };
  }

  return {
    username: "",
    error: "SUCESSO",
  };
};
