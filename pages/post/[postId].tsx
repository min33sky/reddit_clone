import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/query';
import { Post as PostType } from '../../types/reddit';

function PostDetail() {
  const {
    query: { postId },
  } = useRouter();

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });

  const post: PostType = data?.getPostByPostId;

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
    </div>
  );
}

export default PostDetail;
