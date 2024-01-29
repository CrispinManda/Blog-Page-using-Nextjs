"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/Component/Navbar";
import { link } from "fs";
import { Footer } from "flowbite-react";
import footer from "@/app/Component/footer";

interface BlogPost {
  file: string | undefined;
  title: string;
  content: string;
  date: string;
  slug: string;
}
// Import statements remain the same

export default function Page({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/posts`);

        // Find the post with the matching slug
        const foundPost = response.data.find(
          (post: BlogPost) => post.slug === params.slug
        );
        console.log("found post is ", foundPost);

        // If the post is found, set it; otherwise, set to null
        setPost(foundPost || null);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (!post) {
    // Handle loading or not found state
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex items-center mb-4">
          <Link className="mt-10 text-black " href="/" passHref>
            <button className="flex items-center text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to blog posts
            </button>
          </Link>
        </div>
        <h1 className="text-4xl text-center font-bold mb-4">{post.title}</h1>
        <div className="mb-4">
          <p className="text-gray-600 text-sm text-center">
            {post.date} {/* Assuming `date` is the property for date posted */}
          </p>
        </div>
        <img
          src={post.file}
          alt={post.title}
          className="w-full object-contain	 rounded-lg mb-4"
          style={{ height: "366px", width: "1168px" }}
        />
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-5">
          <p className="font-normal text-gray-700">{post.content}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

