import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from './ui/badge';

const navLinks = [
  { href: 'https://snbdhost.com', label: 'Home', active: true },
  { href: 'https://snbdhost.com/shared-hosting', label: 'Hosting', dropdown: true },
  { href: 'https://snbdhost.com/n8n', label: 'N8N Automation Hosting' },
  { href: 'https://snbdhost.com/domain', label: 'Domain' },
  { href: 'https://snbdhost.com/bdix-vps', label: 'Servers', dropdown: true },
  { href: 'https://snbdhost.com/support', label: 'Support' },
  { href: 'https://snbdhost.com/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="w-full bg-white text-gray-800 border-b border-gray-200 sticky top-0 z-50">
      <div className="bg-red-600 text-white text-center p-2 text-xs font-medium">
        <p>
          Don&apos;t Hesitate to try us out.. Its FREE! Takes 1 Minute to sign up and Get 14 Days of FREE Singapore Premium Hosting!
        </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://snbdhost.com/wp-content/uploads/2025/05/Untitled-design-6.png"
                alt="SNBD Host Logo"
                width={120}
                height={40}
                priority
                className="h-auto w-auto"
              />
              <Badge variant="secondary">BETA</Badge>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`flex items-center text-sm font-medium transition-colors hover:text-red-600 ${link.active ? 'text-red-600' : 'text-gray-600'}`}>
                {link.label}
                {link.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-md text-sm">
              <a href="https://portal.snbdhost.com/clientarea.php">My Dashboard</a>
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex-grow mt-8">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                         <Link key={link.label} href={link.href} className={`flex items-center text-lg font-medium transition-colors hover:text-red-600 ${link.active ? 'text-red-600' : 'text-gray-600'}`}>
                          {link.label}
                          {link.dropdown && <ChevronDown className="w-5 h-5 ml-1" />}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-auto mb-8">
                     <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md text-lg">
                        <a href="https://portal.snbdhost.com/clientarea.php">My Dashboard</a>
                      </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
