import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
// Add this function to retrieve the authenticated user's information

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://blogapi-production-fb2f.up.railway.app/user/auth/status",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve user information");
  }
};

function Create() {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState("");
  const [tags, setTags] = useState("");
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = await getUser(); // Retrieve the authenticated user's information
      const author = user.username; // Extract the username from the user object
      const response = await axios.post(
        "https://blogapi-production-fb2f.up.railway.app/blog/new",
        {
          title,
          links,
          tags,
          content: editorContent,
          author, // Add the author field to the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Blog created successfully!");
    } catch (error) {
      alert("Error creating blog: " + error.message);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl text-2xl mx-auto my-20 border-2 border-solid border-gray-300 p-6 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full border-2 border-solid border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="links" className="block mb-1">
              Links:
            </label>
            <input
              type="text"
              name="links"
              id="links"
              value={links}
              onChange={handleLinksChange}
              className="w-full border-2 border-solid border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block mb-1">
              Tags:
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              className="w-full border-2 border-solid border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-1">
              Content:
            </label>
            <Editor
              apiKey={apiKey}
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
                  "codesample wordcount code emoticons anchor image preview",
                toolbar:
                  "undo redo | preview wordcount | bold italic | alignleft aligncenter alignright justify | indent | codesample code | emoticons | anchor image",
                content_style: "body { font-size: 24px; }",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
