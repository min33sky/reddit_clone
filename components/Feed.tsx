import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/query';
import { Post as PostType } from '../types/reddit';
import Post from './Post';
import { Jelly } from '@uiball/loaders';

function Feed({ topic }: { topic?: string }) {
  const { data, error, loading } = useQuery(topic ? GET_ALL_POSTS_BY_TOPIC : GET_ALL_POSTS, {
    variables: {
      topic,
    },
  });

  const posts: PostType[] = topic ? data?.getPostListByTopic : data?.getPostList;

  if (loading)
    return (
      <div className="flex w-full items-center justify-center p-10 text-left">
        <Jelly size={50} color="#FF4501" />
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
