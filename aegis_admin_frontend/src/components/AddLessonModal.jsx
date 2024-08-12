// src/components/AddLessonModal.js
import React, { useState } from "react";

export default function AddLessonModal({ onClose, onSubmit }) {
  const [isVideo, setIsVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTypeChange = (event) => {
    const { name, checked } = event.target;
    if (name === "video") {
      setIsVideo(checked);
    }
  };

  const handleVideoLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const reformatYouTubeLink = (link) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return link;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lessonContent = isVideo ? reformatYouTubeLink(videoLink) : content;

    const newLesson = {
      title,
      content: lessonContent,
      type: isVideo ? "Video" : "Text",
    };

    if (!newLesson.title || !newLesson.content) {
      alert("All fields are required.");
      return;
    }

    onSubmit(newLesson);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Lesson</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter lesson title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Lesson Type
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="text"
                name="text"
                checked={!isVideo}
                onChange={() => setIsVideo(false)}
                className="mr-2"
              />
              <label htmlFor="text" className="mr-4">
                Text
              </label>
              <input
                type="checkbox"
                id="video"
                name="video"
                checked={isVideo}
                onChange={handleTypeChange}
                className="mr-2"
              />
              <label htmlFor="video">
                Video
              </label>
            </div>
          </div>
          {isVideo ? (
            <div className="mb-4">
              <label htmlFor="videoLink" className="block text-gray-700 font-semibold mb-2">
                YouTube Link
              </label>
              <input
                type="text"
                id="videoLink"
                name="videoLink"
                placeholder="Enter YouTube link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={videoLink}
                onChange={handleVideoLinkChange}
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                Lesson Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter lesson content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  h-56"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Add Lesson
            </button>
            <button
              type="button"
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
