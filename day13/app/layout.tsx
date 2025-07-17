import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo/Brand */}
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-white">
                    Product Store
                  </h1>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
}
