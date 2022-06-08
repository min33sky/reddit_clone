import { LinkIcon, PhotographIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutation';
import client from '../apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/query';
import toast from 'react-hot-toast';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

/**
 * 포스트 등록 컴포넌트
 * @returns
 */
function PostBox() {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [imageBoxOpen, setImageBoxOpen] = useState(false);

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading('Creating new post...');

    try {
      // Query for the subreddit topic...
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        // create subreddit
        console.log('Subreddit is new! -> creating a NEW subreddit!');

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log('Creating post...', formData);
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('New post added: ', newPost);
      } else {
        // use existing subreddit

        console.log('Using existing subreddit!');
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log('New post added: ', newPost);
      }

      // After the post has been added!
      setValue('postBody', '');
      setValue('postImage', '');
      setValue('postTitle', '');
      setValue('subreddit', '');

      toast.success('New Post Created!', {
        id: notification,
      });
    } catch (error) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          type="text"
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          {...register('postTitle', { required: true })}
          disabled={!session}
          placeholder={session ? 'Create a post by entering a title' : 'Sign in to post'}
        />
        <PhotographIcon
          onClick={() => setImageBoxOpen((prev) => !prev)}
          className={`z-50 h-6 cursor-pointer text-gray-300 ${imageBoxOpen && 'text-blue-300'} `}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      <div
        className={`flex h-0 -translate-y-full flex-col overflow-hidden py-2 opacity-0 transition duration-100 ease-in-out ${
          !!watch('postTitle') && 'h-auto translate-y-0 opacity-100'
        }`}
      >
        {/* Body */}
        <div className="flex items-center px-2">
          <p className="min-w-[90px]">Body:</p>
          <input
            type="text"
            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            {...register('postBody')}
            placeholder="Text (optional)"
          />
        </div>

        {/* Subreddit */}
        <div className="flex items-center px-2">
          <p className="min-w-[90px]">Subreddit:</p>
          <input
            type="text"
            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            {...register('subreddit')}
            placeholder="i.e. reactjs"
          />
        </div>

        {imageBoxOpen && (
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Image URL:</p>
            <input
              type="text"
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postImage')}
              placeholder="Optional..."
            />
          </div>
        )}
      </div>

      {/* Error */}
      {Object.keys(errors).length > 0 && (
        <div className="space-y-2 p-2 text-red-500">
          {errors.postTitle?.type === 'required' && <p>- APost Title is required</p>}
          {errors.subreddit?.type === 'required' && <p>- A Subreddit is required</p>}
        </div>
      )}

      {!!watch('subreddit') && (
        <button type="submit" className="w-full rounded-full bg-blue-400 p-2 text-white">
          Create Post
        </button>
      )}
    </form>
  );
}

export default PostBox;
