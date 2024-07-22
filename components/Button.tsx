"use client";

import { MouseEventHandler, ReactNode, useState } from "react";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-full bg-[--accent-1] hover:bg-[--foreground-2]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered ? <FaArrowRight /> : <FaChevronRight />}
    </button>
  );
}
