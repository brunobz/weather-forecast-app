import type { ComponentPropsWithRef } from "react";

export const LocationIcon = ({ ...props }: ComponentPropsWithRef<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21c-4-4-6-7-6-10a6 6 0 1112 0c0 3-2 6-6 10z"
    />
  </svg>
);
