import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function Create() {
  const username = localStorage.getItem("username");
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const TinyMceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const handleEditorChange = (content, editor) => {
    setEditorContent(content);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinksChange = (event) => {
    setLinks(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !editorContent) {
      setError("Title and content are required.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // First, create the blog post
      const blogResponse = await axios.post(
        "https://blogapi-1jcl.onrender.com/blog/new",
        {
          title,
          author: username,
          links,
          tags,
          content: editorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": apiKey,
          },
        },
      );

      console.log("Blog creation response:", blogResponse);

      // If a thumbnail was selected, upload it
      if (thumbnail) {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("blogId", blogResponse.data.blog._id);

        const thumbnailResponse = await axios.post(
                    "https://blogapi-1jcl.onrender.com/blog/upload-thumbnail",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": apiKey,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        console.log("Thumbnail upload response:", thumbnailResponse);
      }

      alert("Blog created successfully!");
      setTitle("");
      setLinks("");
      setTags("");
      setEditorContent("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setError(null);
    } catch (error) {
      setError("Error creating blog: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="py-6 px-8">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800">
            Create New Blog Post
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your blog title"
            />
          </div>
          <div>
            <label
              htmlFor="links"
              className="block text-sm font-medium text-gray-700"
            >
              Links
            </label>
            <input
              type="text"
              name="links"
              id="links"
              value={links}
              onChange={handleLinksChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add relevant links"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add tags separated by commas"
            />
          </div>
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="sr-only"
              />
              <label
                htmlFor="thumbnail"
                className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>Upload a file</span>
              </label>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="ml-4 h-16 w-16 object-cover rounded-md"
                />
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <div className="mt-1">
              <Editor
                apiKey={TinyMceApiKey}
                initialValue=""
                init={{
                  height: 900,
                  width: "100%",
                  resize: false,
                  selector: "textarea",
                  menubar: true,
                  codesample_languages: [
                    { text: "HTML/XML", value: "markup" },
                    { text: "JavaScript", value: "javascript" },
                    { text: "CSS", value: "css" },
                    { text: "PHP", value: "php" },
                    { text: "Ruby", value: "ruby" },
                    { text: "Python", value: "python" },
                    { text: "Java", value: "java" },
                    { text: "C", value: "c" },
                    { text: "C#", value: "csharp" },
                    { text: "C++", value: "cpp" },
                  ],
                  plugins:
                    "codesample fullscreen wordcount code emoticons anchor image preview",
                  toolbar:
                    "fullscreen undo redo | backcolor forecolor bold italic | alignleft aligncenter alignright alignjustify | indent | codesample code | emoticons | anchor image",
                  content_style: "body { font-size: 24px; }",
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </>
              ) : (
                "Post Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Create;
