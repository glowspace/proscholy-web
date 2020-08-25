<template>
    <div class="background-home">
        <div class="container">
            <div :class="[init ? 'home-init' : 'home-afterinit']">
                <logo />

                <div
                    :class="[
                            { 'fixed-top position-sticky': !init },
                            'row mt-n4 justify-content-center zindex-lower'
                    ]"
                >
                    <div class="col-lg-8 px-1 pt-5 pb-3 search-column">
                        <div class="search-wrapper shadow">
                            <input
                                type="search"
                                class="search-home"
                                id="search-home"
                                placeholder="Zadejte název písně, část textu nebo jméno autora"
                                v-model="search_string"
                                v-on:keyup.enter="inputEnter()"
                                autofocus
                            />
                            <button
                                type="button"
                                class="search-submit"
                                v-if="init"
                                @click="inputEnter()"
                            >
                                <i class="fa fa-search d-none d-sm-inline"></i>
                            </button>
                            <button
                                type="button"
                                class="search-submit d-none d-lg-inline"
                                v-if="!init"
                                @click="inputEnter()"
                            >
                                <i class="fa fa-search" v-if="!songLoading"></i>
                                <span
                                    v-else
                                    class="spinner-border spinner-border-sm align-middle"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>
                            <button
                                type="button"
                                class="search-submit d-lg-none"
                                v-if="!init"
                                :class="{
                                    'filter-active': filters_active,
                                    'filter-open': displayFilter
                                }"
                                @click="displayFilter = !displayFilter"
                            >
                                <i class="fa fa-filter" v-if="!songLoading"></i>
                                <span
                                    v-else
                                    class="spinner-border spinner-border-sm align-middle"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </div>
                        <InitFilters
                            v-if="init"
                            :selected-tags.sync="selected_tags"
                            @input="updateHistoryState; init = false;"
                        ></InitFilters>
                        <div
                            v-if="init"
                            @click="init = false;"
                            class="text-center pt-2 text-white"
                        >
                            <a
                                class="btn btn-outline-light display-all-songs font-weight-bold"
                                ><i class="fas fa-chevron-down pr-1"></i> ZOBRAZIT VŠECHNY PÍSNĚ</a
                            >
                        </div>
                        <div
                            class="mx-2 d-lg-none filter-panel position-absolute"
                            v-show="!init && displayFilter"
                        >
                            <a
                                class="btn btn-secondary float-right fixed-top position-sticky"
                                v-on:click="displayFilter = false"
                            >
                                <i class="fas fa-times pr-0"></i>
                            </a>
                            <!-- filters shown only for mobile -->
                            <Filters
                                :selected-songbooks.sync="selected_songbooks"
                                :selected-tags.sync="selected_tags"
                                :selected-languages.sync="selected_languages"
                                :show-authors.sync="showAuthors"
                                :sort.sync="sort"
                                :descending.sync="descending"
                                :search-string="search_string"
                                v-on:refresh-seed="refreshSeed"
                                v-on:input="updateHistoryState"
                            ></Filters>
                        </div>
                    </div>
                    <div class="col-lg-4 search-balance"></div>
                </div>
                <div class="row justify-content-center text-center pt-4" v-show="init">
                    <div class="col-lg-8 search-column">
                        <News><div class="news-opener" @click="init = false;"></div></News>
                    </div>
                    <div class="col-lg-4 search-balance"></div>
                </div>
                <div class="row" v-show="!init">
                    <div class="col-lg-8">
                        <News v-show="!filters_active && !search_string" />
                        <div class="card">
                            <div class="card-body p-0">
                                <SongsList
                                    v-if="!showAuthors"
                                    :search-string="search_string"
                                    :selected-tags="selected_tags"
                                    :selected-songbooks="selected_songbooks"
                                    :selected-languages="selected_languages"
                                    :sort="sort"
                                    :descending="descending"
                                    :seed="seed"
                                    v-on:query-loaded="queryLoaded"
                                ></SongsList>
                                <AuthorsList
                                    v-else
                                    :search-string="search_string"
                                    v-on:query-loaded="queryLoaded"
                                ></AuthorsList>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col-lg-4 d-none d-lg-block desktop-filter-container"
                    >
                        <div class="fixed-top position-sticky">
                            <!-- filters shown only for desktop -->
                            <Filters
                                :selected-songbooks.sync="selected_songbooks"
                                :selected-tags.sync="selected_tags"
                                :selected-languages.sync="selected_languages"
                                :show-authors.sync="showAuthors"
                                :sort.sync="sort"
                                :descending.sync="descending"
                                :search-string="search_string"
                                v-on:refresh-seed="refreshSeed"
                                v-on:input="updateHistoryState"
                                v-on:tags-loaded="applyStateChange"
                            ></Filters>
                        </div>
                    </div>
                </div>

                <app-links v-if="init" />

                <a
                    class="btn btn-secondary mb-0 search-report bg-transparent"
                    target="_blank"
                    title="Nahlásit"
                    :href="
                        'https://docs.google.com/forms/d/e/1FAIpQLScmdiN_8S_e8oEY_jfEN4yJnLq8idxUR5AJpFmtrrnvd1NWRw/viewform?usp=pp_url&entry.1025781741=' +
                            encodeURIComponent($route.fullPath)
                    "
                >
                    <i class="fas fa-exclamation-triangle p-0"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import SongsList from './components/SongsList';
