import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      body
      created_at
      title
      subreddit_id
      title
      image
      username
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        upvote
        post_id
        username
        created_at
      }
      comments {
        id
        post_id
        created_at
        text
        username
      }
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
