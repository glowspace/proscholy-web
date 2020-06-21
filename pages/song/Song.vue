<template>
    <song-loading v-if="$apollo.loading"></song-loading>
    <song-detail v-else-if="song_lyric" :song="song_lyric"></song-detail>
</template>

<script>
import SongDetail from './SongDetail';
import SongLoading from './SongLoading';

import gql, { disableFragmentWarnings } from 'graphql-tag';

const FETCH_SONG_LYRIC = gql`
    query($id: ID!) {
        song_lyric(id: $id) {
            has_lyrics
            id
            name
            type
            authors {
                id
                name
                public_route
            }
            externals(orderBy: { field: "type", order: ASC }) {
                id
                public_name
                url
                type
                media_id
                authors {
                    id
                    name
                    public_route
                }
            }
            files {
                id
                public_name
                url
                download_url
                type
                authors {
                    id
                    name
                    public_route
                }
            }
            song {
                song_lyrics {
                    id
                    name
                    public_route
                    type
                    authors {
                        id
                        name
                        public_route
                    }
                    lang
                    lang_string
                }
            }
            capo
            songbook_records {
                number
                songbook {
                    id
                    name
                    shortcut
                }
            }
            liturgy_approval_status
            liturgy_approval_status_string_values
            tags_liturgy_part   {id name}
            tags_generic        {id name}
            tags_liturgy_period {id name}
            tags_saints         {id name}
        }
    }
`;

import { clone } from 'lodash';

export default {
    name: 'Song',
    components: { SongLoading, SongDetail },

    head() {
        return {
            title: this.getTitle(),
            meta: [
                {property: 'og:title', content: this.getTitle()},
                {property: 'twitter:title', content: this.getTitle()},
                {name: 'description', content: this.getDescription()},
                {property: 'og:description', content: this.getDescription()},
                {property: 'twitter:description', content: this.getDescription()}
            ]
        }
    },

    data() {
        return {
            titleWebsite: process.env.titleWebsite,
            titleSeparator: process.env.titleSeparator
        };
    },

    methods: {
        getTitle() {
            return (this.song_lyric ? this.song_lyric.name : 'Píseň ' + this.$route.params.id) + this.titleSeparator + this.titleWebsite;
        },

        getDescription() {
            return '';
        }
    },

    apollo: {
        song_lyric: {
            query: FETCH_SONG_LYRIC,
            variables() {
                return {
                    id: this.$route.params.id
                };
            }
        }
    },

    mounted() {
        if(!this.$apollo.loading && this.song_lyric === null) {
            this.$nuxt.error({ statusCode: 404 });
        }
    }
};
</script>
