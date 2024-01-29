import Link from 'next/link';
import React from 'react'

function footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <nav
        className="flex justify-between p-4 text-dark"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        {/* First div with logo and home link */}
        <div className="flex items-center">
          <Link href="/" passHref>
            <span className="flex items-center">
              <img
                src="https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="text-lg font-bold">Blog</span>
            </span>
          </Link>
        </div>

        {/* Second div with Blog, search bar, and create blog post button */}
        <div className="flex items-center space-x-4">
          <h3 className="text-lg">Copyright @2023 . BlogPost</h3>
        </div>
      </nav>
    </footer>
  );
}

export default footer