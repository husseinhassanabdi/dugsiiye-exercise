import React, { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      content:
        'React is a JavaScript library used to build interactive user interfaces. In this article, you will learn about components, JSX, props, and state.',
    },
    {
      id: 2,
      title: 'Understanding React Router',
      content:
        'React Router allows us to create multiple pages and navigate between them without refreshing the browser. This article explains routes, links, parameters, and nested routes.',
    },
    {
      id: 3,
      title: 'React Hooks in Depth',
      content:
        'React Hooks allow function components to use state and other React features. This article introduces useState, useEffect, useContext, and common Hook patterns.',
    },
  ]);

  // const addPost = (post) => {
  //   setPosts((previousPosts) => [
  //     ...previousPosts,
  //     {
  //       ...post,
  //       id:
  //         previousPosts.length > 0
  //           ? Math.max(...previousPosts.map((item) => item.id)) + 1
  //           : 1,
  //     },
  //   ]);
  // };
  const addPost = (post) => {
  setPosts((previousPosts) => [
    ...previousPosts,
    {
      ...post,
      id:
        previousPosts.length > 0
          ? Math.max(...previousPosts.map((item) => item.id)) + 1
          : 1,
    },
  ]);
};

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
};