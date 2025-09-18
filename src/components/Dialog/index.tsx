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
          <button
            disabled={disabled}
            onClick={onCancel}
            className="bg-slate-400 text-slate-50 font-extrabold py-3 px-7 rounded-xl  hover:bg-slate-600 cursor-pointer transition duration-150 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            disabled={disabled}
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition duration-150 text-slate-50 font-extrabold py-3 px-7 rounded-xl  disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
