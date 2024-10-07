import React from "react";

interface HorizontalCardsProps {
  title: string;
  content: string;
}

const HorizontalCards = ({ content, title }: HorizontalCardsProps) => {
  return (
    <div className="border rounded-sm mb-3 p-2 pl-4 border-e-purple-900">
      <div className="font-bold text-sm mb-1 capitalize">{title}</div>
      <div className="font-light text-sm capitalize">{content}</div>
    </div>
  );
};

export default HorizontalCards;
