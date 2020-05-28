<template>
    <song-loading v-if="$apollo.loading"></song-loading>
    <song-detail v-else :song="song_lyric"></song-detail>
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
                    # lang
                    # lang_string
                }
            }
            capo
            # songbook_records{number, songbook{id, name, shortcut}}
        }
    }
`;

import { clone } from 'lodash';

export default {
    name: 'Song',
    components: { SongLoading, SongDetail },

    data: () => {
        return {
            song_lyric: {}
        };
    },

    mounted() {},

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

    methods: {}
};
</script>
