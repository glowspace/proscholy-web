<template>
  <div>
    <h1 v-if="!$apollo.loading">{{ song_lyric.name }}</h1>
    <span v-else>Načítání</span>
  </div>
</template>

<script>
import gql from 'graphql-tag'


const FETCH_SONG_LYRIC = gql`
	query($id: ID!) {
		song_lyric(id: $id) {
			id
			name
		}
  	}
`

export default {
	apollo: {
		song_lyric: {
			query: FETCH_SONG_LYRIC,
			variables() {
				return {
				id: this.$route.params.id
				};
			}
		}
	}
}
</script>