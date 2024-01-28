import React from 'react'

function footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <nav
        className="flex justify-between p-4 text-dark"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        {/* First div with logo */}
        <div className="flex items-center">
          <img
            src="/path/to/your/logo.png"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span className="text-lg font-bold">Blog</span>
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