<template>
    <!-- todo: refactor so that it does not need client-only wrapper -->
    <client-only>
    <div class="songs-list">
        <v-progress-linear
            indeterminate
            color="bg-main-blue"
            :height="4"
            :class="[results_loaded ? '' : 'custom-progress-bar--visible', 'custom-progress-bar']"
        ></v-progress-linear>
        <table class="table m-0">
            <tbody>
                <tr v-if="!results_loaded && !(song_lyrics && song_lyrics.length)">
                    <td style="width:4rem">
                        <div class="d-flex justify-content-end align-items-center">
                            <span>&nbsp;</span>
                            <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        </div>
                    </td>
                    <td>Načítám...</td>
                    <td class="p-1" colspan="5">
                        <a
                            class="btn btn-secondary float-right m-0"
                            target="_blank"
                            :href="
                                'https://docs.google.com/forms/d/e/1FAIpQLScmdiN_8S_e8oEY_jfEN4yJnLq8idxUR5AJpFmtrrnvd1NWRw/viewform?usp=pp_url&entry.1025781741=' +
                                    encodeURIComponent($route.fullPath)
                            "
                        >
                            Nahlásit
                        </a>
                    </td>
                </tr>
                <template
                    v-else-if="song_lyrics && song_lyrics.length"
                >
                    <tr
                        v-for="(song_lyric, index) in song_lyrics"
                        v-bind:key="song_lyric.id"
                    >
                        <td
                            class="p-1 align-middle text-right w-min"
                        >
                            <nuxt-link
                                class="p-2 pl-3 w-100 d-flex justify-content-between text-secondary"
                                :to="song_lyric.public_route"
                            >
                                <span>{{
                                    getSongNumber(song_lyric, true)
                                }}</span>
                                <span>{{
                                    getSongNumber(song_lyric, false)
                                }}</span>
                            </nuxt-link>
                        </td>
                        <td
                            class="p-1 align-middle"
                        >
                            <nuxt-link
                                class="p-2 w-100 d-inline-block"
                                :to="song_lyric.public_route"
                            >{{ song_lyric.name }}</nuxt-link>
                        </td>
                        <td
                            class="p-1 align-middle"
                            :colspan="song_lyric.lang != 'cs' ? 1 : 2"
                        >
                            <span
                                v-for="(ap,
                                authorIndex) in song_lyric.authors_pivot"
                                :key="authorIndex"
                            >
                                <span v-if="authorIndex">,</span>
                                <nuxt-link
                                    :to="ap.author.public_route"
                                    :title="song_lyric.type ? {'GENERIC':'','LYRICS':'text','MUSIC':'hudba'}['LYRICS'] : {'GENERIC':'','LYRICS':'text','MUSIC':'hudba'}[ap.authorship_type]"
                                    class="text-secondary"
                                    >{{ ap.author.name }}</nuxt-link
                                >
                            </span>
                        </td>
                        <td
                            class="no-left-padding text-right text-uppercase small align-middle pr-3"
                            v-if="song_lyric.lang != 'cs'"
                        >
                            <span
                                :class="[
                                    {
                                        'text-very-muted': !song_lyric.has_lyrics
                                    },
                                    'pr-sm-0 pr-1'
                                ]"
                                :title="song_lyric.lang_string"
                                >{{ song_lyric.lang.substring(0, 3) }}</span
                            >
                        </td>
                        <td
                            style="width:10px"
                            class="no-left-padding align-middle d-none d-sm-table-cell"
                        >
                            <i
                                v-if="song_lyric.has_chords"
                                class="fas fa-guitar text-primary"
                                title="Tato píseň má přidané akordy."
                            ></i>
                            <i
                                v-else-if="song_lyric.has_lyrics"
                                class="fas fa-align-left text-secondary"
                                title="U této písně je zaznamenán text (bez akordů)."
                            ></i>
                            <i v-else class="fas fa-align-left text-very-muted"></i>
                        </td>
                        <td
                            style="width:10px"
                            class="no-left-padding align-middle d-none d-sm-table-cell"
                        >
                            <i
                                v-if="song_lyric.scoreFiles.length > 0"
                                class="fa fa-file-alt text-danger"
                                title="K této písni jsou k dispozici noty."
                            ></i>
                            <i
                                v-else
                                class="fa fa-file-alt text-very-muted"
                            ></i>
                        </td>
                        <td
                            style="width:10px"
                            class="no-left-padding pr-4 align-middle d-none d-sm-table-cell"
                        >
                            <i
                                v-if="
                                    song_lyric.spotifyTracks.length +
                                        song_lyric.soundcloudTracks.length +
                                        song_lyric.youtubeVideos.length +
                                        song_lyric.audioFiles.length
                                "
                                class="fas fa-headphones text-success"
                                title="U této písně je k dispozici nahrávka."
                            ></i>
                            <i
                                v-else
                                class="fas fa-headphones text-very-muted"
                            ></i>
                        </td>
                    </tr>
                    <tr v-if="results_loaded"><td class="p-0 border-top-0"><scroll-trigger
                        @triggerIntersected="loadMore"
                        :enabled="enable_more"
                    /></td></tr>
                </template>
                <tr v-else-if="results_loaded">
                    <td class="p-1" colspan="7">
                        <span class="px-3 py-2 d-inline-block"
                            >Žádná píseň odpovídající zadaným kritériím nebyla
                            nalezena.</span
                        >
                        <a
                            class="btn btn-secondary float-right m-0"
                            target="_blank"
                            :href="'https://forms.gle/AYXXxkWtDHQQ13856'"
                        >
                            Přidat píseň
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-center">
            <div
                class="btn btn-primary d-inline-flex align-items-center"
                v-if="enable_more && results_loaded"
            >
                <span
                    class="spinner-border spinner-border-sm mr-3"
                    role="status"
                    aria-hidden="true"
                ></span>Načítám další výsledky (celkem {{ song_lyrics_paginated.paginatorInfo.total }})</div
            >
        </div>
    </div>
    </client-only>
