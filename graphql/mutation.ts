import { gql } from '@apollo/client';

export const ADD_POST = gql`
  mutation myMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ) {
    insertPost(
      body: $body
      image: $image
      subreddit_id: $subreddit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation myMutaion($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation myMutaion($post_id: ID!, $username: String!, $text: String!) {
    insertComment(post_id: $post_id, username: $username, text: $text) {
      id
      text
      username
      created_at
      post_id
    }
  }
`;

export const ADD_VOTE = gql`
  mutation myMutaion($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      upvote
      created_at
      username
      post_id
    }
  }
`;
