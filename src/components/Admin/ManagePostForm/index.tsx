import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";

export const ManagePostForm = () => {
  return (
    <form className="flex flex-col gap-6">
      <InputText labelText="Nome" />
      <InputText labelText="Sobrenome" />
      <InputText labelText="Nome" />
      <InputText labelText="Sobrenome" />
      <Button className="w-full mt-6" variant="default" size="md">
        Enviar
      </Button>
    </form>
  );
};
