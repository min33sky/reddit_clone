import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
} from '@heroicons/react/outline';
import React, { useCallback, useEffect, useState } from 'react';
import { Post, Vote } from '../types/reddit';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { ShareIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { Jelly } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/query';
import { ADD_VOTE } from '../graphql/mutation';

const formatter = buildFormatter(koreanStrings);

/**
 * 게시물 컴포넌트
 * @param param0 게시물 정보 객체
 * @returns
 */
function Post({ post }: { post: Post }) {
  const { data: session } = useSession();
  const [vote, setVote] = useState<Boolean>();
  const [count, setCount] = useState(0);

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesbyPostId'],
  });

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You'll need to sign in to Vote!");
      return;
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log('Voting...', isUpvote);

    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpvote,
      },
    });
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVotesbyPostId;

    //? 내가 이 게시물에 투표 했는지 안했는지 체크하기

    // Latest vote (as we sorted by newely created first in SQL Query)
    // Note: You could improve this by moving it to the original Query
    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(vote);

    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) {
      setCount(0);
    } else if (displayNumber === 0) {
      setCount(votes[0]?.upvote ? 1 : -1);
    } else {
      setCount(displayNumber);
    }
  }, [data, session?.user?.name]);

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-left">
        <Jelly size={50} color="#FF4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <li
        className="flex cursor-pointer rounded-md
              border border-gray-300 bg-white shadow-sm
                hover:border hover:border-gray-600"
      >
        {/* Vote */}
        <div
          aria-label="투표"
          className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400"
        >
          <ArrowUpIcon
            role={'button'}
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && 'text-red-400'
            }`}
          />

          <p className="text-xs font-bold text-black">{count}</p>

          <ArrowDownIcon
            role={'button'}
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && 'text-blue-400'
            }`}
          />
        </div>

        {/* main */}
        <div className="p-3 pb-1">
          {/* header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0].topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0].topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0].topic}
                </span>
              </Link>
              ㆍPosted by u/{post.username}&nbsp;
              <TimeAgo date={post.created_at} formatter={formatter} />
            </p>
          </div>

          {/* body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* image */}
          {post.image && (
            <div
              className="h-[300px] w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${post.image})`,
              }}
            />
          )}

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
    </Link>
  );
}

export default Post;