</template>

<script>
import gql from 'graphql-tag';
import ScrollTrigger from './ScrollTrigger';

// Query
const fetch_items = gql`
    query($search_params: String, $page: Int, $per_page: Int) {
        song_lyrics_paginated: search_song_lyrics(
            search_params: $search_params
            page: $page
            per_page: $per_page
        ) {
            data {
                id
                song_number
                name
                public_route
                lang
                lang_string
                scoreExternals: externals(type: 4) {
                    id
                }
                scoreFiles: files(type: 3) {
                    id
                }
                youtubeVideos: externals(type: 3) {
                    id
                }
                spotifyTracks: externals(type: 1) {
                    id
                }
                soundcloudTracks: externals(type: 2) {
                    id
                }
                audioFiles: files(type: 4) {
                    id
                }
                authors_pivot {
                    author {
                        id
                        name
                        public_route
                    }
                    authorship_type
                }
                tags {
                    id
                }
                has_chords
                has_lyrics
                songbook_records {
                    number
                    songbook {
                        id
                        name
                        shortcut
                    }
                }
            }
            paginatorInfo {
                currentPage
                lastPage
                total
                hasMorePages
            }
        }
    }
`;

export default {
    props: [
        'search-string',
        'selected-tags-dcnf',
        'selected-songbooks',
        'selected-tags',
        'selected-languages',
        'sort',
        'descending',
        'seed'
    ],

    components: { ScrollTrigger },

    data() {
        return {
            page: 1,
            per_page: 20,
            enable_more: true,
            results_loaded: false,
            preferred_songbook_id: null
        };
    },

    computed: {
        searchParams() {
            // encode the elasticsearch attributes into an object and send as JSON text
            // for docs see https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html

            // all the searchable fields are defined in App\SongLyrics: toSearchableArray() and $mapping attr

            // also, the Kibana tool can be used for debugging the elasticsearch requests
            // see docker-compose.yml

            let query = {
                bool: {
                    // see must vs filter elastic documentation https://www.elastic.co/guide/en/elasticsearch/reference/current/query-filter-context.html
                    must: [],
                    should: [],
                    filter: [
                        { term: { is_arrangement: { value: false } } },
                        { term: { only_regenschori: { value: false } } }
                    ]
                }
            };

            // beware that not all attribute types can be used for sorting, this is why 'name_keyword' (used here later) has been added to index
            let sort = [];

            // handle search strings surrounded by "" as exact match queries
            const cleanSearchString = this.searchString.replace(/"/g, '');
            const isExactMatch = this.searchString == `"${cleanSearchString}"`;

            if (cleanSearchString) {
                // if exact match query -> multi_match needs to end in `must` section,
                // otherwise it is to be in `should` in order only to improve the rating
                let queryObject = isExactMatch ? query.bool.must : query.bool.should;
                queryObject.push({
                    multi_match: {
                        query: cleanSearchString,
                        type: 'phrase',

                        fields: [
                            'name^10',
                            'lyrics^5'
                        ]
                    }
                });

                query.bool.must.push({
                    // see multi_match elastic documentation https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
                    multi_match: {
                        query: cleanSearchString,

                        fields: [
                            'name^2',
                            'lyrics',
                            'authors',
                            'song_number^50',
                            'songbook_records.songbook_number'
                        ]
                    }
                });

            } else {
                // no search keyword provided
                if (this.sort == 1) {
                    sort.push({name_keyword: {order: this.descending ? 'desc' : 'asc'}});
                } else if (this.sort == 2) {
                    sort.push({song_number: {order: this.descending ? 'desc' : 'asc'}});
                } else {
                    query.bool.must.push({
                        function_score: {
                            query: { match_all: { boost: 1 } },
                            random_score: { seed: parseInt(this.seed), field: '_id' }
                        }
                    });
                }
            }

            for (let category_tags of Object.values(this.selectedTagsDcnf)) {
                let tag_ids = Object.values(category_tags).map(v =>
                    parseInt(v)
                );

                if (tag_ids.length) {
                    query.bool.filter.push({ terms: { tag_ids: tag_ids } });
                }
            }

            if (Object.keys(this.selectedLanguages).length) {
                query.bool.filter.push({
                    terms: { lang: Object.keys(this.selectedLanguages) }
                });
            }

            if (Object.keys(this.selectedSongbooks).length) {
                query.bool.filter.push({
                    terms: {
                        'songbook_records.songbook_id': Object.keys(
                            this.selectedSongbooks
                        )
                    }
                });
            }

            // encode to a JSON string to pass as an argument

            const query_str = JSON.stringify({
                sort: sort,
                query: query
            });

            // // const query_base64 = Buffer.from(query_str).toString("base64");

            return query_str;
        },

        song_lyrics() {
            return this.song_lyrics_paginated
                ? this.song_lyrics_paginated.data
                : [];
        }
    },

    methods: {
        async loadMore() {
            this.page++;

            try {
                await this.$apollo.queries.song_lyrics_paginated.fetchMore({
                    variables: {
                        page: this.page,
                        per_page: this.per_page
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        const newSongLyrics =
                            fetchMoreResult.song_lyrics_paginated.data;
                        const paginatorInfo =
                            fetchMoreResult.song_lyrics_paginated.paginatorInfo;

                        this.enable_more = paginatorInfo.hasMorePages;

                        return {
                            song_lyrics_paginated: {
                                __typename:
                                    previousResult.song_lyrics_paginated.__typename,
                                // Merging the songLyrics lists
                                data: [
                                    ...previousResult.song_lyrics_paginated.data,
                                    ...newSongLyrics
                                ],
                                paginatorInfo
                            }
                        };
                    }
                });
            } catch (e) {
                return e;
            }

        },

        getSongNumber(song_lyric, getfirstPart) {
            if (this.preferred_songbook_id !== null) {
                let rec = song_lyric.songbook_records.filter(
                    record => record.songbook.id === this.preferred_songbook_id
                )[0];
                if (rec) {
                    if (getfirstPart) {
                        return rec.songbook.shortcut + ' ';
                    } else {
                        return rec.number;
                    }
                }
            }

            if (!getfirstPart) {
                return song_lyric.song_number;
            }
            return '';
        }
    },

    // GraphQL client
    apollo: {
        song_lyrics_paginated: {
            query: fetch_items,
            variables() {
                return {
                    search_params: this.searchParams,
                    page: 1,
                    per_page: this.per_page
                };
            },
            // debounce waits 200ms for query refetching
            debounce: 200,
            result(result) {
                this.$emit('query-loaded', null);
                this.enable_more =
                    result.data.song_lyrics_paginated.paginatorInfo.hasMorePages;
                this.results_loaded = true;

                // when the graphql result is cached, then currentPage is higher than 1 at component mounting
                // this needs to get mirrored in the local page property
                this.page = result.data.song_lyrics_paginated.paginatorInfo.currentPage;
            }
        }
    },

    watch: {
        searchParams() {
            this.page = 1;
            this.results_loaded = false;
        },

        selectedSongbooks(val) {
            let arr = Object.keys(val);
            if (arr.length == 1) {
                this.preferred_songbook_id = arr[0];
            } else {
                this.preferred_songbook_id = null;
            }
        }
    }
};
</script>
