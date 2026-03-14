import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), "className", "style"],
    img: [...(defaultSchema.attributes?.img ?? []), "src", "alt", "style"],
    span: [...(defaultSchema.attributes?.span ?? []), "className", "style"],
  },
  tagNames: [...(defaultSchema.tagNames ?? []), "div", "span", "br", "img"],
};

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={`zaurus-detail ${className ?? ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={{
          a: ({ children, href, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
              <svg
                className="external-link-icon"
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2h8v8M14 2L6 10" />
              </svg>
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
