
Project Title: Next.js Blog 

Overview

This Next.js project is a Blog  that allows users to view a list of blog posts, read individual blog posts, and search for specific posts. The project uses JSON Server to store blog data and implements features such as pagination, responsive design, and error handling.

Features
Blog Home Page:

Displays a list of blog posts.
Each post shows the title, publication date, and a brief excerpt.
Styled using Tailwind CSS.
Blog Post Page:

Dynamic route for individual blog posts (e.g., /posts/[slug]).
Displays the full content of a blog post.
Includes a back button to navigate back to the homepage.
Styled using Tailwind CSS.
Blog Data:

Blog data is stored in the blogData.js file as an array of sample blog posts.
Each post has properties like title, date, slug, and content.
Responsive Design:

Ensures the application is responsive and visually appealing on various screen sizes.
Utilizes Tailwind CSS classes for responsiveness.
Pagination :

Implements pagination on the homepage.
Limits the number of posts displayed per page.
Search Functionality :

Allows users to search for blog posts based on keywords.
Provides a search bar for users to input their search queries.
Installation
Clone the repository:

git clone https://github.com/CrispinManda/Blog-Page-using-Nextjs.git
Navigate to the project directory:

cd nextjs-blog-management
Install dependencies:

npm install

Start the JSON server:
$ json-server  blogData.json -p 4200

Start the Next.js application:

npm run dev
The application will be running on http://localhost:3000.

Usage
Open your browser and go to http://localhost:3000.
Explore the homepage, read individual blog posts, and use the search functionality.
Pagination is implemented to navigate through different sets of blog posts.
Folder Structure
pages/index.tsx: Homepage displaying a list of blog posts with pagination.
pages/posts/[slug].tsx: Dynamic route for individual blog posts.
components/: Reusable React components for the UI.
styles/: Tailwind CSS styles and utility classes.
data/blogData.js: File storing sample blog data.
Bonus Features Implementation
Pagination
Pagination is implemented on the homepage to display a limited number of posts per page. Users can navigate through different pages to explore more blog posts.

Search Functionality
A search bar is provided to allow users to search for specific blog posts based on keywords. The application filters and displays relevant results in real-time.

Accessibility
The application has been designed with accessibility in mind, ensuring a positive user experience for all users.

GitHub Repository
https://github.com/CrispinManda/

Feel free to explore and customize the code according to your needs. If you encounter any issues or have questions, please talk to me via email crispinmanda06@gmail.com Happy coding!