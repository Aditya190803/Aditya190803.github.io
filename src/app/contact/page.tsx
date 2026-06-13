import { Contact } from '@/components/sections/Contact';
import { PageShell } from '@/components/layout/PageShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Aditya Mer',
  description: "Get in touch — let's build something interesting together.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}