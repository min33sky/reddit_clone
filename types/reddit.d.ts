export type Comment = {
  created_at: string;
  id: number;
  post_id: number;
  text: string;
  username: string;
};

export type Post = {
  body: string;
  created_at: string;
  id: string;
  image: string;
  subreddit_id: number;
  title: string;
  username: string;
  votes: Vote[];
  subreddit: Subreddit[];
  comments: Comment[];
};

export type Subreddit = {
  created_at: string;
  id: number;
  topic: string;
};

export type Vote = {
  created_at: string;
  id: number;
  post_id: number;
  upvote: boolean;
  username: string;
};
