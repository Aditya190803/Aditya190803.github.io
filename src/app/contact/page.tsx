import { Contact } from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Aditya Mer',
  description: 'Get in touch — let\'s build something interesting together.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 md:pt-32">
      <Contact />
    </main>
  );
}
