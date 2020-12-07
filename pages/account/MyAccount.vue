<template>
    <div>
        <h2>Můj účet</h2>

        <div v-if="me">
            <p>Přihlášený uživatel: {{ me.name}}</p>
            <p>Email: {{ me.email }}</p>
        </div>

        <!-- <h2>Zpěvníky:</h2>

        <ul class="list-group">
            <li
                v-for="songbook in user.songbooks"
                :key="songbook.id"
                class="list-group-item d-flex justify-content-between align-items-center"
            >
                {{ songbook.name }}
                <span class="badge badge-primary badge-pill">{{
                    songbook.song_lyrics.length
                }}</span>
                <ul>
                    <li
                        v-for="song_lyric in songbook.song_lyrics"
                        :key="song_lyric.id"
                    >
                        {{ song_lyric.name }}
                    </li>
                </ul>
            </li>
        </ul> -->

        <!-- <a @click="addNewSongbook" :disabled="new_songbook_name == ''">Přidat nový zpěvník</a>
        <input type="text" v-model="new_songbook_name"/> -->
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'MyAccount',

    apollo: {
        me: {
            query: gql`
                query {
                    me {
                        name
                        email
                    }
                }
            `,
            prefetch: false
            // variables() {
            //     return {
            //         search_params: this.searchParams,
            //         page: 1,
            //         per_page: 100
            //     };
            // },

            // debounce: 200
            // result(result) {
            //     this.$emit("query-loaded", null);
            //     this.enable_more = result.data.song_lyrics_paginated.paginatorInfo.hasMorePages;
            //     this.results_loaded = true;
            // },
        }
    },
};
</script>
