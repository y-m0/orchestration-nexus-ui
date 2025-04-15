
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground w-full transition-colors duration-300">
      <main className="container mx-auto p-8">
        {children}
      </main>
    </div>
  );
}
