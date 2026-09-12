import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsContext';

function Home() {
  const { posts } = useContext(PostsContext);
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-xl bg-white p-8 shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Blog Posts
            </h1>

            <p className="mt-2 text-gray-500">
              Read our latest articles and tutorials.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search posts"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button
              type="button"
              className="rounded-md bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="block rounded-lg border border-gray-200 p-5 transition hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                >
                  <h2 className="text-lg font-semibold text-blue-600">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {post.content}
                  </p>

                  <span className="mt-3 inline-block text-sm font-medium text-blue-700">
                    Read more →
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">
                No posts found.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;