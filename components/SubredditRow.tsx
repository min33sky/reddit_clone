import { ChevronUpIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

type Props = {
  index: number;
  topic: string;
};

function SubredditRow({ index, topic }: Props) {
  return (
    <li className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b ">
      <p>{index}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-gray-400" />
      <Avatar seed={`/subreddit/${topic}`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <p className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          View
        </p>
      </Link>
    </li>
  );
}

export default SubredditRow;
