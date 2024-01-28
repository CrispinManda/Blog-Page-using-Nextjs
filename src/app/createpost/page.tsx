"use client";
import { useState } from "react";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import axios from 'axios'
import Navbar from "../Component/Navbar";

interface BlogPost {
  title?: string;
  date?: string;
  slug?: string;
  content?: string;
}

const CreatePost: React.FC = () => {


    const [file,setFile]= useState(null)
const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date:"",
    slug:"",
    file:""

  });

  

const uploadFile = (file:any | null) => async () => {
    try {
      console.log("i am uploading ",file);
      

      // Make an API call to upload the file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "f3gqwyzn");
      formData.append("cloud_name", "dqquyjsap");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqquyjsap/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    
       setFormData((prevData) => ({
         ...prevData,
         file: response.data.secure_url,
       }));

      // Return the secure_url
      return response.data.secure_url;
    } catch (error) {
      // Dispatch failure action with the error message
      console.log(error);
      
      // Return null in case of failure
      return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch the existing blog data
      const response = await axios.get("http://localhost:4200/posts");
      const existingBlogData: BlogPost[] = response.data;

      // Check if a post with the same title exists
      const existingPost = existingBlogData.find(
        (post) => post.title === formData.title
      );

      if (existingPost) {
        // Display an error message if a post with the same title exists
        setError("A post with the same title already exists.");
        setMessage(null); // Clear the success message
      } else {
        // Submit the form if the title doesn't exist
        await axios.post("http://localhost:4200/posts", formData);

        // Display a success message on successful submission
        setMessage("Form submitted successfully.");
        setError(null); // Clear the error message

        // Clear the form data
        setFormData({
          title: "",
          content: "",
          date: "",
          slug: "",
          file: "",
        });
      }
    } catch (error) {
      // Display an error message if the submission or fetching data fails
      setMessage("Failed to submit the form.");
      setError("An error occurred.");
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div className="container mx-auto ">
      <Navbar />

      <div
        className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md "
        style={{ marginTop: "50px", width: "704px" }}
      >
        {(error || message) && (
          <div className={`mb-4 p-2 ${error ? "bg-red-200" : "bg-green-200"}`}>
            {error || message}
          </div>
        )}
        <h4 className="text-2xl font-bold mb-4">Create Blog Post</h4>
        <p>Enter your blog detailshere. Click save when you're done.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4  ">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Harry Potter"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-600"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-600"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Harry Potter"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>

            <StyledDropZone
              onDrop={async (file: any, text: any) => {
                console.log("file is ", file);
                const formD = new FormData();
                formD.append("file", file);
                formD.append("upload_preset", "f3gqwyzn");
                formD.append("cloud_name", "dqquyjsap");

                const response = await axios.post(
                  "https://api.cloudinary.com/v1_1/dqquyjsap/image/upload",
                  formD,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log("file uploaded");

                setFormData((prevData) => ({
                  ...prevData,
                  file: response.data.secure_url,
                }));
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Text"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className=" text-white px-4 py-2 rounded-md "
            style={{ backgroundColor: "#8E8E8E" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
