import React from "react";

interface PolicyListProps {
  items: React.ReactNode[];
  isNoSpace?: boolean;
  className?: string; // optional custom styles
}

const ListItem: React.FC<PolicyListProps> = ({
  items,
  className = "",
  isNoSpace = false,
}) => {
  return (
    <ul
    className={`list-disc pl-8  text-policy-text font-figTree ${
      isNoSpace ? "" : "mb-14"
    } ${className}`}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ListItem;
