<template>
  <div>
    <h1 v-if="!$apollo.loading">{{ author.name }}</h1>
    <span v-else>Načítání</span>
  </div>
</template>

<script>
import gql from 'graphql-tag'


const FETCH_AUTHOR = gql`
	query($id: ID!) {
		author(id: $id) {
			id
			name
		}
  	}
`

export default {
	apollo: {
		author: {
			query: FETCH_AUTHOR,
			variables() {
				return {
				id: this.$route.params.id
				};
			}
		}
	}
}
</script>