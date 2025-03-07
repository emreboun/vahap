import React from "react";

interface Props {
  base64Html: string;
}

const HtmlRenderer: React.FC<Props> = ({ base64Html }) => {
  const decodedHtml = Buffer.from(base64Html, "base64")
    .toString("utf-8")
    .replaceAll(` type="hidden"`, ``);

  return (
    <div
      style={{ minWidth: 300, minHeight: 300 }}
      dangerouslySetInnerHTML={{ __html: decodedHtml }}
    />
  );
};

export default HtmlRenderer;
