import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const navigation = {
  project: [
    { label: 'The Project',    href: '/the-project'   },
    { label: 'Carbon Credits', href: '/carbon'        },
    { label: 'Who We Serve',   href: '/the-project#who-we-serve' },
    { label: 'Partner portal', href: '/auth/login'    },
  ],
  company: [
    { label: 'About',   href: '/about'   },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy',    href: '/privacy-policy'    },
    { label: 'Terms of Service',  href: '/terms-of-service'  },
  ],
}

const socials = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/supacaresolutions/', label: 'LinkedIn'  },
  { icon: Twitter,   href: 'https://twitter.com/supacareltd',                    label: 'Twitter'   },
  { icon: Facebook,  href: 'https://www.facebook.com/supacaresolutions',         label: 'Facebook'  },
  { icon: Instagram, href: 'https://www.instagram.com/supacaresolutions',        label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-[#061209] text-white/60 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/supalogo.webp"
              alt="Supacare"
              width={140}
              height={40}
              className="h-9 w-auto object-contain mb-5 brightness-0 invert opacity-90"
            />
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Partnering with communities across Kenya to manage solid waste,
              create livelihoods, and generate verified climate impact.
            </p>
            <div className="flex items-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/40 hover:text-green-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* The Project */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
              The Project
            </p>
            <ul className="space-y-3">
              {navigation.project.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
              Company
            </p>
            <ul className="space-y-3 mb-8">
              {navigation.company.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                contact@supacare.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                +254 720 096 680
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Supacare Solutions Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            <span>Gold Standard implementation in progress</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
