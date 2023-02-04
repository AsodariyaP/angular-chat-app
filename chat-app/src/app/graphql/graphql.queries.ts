import { gql } from 'apollo-angular'

const FETCH_LATEST_MESSAGES = gql`
query fetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`

const POST_MESSAGE = gql`
mutation postMessage ($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      userId
      datetime
      text
      messageId
    }
  }
`

const FETCH_MORE_MESSAGES = gql`
query fetchMoreMessages ($channelId: String!, $messageId: String!, $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId, messageId:  $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`

export { FETCH_LATEST_MESSAGES, POST_MESSAGE, FETCH_MORE_MESSAGES }