import ContactHeader from '@/components/contact/ContactHeader'
import ContactBody   from '@/components/contact/ContactBody'

export const metadata = {
  title: 'Contact | Supacare Solutions',
  description: 'Get in touch with Supacare Solutions — partnerships, carbon credit enquiries, media, or general questions.',
}

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <ContactHeader />
      <ContactBody />
    </main>
  )
}
