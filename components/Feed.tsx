import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS } from '../graphql/query';
import { Post as PostType } from '../types/reddit';
import Post from './Post';

function Feed() {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  const posts: PostType[] = data?.getPostList;

  if (loading)
    return (
      <div>
        <p>Loading....</p>
      </div>
    );

  return (
    <ul className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default Feed;
