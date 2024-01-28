"use client"
import { useEffect, useState } from "react";
import axios from "axios";

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
        const response = await axios.get(
          `http://localhost:4200/posts`
        );

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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
       
          <div
            key={post.slug}
            className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
          >
            {/* Replace the link with your dynamic route */}
           
              <img className="rounded-t-lg" src={post.file} alt={post.title} />
            
            <div className="p-5">
             
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                  {post.title}
                </h5>
              
              <p className="font-normal text-gray-700 mb-3">
                {post.content}
              </p>
            </div>
          </div>
      
      </div>
    </div>
  );
}
