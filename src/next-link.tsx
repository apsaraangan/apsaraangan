import React from "react";
import { Link as RouterLink } from "react-router";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, children, className }: LinkProps) {
  return (
    <RouterLink to={href} className={className}>
      {children}
    </RouterLink>
  );
}
