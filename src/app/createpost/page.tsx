"use client";
import { useState } from "react";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import axios from 'axios'


const CreatePost: React.FC = () => {


    const [file,setFile]= useState(null)
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
    console.log("i am submiting");
 try {
   await axios.post("http://localhost:4200/posts", formData);

   console.log("Form submitted:", formData);
 } catch (error) {
   console.error("Error submitting form:", error);
 }
 
};


  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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

            <StyledDropZone onDrop={async (file: any, text: any) => {
                console.log("file is ",file);
                 const formD = new FormData();
                 formD.append("file", file);
                 formD.append("upload_preset", "f3gqwyzn");
                 formD.append("cloud_name", "dqquyjsap");
                console.log("form data appended");
                    
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
                console.log("done");
                
            }} />
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
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
