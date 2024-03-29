<template>
    <div class="container" v-if="$apollo.loading">
        <v-skeleton-loader type="heading" class="mt-4" />
        <v-skeleton-loader type="text" class="mt-3 mb-3" max-width="100" />
        <author-songs-list-loading />
    </div>
    <div class="container" v-else-if="author">
        <div class="mb-3">
            <h1 class="mb-0">{{ author.name }}</h1>
            <span class="text-secondary pl-1">{{ author.type_string }}</span>
        </div>

        <div class="card" v-if="author.description">
            <div class="card-header p-1">
                <div class="px-3 py-2 d-inline-block">
                    O {{ aboutStrings[author.type] }}
                </div>
            </div>
            <div class="card-body">{{ author.description }}</div>
        </div>

        <div class="card" v-if="author.members.length">
            <div class="card-body">
                <span>Související autoři:</span>
                <span v-for="(members, key) in author.members" :key="key">
                    <span v-if="key">,</span>
                    <nuxt-link :to="members.public_route">{{
                        members.name
                    }}</nuxt-link>
                </span>
            </div>
        </div>

        <div class="card" v-if="author.memberships.length">
            <div class="card-body">
                <span>Skupiny:</span>
                <span
                    v-for="(membership, key2) in author.memberships"
                    :key="key2"
                >
                    <span v-if="key2">,</span>
                    <nuxt-link :to="membership.public_route">{{
                        membership.name
                    }}</nuxt-link>
                </span>
            </div>
        </div>

        <author-songs-list
            text="Autorské písně"
            v-if="author.songs_originals.length"
            :songs="author.songs_originals"
        />
        <author-songs-list
            text="Překlady"
            v-if="author.songs_translations.length"
            :songs="author.songs_translations"
        />
        <author-songs-list
            text="Interpretace písní"
            v-if="author.songs_interpreted.length"
            :songs="author.songs_interpreted"
        />

        <div class="p-1 mb-3 mt-n2">
            <div class="px-3 py-2 d-inline-block">
                Zpěvník ProScholy.cz <img src="/img/logo.svg" width="20px" />
                {{ new Date().getFullYear() }}
            </div>
            <div class="float-right">
                <a
                    class="btn btn-secondary"
                    :href="
                        'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/21?customfield_10056=' +
                            encodeURIComponent(baseUrl + $route.fullPath)
                    "
                    >Nahlásit</a
                >
                <a
                    v-if="author"
                    class="btn btn-secondary"
                    :href="adminUrl + '/author/' + author.id + '/edit'"
                    >Upravit</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import AuthorSongsList from './AuthorSongsList';
import AuthorSongsListLoading from './AuthorSongsListLoading';
import gql from 'graphql-tag';

const FETCH_AUTHOR = gql`
    query($id: ID!) {
        author(id: $id) {
            id
            name
            type
            type_string
            description
            public_route
            members {
                name
                public_route
            }
            memberships {
                name
                public_route
            }
            songs_originals {
                ...slFields
            }
            songs_translations {
                ...slFields
            }
            songs_interpreted {
                ...slFields
            }
        }
    }

    fragment slFields on SongLyric {
        type
        name
        secondary_name_1
        secondary_name_2
        public_route
        authors_pivot {
            pivot {
                author {
                    name
                    public_route
                }
                authorship_type
            }
        }
        song {
            song_lyrics {
                type
                name
                public_route
                authors_pivot {
                    pivot {
                        author {
                            name
                            public_route
                        }
                        authorship_type
                    }
                }
            }
        }
    }
`;

export default {
    name: 'Author',

    components: {
        AuthorSongsList,
        AuthorSongsListLoading
    },

    head() {
        return {
            title: this.getTitle(),
            meta: [
                { property: 'og:title', content: this.getTitle() },
                { property: 'twitter:title', content: this.getTitle() },
                { name: 'description', content: this.getDescription() },
                { property: 'og:description', content: this.getDescription() },
                {
                    property: 'twitter:description',
                    content: this.getDescription()
                }
            ]
        };
    },

    data() {
        return {
            baseUrl: process.env.baseUrl,
            titleWebsite: process.env.titleWebsite,
            titleSeparator: process.env.titleSeparator,
            adminUrl: process.env.adminUrl,
            aboutStrings: [
                'autorovi',
                'hudebním uskupení',
                'schole',
                'kapele',
                'sboru'
            ],
            thisStrings: [
                'tohoto autora',
                'tohoto hudebního uskupení',
                'této scholy',
                'této kapely',
                'tohoto sboru'
            ]
        };
    },

    methods: {
        getTitle() {
            return (
                (this.author ? this.author.name : 'Autor') +
                this.titleSeparator +
                this.titleWebsite
            );
        },

        getDescription() {
            if (this.author && this.author.description) {
                return this.author.description;
            }

            let str = 'Písně i ';
            let type = this.author && this.author.type ? this.author.type : 0;
            str += this.thisStrings[type];
            str += ' najdete ve Zpěvníku pro scholy.';
            return str;
        }
    },

    apollo: {
        author: {
            query: FETCH_AUTHOR,
            variables() {
                return {
                    id: this.$route.params.id
                };
            }
        }
    },

    mounted() {
        if (!this.$apollo.loading && this.author === null) {
            this.$nuxt.error({ statusCode: 404 });
        }
    }
};
</script>
