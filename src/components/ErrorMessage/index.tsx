type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: string;
};

export default function ErrorMessage({
  content,
  contentTitle,
  pageTitle,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div className="min-h-[320px] bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 mb-16 p-8 rounded-xl flex items-center justify-center text-center">
        <div>
          <h1 className="text-7xl/tight mb-4 font-extrabold">{contentTitle}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}
