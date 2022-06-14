import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/query';
import { Post as PostType } from '../../types/reddit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADD_COMMENT } from '../../graphql/mutation';
import toast from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago';

type FormData = {
  comment: string;
};

function PostDetail() {
  const {
    query: { postId },
  } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const { data: session } = useSession();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId'],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  });

  const post: PostType = data?.getPostByPostId;

  const onSubmit: SubmitHandler<FormData> = async ({ comment }) => {
    const notification = toast.loading('Posting your comment...');

    await addComment({
      variables: {
        post_id: postId,
        username: session?.user?.name,
        text: comment,
      },
    });

    setValue('comment', '');

    toast.success('Comment Successfully Posted!', {
      id: notification,
    });
  };

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      {/* 댓글창 */}
      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('comment', { required: true })}
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

      {/* 댓글 목록 */}
      <article className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {post?.comments.map((comment) => (
          <div key={comment.id} className="relative flex items-center space-x-2 space-y-5">
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>

            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">{comment.username}</span>ㆍ
                <TimeAgo date={comment.created_at} />
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}

export default PostDetail;
