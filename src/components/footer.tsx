import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  account: [
    { href: 'https://portal.snbdhost.com/submitticket.php', label: 'Open Ticket' },
    { href: 'https://portal.snbdhost.com/knowledgebase', label: 'Knowledgebase' },
    { href: 'https://portal.snbdhost.com/clientarea.php?action=invoices', label: 'Invoices' },
    { href: 'https://portal.snbdhost.com/clientarea.php?action=details', label: 'Account Settings' },
    { href: 'https://portal.snbdhost.com/clientarea.php?action=services', label: 'My Services' },
  ],
  legals: [
    { href: 'https://snbdhost.com/terms-of-service', label: 'Terms of Service' },
    { href: 'https://snbdhost.com/privacy-policy', label: 'Privacy & Protection' },
    { href: 'https://snbdhost.com/domain-registration-agreement', label: 'Domain Policy' },
  ],
  support: [
    { href: 'https://snbdhost.com/support', label: 'Live Support' },
    { href: 'https://portal.snbdhost.com/submitticket.php', label: 'Open a Ticket' },
    { href: 'https://snbdhost.com/contact', label: 'Contact Us' },
  ],
};

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <li>
    <Link href={href} className="text-gray-600 hover:text-red-600 transition-colors duration-300">
      {label}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="mb-6">
                <Link href="/">
                    <Image
                      src="https://snbdhost.com/wp-content/uploads/2025/05/Untitled-design-6.png"
                      alt="SNBD Host Logo"
                      width={160}
                      height={45}
                      className="h-auto"
                    />
                </Link>
              </div>
              <div className="text-gray-600 pr-8">
                <p className="mb-4">
                  SNBD HOST proudly delivers dependable, high-speed web hosting powered by our state-of-the-art data center in Bangladesh.
                </p>
                <p>
                  Purpose-built to support the vision of Bangladeshi entrepreneurs, developers, and businesses, our infrastructure ensures ultra-low latency, enterprise-grade data protection, and dedicated local support — available 24/7.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-headline font-semibold text-gray-900 mb-4">My Account</h3>
                <ul className="space-y-3">
                  {footerLinks.account.map(link => <FooterLink key={link.label} {...link} />)}
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold text-gray-900 mb-4">Legals</h3>
                <ul className="space-y-3">
                  {footerLinks.legals.map(link => <FooterLink key={link.label} {...link} />)}
                </ul>
              </div>
              <div>
                <h3 className="font-headline font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  {footerLinks.support.map(link => <FooterLink key={link.label} {...link} />)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 text-center">
          <p className="text-sm text-gray-500">
            Copyright 2020-2025 <Link href="https://snbdhost.com" className="text-red-600 font-semibold hover:underline">SNBD HOST</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}