import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      body
      created_at
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

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
      body
      created_at
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

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      id
      body
      created_at
      title
      subreddit_id
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

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesbyPostId(post_id: $post_id) {
      id
      upvote
      created_at
      username
      post_id
    }
  }
`;
