import type { ComponentPropsWithRef } from "react";

export const UmbrellaIcon = ({ ...props }: ComponentPropsWithRef<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M22 12a10 10 0 0 0-20 0Z" />
    <path d="M12 12v6a2 2 0 0 0 4 0" />
  </svg>
);
