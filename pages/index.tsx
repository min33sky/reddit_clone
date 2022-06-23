import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Feed from '../components/Feed';
import PostBox from '../components/PostBox';
import SubredditRow from '../components/SubredditRow';
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/query';
import { Subreddit } from '../types/reddit';

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subreddits: Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>

      <PostBox />

      <main className="flex">
        <Feed />

        <aside className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:block">
          <p className="mb-1 p-4 pb-3 text-base font-bold">Top Communities</p>
          <ul>
            {subreddits?.map((subreddit, index) => (
              <SubredditRow
                key={subreddit.id}
                index={index + 1}
                topic={subreddit.topic}
              />
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default Home;
