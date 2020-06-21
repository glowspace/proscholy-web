<template>
    <div class="background-home">
        <div class="container">
            <div :class="[init ? 'home-init' : 'home-afterinit']">
                <logo />

                <div
                    class="row fixed-top position-sticky mt-n4 justify-content-center zindex-lower"
                >
                    <div
                        :class="[
                            { 'col-lg-6': init },
                            'col-lg-8 px-1 pt-5 pb-3 search-column'
                        ]"
                    >
                        <div class="search-wrapper shadow">
                            <input
                                type="search"
                                class="search-home"
                                placeholder="Zadejte název písně, část textu nebo jméno autora"
                                v-model="search_string"
                                v-on:keyup.enter="init = false"
                                autofocus
                            />
                            <button
                                type="button"
                                class="search-submit"
                                v-if="init"
                                @click="init = false"
                            >
                                <i class="fa fa-search d-none d-sm-inline"></i>
                            </button>
                            <button
                                type="button"
                                class="search-submit d-none d-lg-inline"
                                v-if="!init"
                            >
                                <i class="fa fa-search"></i>
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
                                <i class="fa fa-filter"></i>
                            </button>
                        </div>
                        <div
                            v-if="init"
                            @click="
                                resetState(true);
                                init = false;
                            "
                            class="text-center pt-4 text-white"
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
                                v-bind:selected-songbooks.sync="
                                    selected_songbooks
                                "
                                v-bind:selected-tags.sync="selected_tags"
                                v-bind:selected-languages.sync="
                                    selected_languages
                                "
                                v-on:update:selected-tags-dcnf="
                                    updateSelectedTagsDcnf($event)
                                "
                                v-on:input="updateHistoryState"
                            ></Filters>
                        </div>
                    </div>
                    <div class="col-lg-4 search-balance"></div>
                </div>
                <div class="row" v-show="!init">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body p-0">
                                <SongsList
                                    v-bind:search-string="search_string"
                                    v-bind:selected-tags-dcnf="
                                        selected_tags_dcnf
                                    "
                                    v-bind:selected-tags="selected_tags"
                                    v-bind:selected-songbooks="
                                        selected_songbooks
                                    "
                                    v-bind:selected-languages="
                                        selected_languages
                                    "
                                    v-bind:init="init"
                                    v-on:query-loaded="queryLoaded"
                                ></SongsList>
                            </div>
                        </div>
                    </div>
                    <div
                        class="col-lg-4 d-none d-lg-block desktop-filter-container"
                    >
                        <div class="fixed-top position-sticky">
                            <!-- filters shown only for desktop -->
                            <Filters
                                v-bind:selected-songbooks.sync="
                                    selected_songbooks
                                "
                                v-bind:selected-tags.sync="selected_tags"
                                v-bind:selected-languages.sync="
                                    selected_languages
                                "
                                v-on:update:selected-tags-dcnf="
                                    updateSelectedTagsDcnf($event)
                                "
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
import Filters from './components/Filters';
import AppLinks from './components/AppLinks';
import Logo from './components/Logo';

import { isEmpty } from 'lodash';

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
                class: ['home']
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

            // dcnf - disjunctive canonical normal form :)
            selected_tags_dcnf: {},

            // View state
            init: true,
            displayFilter: false,

            // Title
            titleWebsite: process.env.titleWebsite,
            titleSeparator: process.env.titleSeparator
        };
    },

    methods: {
        getTitle() {
            return this.titleWebsite + this.titleSeparator + 'chytrý křesťanský zpěvník';
        },

        getDescription() {
            return '';
        },

        updateSelectedTagsDcnf(event) {
            this.selected_tags_dcnf = event;
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

            this.$router.replace({
                path: '/',
                query: GETparameters
            }).catch(err => {});
        },

        applyStateChange(event) {
            let GETparameters = this.$route.query;

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
            this.selected_languages = getObjFormat(GETparameters.jayzky);
            this.selected_songbooks = getObjFormat(GETparameters.zpevniky);
        },

        resetState(update_url) {
            this.selected_tags = {};
            this.selected_languages = {};
            this.selected_songbooks = {};

            if (update_url) {
                this.search_string = ''; // this prevents search box from being cleared after filters' load
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
        }
    },

    mounted() {
        if (process.client) {
            window.onpopstate = this.applyStateChange;
            document.getElementsByClassName('navbar-brand')[0].onclick = () => {this.resetState(true); this.init = true;};
            document.getElementsByClassName('search-home')[0].focus();
        }
        // this.applyStateChange();
    },

    components: {
        Logo,
        AppLinks,
        SongsList,
        Filters
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
            if (!val) {
                document.getElementsByTagName('body')[0].classList.remove('home-scroll');
                setTimeout(() => {document.getElementsByTagName('body')[0].classList.add('home-scroll');}, 200);
            } else {
                document.getElementsByTagName('body')[0].classList.remove('home-scroll');
                document.getElementsByClassName('search-home')[0].focus();
            }
        }
    }
};
</script>
