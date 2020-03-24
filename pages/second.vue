<template>
  <div>
    <h1>Hello world</h1>
    <div class="row ml-0" v-if="!$apollo.loading">{{ song_lyric.name }}</div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const postsQuery = gql`
  query {
    song_lyric(id: 6) {
      id
      name
    }
  }
`

export default {
  apollo: {
    song_lyric: {
      query: postsQuery,
      variables() {
        return {
          id: this.songId
        };
      }
    }
  }
}
</script>