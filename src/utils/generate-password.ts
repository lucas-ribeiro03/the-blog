import { hashPassword } from "@/lib/login/manage-login";

(async () => {
  const password = "123456"; //Crie sua senha aqui
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword); //Copie a senha aqui e cole no .env.local.LOGIN_PASS
})();
