import { ExternalLink } from "lucide-react";

export const RequestLink = () => {
  const requestFormUrl = "https://forms.gle/oksSCjeGbtUx1oH56";

  return (
    <a
      href={requestFormUrl}
      target="_blank"
      className="font-small flex flex-row items-center gap-1 text-primary underline underline-offset-4"
    >
      Request a product?
      <ExternalLink size={16} />
    </a>
  );
};
