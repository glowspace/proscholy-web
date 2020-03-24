<template>
  <div>
    <h1 v-if="!$apollo.loading">{{ song_lyric.name }}</h1>
    <span v-else>Načítání</span>
  </div>
</template>

<script>
import gql from 'graphql-tag'


const FETCH_SONG_LYRIC = gql`
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
			query: FETCH_SONG_LYRIC
		}
	}
}
</script>