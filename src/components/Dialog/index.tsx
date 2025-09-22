import { Button } from "../Button";

type DialogProps = {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export const Dialog = ({
  content,
  disabled,
  onCancel,
  onConfirm,
  title,
}: DialogProps) => {
  const handleCloseDialog = () => {
    if (disabled) return;
    onCancel();
  };

  return (
    <div
      onClick={() => handleCloseDialog()}
      className="fixed inset-0 bg-black/50 backdrop:blur-xs flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-50 p-6 mx-6 rounded-xl flex flex-col gap-6 max-w-[42rem] text-slate-950 text-center"
      >
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-center">{content}</p>
        <div className="flex justify-around gap-6">
          <Button disabled={disabled} onClick={onCancel}>
            Cancelar
          </Button>
          <Button disabled={disabled} onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};
