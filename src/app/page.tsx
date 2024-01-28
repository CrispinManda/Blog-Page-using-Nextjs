"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "./Component/Navbar";
import { Pagination } from "flowbite-react";

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
      const response = await axios.get(
        `http://localhost:4200/posts?_page=${page}&_limit=${postsPerPage}`
      );
      setBlogData(response.data);
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

  return (
    <>
      <Navbar onSearchQueryChange={(query) => handleCallback(query)} />
      <div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {currentPosts.map((post: BlogPost) => (
              <div
                key={post.slug}
                className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
              >
                <Link href={`/posts/${post.slug}`}>
                  <img
                    className="rounded-t-lg"
                    src={post.file}
                    alt={post.title}
                  />
                </Link>
                <div className="p-5">
                  <Link href={`/posts/${post.slug}`}>
                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                      {post.title}
                    </h5>
                  </Link>
                  <p className="font-normal text-gray-700 mb-3">
                    {post.content.slice(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredBlogData.length / postsPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
