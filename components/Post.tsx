import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { Post } from '../types/reddit';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { ShareIcon } from '@heroicons/react/solid';

const formatter = buildFormatter(koreanStrings);

function Post({ post }: { post: Post }) {
  console.log('post: ', post);

  return (
    <li
      className="flex cursor-pointer rounded-md border
              border-gray-300 bg-white shadow-sm
                hover:border hover:border-gray-600"
    >
      {/* Vote */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-xs font-bold text-black">{post.votes.length}</p>
        <ArrowDownIcon className="voteButtons hover:text-red-400" />
      </div>

      {/* main */}
      <div className="p-3 pb-1">
        {/* header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0].topic} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit[0].topic}
            </span>
            ㆍPosted by u/{post.username}
            <TimeAgo date={post.created_at} formatter={formatter} />
          </p>
        </div>

        {/* body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>

        {/* image */}
        {post.image && <img className="w-full" src={post.image} alt="body image" />}

        {/* footer */}
        <div className="flex space-x-4 text-gray-400">
          <div className="postButtons">
            <ChatAltIcon className="h-6 w-6" />
            <p>{post.comments.length} Comments</p>
          </div>
          <div className="postButtons">
            <GiftIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons">
            <ShareIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          <div className="postButtons">
            <BookmarkIcon className="h-6 w-6" />
            <p className="hidden sm:inline">Save</p>
          </div>
          <div className="postButtons">
            <DotsHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Post;
