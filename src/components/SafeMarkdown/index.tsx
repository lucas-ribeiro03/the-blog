import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string;
};

export const SafeMarkdown = ({ markdown }: SafeMarkdownProps) => {
  return (
    <div className="w-full max-w-none overflow-hidden prose-a:text-blue-500 prose-a:hover:text-blue-700 prose-a:transition prose-img:mx-auto md:prose-lg">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return "";
            return (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]" {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
