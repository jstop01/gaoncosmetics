import { Contact } from '../components/Contact';

interface ContactPageProps {
  onAdminAccess: () => void;
}

export function ContactPage({ onAdminAccess }: ContactPageProps) {
  return <Contact onAdminAccess={onAdminAccess} />;
}
