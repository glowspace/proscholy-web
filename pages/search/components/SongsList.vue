<template>
    <!-- todo: refactor so that it does not need client-only wrapper -->
    <client-only>
    <div class="songs-list">
        <v-progress-linear
            indeterminate
            color="bg-main-blue"
            :height="4"
            :class="[results_loaded ? '' : 'opacity-1', 'custom-progress-bar']"
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
                            class="btn btn-secondary float-right"
                            :href="'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' + encodeURIComponent(baseUrl + $route.fullPath)"
                        >
                            Nahlásit
                        </a>
                    </td>
                </tr>
                <template
                    v-else-if="song_lyrics && song_lyrics.length"
                >
                    <tr
                        v-for="song_lyric in song_lyrics"
                        :key="song_lyric.id"
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
                            >
                                <song-name :song="song_lyric" :multiline="true"/>
                            </nuxt-link>
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
                                    :to="ap.pivot.author.public_route"
                                    :title="song_lyric.type ? {'GENERIC':'','LYRICS':'text','MUSIC':'hudba'}['LYRICS'] : {'GENERIC':'','LYRICS':'text','MUSIC':'hudba'}[ap.pivot.authorship_type]"
                                    class="text-secondary"
                                    >{{ ap.pivot.author.name }}</nuxt-link
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
                                v-if="song_lyric.scores.length"
                                class="fas fa-file-alt text-danger"
                                title="U této písně je k dispozici soubor s notami."
                            ></i>
                            <i
                                v-else
                                class="fas fa-file-alt text-very-muted"
                            ></i>
                        </td>
                        <td
                            style="width:10px"
                            class="no-left-padding pr-4 align-middle d-none d-sm-table-cell"
                        >
                            <i
                                v-if="song_lyric.recordings.length"
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
                        @noObserver="caniuseObserver = false"
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
                            class="btn btn-secondary float-right"
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
                @click="loadMore"
            >
                <span
                    class="spinner-border spinner-border-sm mr-3"
                    role="status"
                    aria-hidden="true"
                    v-if="caniuseObserver"
                ></span>{{ caniuseObserver ? 'Načítám' : 'Načíst' }} další výsledky (celkem {{ song_lyrics_paginated.paginatorInfo.total }})</div
            >
        </div>
    </div>
    </client-only>
</template>

<script>
import gql from 'graphql-tag';
import ScrollTrigger from '~/components/Search/ScrollTrigger';
import buildElasticSearchParams, { getSelectedTagsDcnf } from '~/components/Search/buildElasticSearchParams';
import mergeFetchMoreResult from '~/components/Search/mergeFetchMoreResult';
import fetchFiltersQuery from './fetchFiltersQuery.graphql';
import SongName from '~/components/SongName';

// Query
const FETCH_ITEMS = gql`
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
                secondary_name_1
                secondary_name_2
                public_route
                lang
                lang_string
                scores: externals(content_type: SCORE) {
                    id
                }
                recordings: externals(content_type: RECORDING) {
                    id
                }
                authors_pivot {
                    pivot {
                        author {
                            id
                            name
                            public_route
                        }
                        authorship_type
                    }
                }
                tags {
                    id
                }
                has_chords
                has_lyrics
                songbook_records {
                    pivot {
                        number
                        songbook {
                            id
                            name
                            shortcut
                        }
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
    props: {
        searchString: {
            type: String,
            default: ""
        },

        selectedSongbooks: Object,
        selectedTags: Object,
        selectedLanguages: Object,

        // todo: refactor `sort` to String (or a kind of enum)
        sort: Number,
        descending: Boolean,
        seed: Number,

        showArrangements: {
            type: Boolean,
            default: false
        },
        showRegenschori: {
            type: Boolean,
            default: false
        }
    },

    components: { ScrollTrigger, SongName },

    data() {
        return {
            baseUrl: process.env.baseUrl,
            page: 1,
            per_page: 20,
            enable_more: true,
            results_loaded: false,
            preferred_songbook_id: null,
            caniuseObserver: true,
            loadedMore: false
        };
    },

    computed: {
        searchParams() {
            return buildElasticSearchParams({
                searchString: this.searchString,
                filterTagsDcnf: getSelectedTagsDcnf({
                        generic: this.tags_generic,
                        liturgy_part: this.tags_liturgy_part,
                        liturgy_period: this.tags_liturgy_period,
                        saints: this.tags_saints,
                        sacred_occasion: this.tags_sacred_occasion
                    },
                    this.selectedTags),
                filterLanguages: this.selectedLanguages,
                filterSongbooks: this.selectedSongbooks,
                sortType: [
                    "RANDOM",
                    "NAME",
                    this.preferred_songbook_id === null ? "NUMBER" : "SONGBOOK_NUMBER"
                ][this.sort],
                sortConfig: {
                    seed: this.seed,
                    songbook_id: this.preferred_songbook_id,
                    is_descending: this.descending
                },
                filterConfig: {
                    show_regenschori: this.showRegenschori,
                    show_arrangements: this.showArrangements
                }
            });
        },

        song_lyrics() {
            return this.song_lyrics_paginated
                ? this.song_lyrics_paginated.data
                : [];
        }
    },

    methods: {
        async loadMore() {
            this.loadedMore = true;
            this.page++;

            try {
                await this.$apollo.queries.song_lyrics_paginated.fetchMore({
                    variables: {
                        page: this.page,
                        per_page: this.per_page
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        const { hasMorePages, mergedResult } = mergeFetchMoreResult(previousResult, fetchMoreResult);
                        this.enable_more = hasMorePages;

                        return mergedResult;
                    }
                });
            } catch (e) {
                return e;
            }

        },

        getSongNumber(song_lyric, getfirstPart) {
            if (this.preferred_songbook_id !== null) {
                let rec = song_lyric.songbook_records.find(
                    record => record.pivot.songbook.id === this.preferred_songbook_id
                );

                if (rec) {
                    if (getfirstPart) {
                        return rec.pivot.songbook.shortcut + ' ';
                    } else {
                        return rec.pivot.number;
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
        $prefetch: false,
        tags_generic: {
            query: fetchFiltersQuery
        },
        tags_liturgy_part: {
            query: fetchFiltersQuery
        },
        tags_liturgy_period: {
            query: fetchFiltersQuery
        },
        tags_saints: {
            query: fetchFiltersQuery
        },
        tags_sacred_occasion: {
            query: fetchFiltersQuery
        },
        song_lyrics_paginated: {
            query: FETCH_ITEMS,
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
                // we also have to check if the user has fired loadMore event as otherwise he could accidentally fetch one page multiple times
                if (!this.loadedMore) {
                    this.page = result.data.song_lyrics_paginated.paginatorInfo.currentPage;
                }
            }
        },
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
