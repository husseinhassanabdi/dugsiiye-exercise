import React, { useContext, useState } from 'react';
import { PostsContext } from '../context/PostsContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { addPost } = useContext(PostsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    addPost({
      title: title.trim(),
      content: content.trim(),
    });

    navigate('/');
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Create a New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter post title"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block font-semibold text-gray-700"
              >
                Content
              </label>

              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your post content"
                rows={7}
                required
                className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Create Post
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default CreatePost;