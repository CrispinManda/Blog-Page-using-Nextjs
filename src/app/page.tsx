"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "./Component/Navbar";
import { Pagination } from "flowbite-react";
// import footer from "@/app/Component/footer";
import Footer from "@/app/Component/footer";
interface BlogPost {
  title: string;
  date: string;
  slug: string;
  content: string;
  file: string;
}

const Home: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [filteredBlogData, setFilteredBlogData] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`http://localhost:4200/posts`);
    const allPosts: BlogPost[] = response.data;

    // Sort the posts by date in descending order
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    setBlogData(sortedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
};

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setFilteredBlogData(filterBlogData());
  }, [searchQuery, blogData]);

  const filterBlogData = () => {
    if (!searchQuery.trim()) {
      return blogData;
    } else {
      const filteredPosts = blogData.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredPosts);

      return filteredPosts;
    }
  };

  const handleCallback = (childData: any) => {
    setSearchQuery(childData);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredBlogData.length / postsPerPage);

  console.log("TOTAL PAGES IS ", totalPages);

  return (
    <>
      <Navbar onSearchQueryChange={(query) => handleCallback(query)} />
      <div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 mt-10">
            The Accessibility Blog <br />{" "}
            <span className="text-sm	text-muted">The voice of the excluded</span>
          </h1>
          {/* <p>The voice of the excluded</p> */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {currentPosts.map((post: BlogPost) => (
              <div
                key={post.slug}
                className="shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
                style={{ backgroundColor: "#E8E8E8" }}
              >
                <Link href={`/posts/${post.slug}`}>
                  <img
                    className="rounded-t-lg "
                    src={post.file}
                    alt={post.title}
                  />
                </Link>
                <div className="p-5">
                  <Link href={`/posts/${post.slug}`}>
                    <h6 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                      {post.title}
                    </h6>
                  </Link>
                  <p className="font-normal text-gray-700 mb-3">
                    {post.content.slice(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center hello">
            <Pagination className="ps"
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBlogData.length / postsPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