import AuthorsList from './components/AuthorsList';
import Filters from './components/Filters';
import InitFilters from './components/InitFilters';
import AppLinks from './components/AppLinks';
import Logo from './components/Logo';
import News from './components/News';

import { isEmpty } from 'lodash';
import gql from 'graphql-tag';

const FETCH_SONG_ROUTE = gql`
    query($song_number: Int!) {
        song_lyric_number(song_number: $song_number) {
            public_route
        }
    }
`;

/**
 * Root search component.
 *
 * Toggles 2 views (SearchHome and SearchResults).
 */
export default {
    head() {
        return {
            title: this.getTitle(),
            meta: [
                {property: 'og:title', content: this.getTitle()},
                {property: 'twitter:title', content: this.getTitle()},
                {name: 'description', content: this.getDescription()},
                {property: 'og:description', content: this.getDescription()},
                {property: 'twitter:description', content: this.getDescription()}
            ],
            bodyAttrs: {
                class: ['home', (this.init ? '' : 'home-scroll')]
            }
        }
    },

    data() {
        return {
            // Search data
            search_string: '',
            selected_songbooks: {},
            selected_languages: {},
            selected_tags: {},

            // View state
            init: true,
            displayFilter: false,
            showAuthors: false,

            // Title
            titleWebsite: process.env.titleWebsite,
            titleSeparator: process.env.titleSeparator,

            // Admin url
            adminUrl: process.env.adminUrl,

            // Random order seed
            seed: 0,
            seedLocked: false,

            // Sort
            sort: 0,
            descending: false,

            // Song route loading
            songLoading: false
        };
    },

    asyncData() {
        const randomInteger = function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return {
            seed: randomInteger(1, 100000)
        };
    },

    methods: {
        getTitle() {
            return this.titleWebsite + this.titleSeparator + 'chytrý křesťanský zpěvník';
        },

        getDescription() {
            return 'Zpěvník ProScholy.cz je největší česká platforma sdružující křesťanské písně.';
        },

        updateHistoryState() {
            let GETparameters = {};
            if (this.search_string) {
                GETparameters.vyhledavani = this.search_string.replace(/\s/g, '_');
            }
            if (Object.keys(this.selected_tags).length) {
                GETparameters.stitky = Object.keys(this.selected_tags).join(
                    ','
                );
            }
            if (Object.keys(this.selected_languages).length) {
                GETparameters.jazyky = Object.keys(
                    this.selected_languages
                ).join(',');
            }
            if (Object.keys(this.selected_songbooks).length) {
                GETparameters.zpevniky = Object.keys(
                    this.selected_songbooks
                ).join(',');
            }
            if (this.showAuthors) {
                GETparameters.autori = 'ano';
            }
            if (this.sort && !this.search_string) {
                GETparameters.razeni = this.sort;
            }
            if (this.descending && !this.search_string) {
                GETparameters.sestupne = 'ano';
            }

            if (!(this.search_string || this.sort || this.showAuthors || this.init)) {
                this.seedLocked = true;
            } else {
                this.seedLocked = false;
            }

            if (this.seedLocked) {
                GETparameters.nahoda = this.seed;
            }

            this.$router.replace({
                path: '/',
                query: GETparameters
            }).catch(err => {});
        },

        applyStateChange(event) {
            let GETparameters = this.$route.query;
            const validParameters = ['vyhledavani', 'stitky', 'jazyky', 'zpevniky', 'autori', 'razeni', 'sestupne', 'nahoda'];
            Object.keys(GETparameters).forEach((parameter) => validParameters.includes(parameter) || delete GETparameters[parameter]);

            if (isEmpty(GETparameters)) {
                this.resetState(false);
                return;
            }

            if (this.init) {
                this.init = false;
            }

            this.search_string =
                GETparameters.vyhledavani ? GETparameters.vyhledavani.replace(/_/g, ' ') : this.search_string;

            // a helper function
            const getObjFormat = function(str) {
                if (isEmpty(str)) return {};

                return str
                    .split(',')
                    .filter(str => str.length)
                    .reduce((obj, key, _) => {
                        obj[key] = true;
                        return obj;
                    }, {});
            };

            this.selected_tags = getObjFormat(GETparameters.stitky);
            this.selected_languages = getObjFormat(GETparameters.jazyky);
            this.selected_songbooks = getObjFormat(GETparameters.zpevniky);

            this.showAuthors = !!GETparameters.autori;
            this.descending = !!GETparameters.sestupne;

            if (GETparameters.nahoda) {
                this.seed = GETparameters.nahoda;
                this.seedLocked = true;
            }

            if (GETparameters.razeni) {
                this.sort = GETparameters.razeni;
            }

            this.updateHistoryState();
        },

        resetState(manual) {
            this.selected_tags = {};
            this.selected_languages = {};
            this.selected_songbooks = {};
            this.sort = 0;
            this.descending = false;

            if (manual) {
                this.init = true;
                if (document.getElementById('search-home')) {
                    document.getElementById('search-home').focus();
                }
                this.search_string = ''; // this prevents search box from being cleared after filters' load
                this.refreshSeed();
                this.updateHistoryState();
            }
        },

        queryLoaded() {
            if (this.search_string && this.init) {
                this.updateHistoryState();
                this.init = false;
            } else if (!this.init) {
                this.updateHistoryState();
            }
        },

        inputEnter() {
            this.init = false;
            if (this.search_string) {
                if (this.search_string == 'admin') {
                    window.location.href = this.adminUrl;
                } else if (!isNaN(parseInt(this.search_string, 10))) {
                    this.songLoading = true;
                    this.$apollo.query({
                        query: FETCH_SONG_ROUTE,
                        variables: {
                            song_number: this.search_string
                        }
                    }).then((response) => {
                        if (response.data.song_lyric_number) {
                            this.$router.push({
                                path: response.data.song_lyric_number.public_route
                            }).catch(err => {});
                        }
                        this.songLoading = false;
                    }).catch((err) => {
                        this.songLoading = false;
                    });
                }
            }
        },

        refreshSeed() {
            const randomInteger = function randomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            this.seedLocked = false;
            this.seed = randomInteger(1, 100000);
        }
    },

    mounted() {
        if (process.client) {
            window.onpopstate = this.applyStateChange;
            if (document.getElementById('navbar-brand')) {
                document.getElementById('navbar-brand').onclick = () => {this.resetState(true);};
            }
            if (document.getElementById('navbar-brand-small')) {
                document.getElementById('navbar-brand-small').onclick = () => {this.resetState(true);};
            }
            if (document.getElementById('search-home')) {
                document.getElementById('search-home').focus();
            }
        }
        // this.applyStateChange();
    },

    components: {
        Logo,
        AppLinks,
        SongsList,
        AuthorsList,
        Filters,
        InitFilters,
        News
    },

    computed: {
        /**
         * Note that there has to be sth together at the line with return,
         * otherwise js will see only return; and don't give a f*ck about the things below.
         *
         * @returns {boolean}
         */
        filters_active() {
            return (
                Object.keys(this.selected_songbooks).length +
                    Object.keys(this.selected_tags).length +
                    Object.keys(this.selected_languages).length >
                0
            );
        }
    },

    watch: {
        init(val) {
            if (val) {
                if (document.getElementById('search-home')) {
                    document.getElementById('search-home').focus();
                }
                this.seedLocked = false;
            } else {
                if (!this.search_string) {
                    this.seedLocked = true;
                    this.updateHistoryState();
                }
            }
        },

        showAuthors(val) {
            this.resetState(false);
        }
    }
};
</script>
