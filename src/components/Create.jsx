import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", { title, links, tags, editorContent });
    // Perform additional logic like sending data to backend, etc.
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl text-3xl mx-auto my-20 border-2 border-solid border-gray-300 p-6 bg-white rounded shadow-lg">
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
                height: 570,
                width: "100%",
                resize: false,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help",
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

