import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/query';
import { Post as PostType } from '../../types/reddit';

function PostDetail() {
  const {
    query: { postId },
  } = useRouter();

  const { data: session } = useSession();

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });

  const post: PostType = data?.getPostByPostId;

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      {/* 댓글창 */}
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form className="flex flex-col space-y-2">
          <textarea
            disabled={!session}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
            placeholder={session ? 'What are you thoughts?' : 'Please Sign In to comment'}
          />

          <button
            type="submit"
            disabled={!session}
            className="rounded-full bg-red-500 p-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
