'use client'

import { Toaster } from 'sonner';

import { PropsWithChildren } from "react"

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}