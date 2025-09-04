type SafeMarkdownProps = {
  markdown: string;
};

export const SafeMarkdown = ({ markdown }: SafeMarkdownProps) => {
  return <div>{markdown}</div>;
};
