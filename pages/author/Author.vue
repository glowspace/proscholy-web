<template>
    <div class="container" v-if="$apollo.loading">
        <v-skeleton-loader type="heading" class="mt-4" />
        <v-skeleton-loader type="text" class="mt-3" max-width="100" />
        <br>
        <author-songs-list-loading />
    </div>
    <div class="container" v-else-if="author">
        <h2 style="margin-bottom: 0">{{ author.name }}</h2>

        <span style="color:dimgrey" v-if="author.type == 0">autor</span>
        <span style="color:dimgrey" v-else-if="author.type == 1">hudební uskupení</span>
        <span style="color:dimgrey" v-else-if="author.type == 2">schola</span>
        <span style="color:dimgrey" v-else-if="author.type == 3">kapela</span>
        <span style="color:dimgrey" v-else-if="author.type == 4">sbor</span>

        <br><br>

        <div class="card" v-if="author.description">
            <div class="card-header p-1">
                <div class="px-3 py-2 d-inline-block">
                    <span>O</span>
                    <span v-if="author.type == 0">autorovi</span>
                    <span v-else-if="author.type == 1">hudebním uskupení</span>
                    <span v-else-if="author.type == 2">schole</span>
                    <span v-else-if="author.type == 3">kapele</span>
                    <span v-else-if="author.type == 4">sboru</span>
                </div>
            </div>
            <div class="card-body">{{ author.description }}</div>
        </div>

        <div class="card" v-if="author.members.length">
            <div class="card-body">
                <span>Členové:</span>
                <span v-for="(members, key) in author.members" :key="key">
                    <span v-if="key">,</span> <nuxt-link :to="members.public_route">{{ members.name }}</nuxt-link>
                </span>
            </div>
        </div>

        <div class="card" v-if="author.memberships.length">
            <div class="card-body">
                <span>Skupiny:</span>
                <span v-for="(membership, key2) in author.memberships" :key="key2">
                    <span v-if="key2">,</span> <nuxt-link :to="membership.public_route">{{ membership.name }}</nuxt-link>
                </span>
            </div>
        </div>

        <!-- todo: implement missing api features -->
        <author-songs-list text="Autorské písně" v-if="author.songs_originals.length" :songs="author.songs_originals" />
        <author-songs-list text="Překlady" v-if="author.songs_translations.length" :songs="author.songs_translations" />
        <author-songs-list text="Interpretace písní" v-if="author.songs_interpreted.length" :songs="author.songs_interpreted" />

        <div class="p-1 mb-3 mt-n2">
            <div class="px-3 py-2 d-inline-block">Zpěvník ProScholy.cz <img
                src="/img/logo_v2.png" width="20px" /> {{ new Date().getFullYear() }}</div>
            <a class="btn btn-secondary float-right m-0" target="_blank"
            :href="'https://docs.google.com/forms/d/e/1FAIpQLScmdiN_8S_e8oEY_jfEN4yJnLq8idxUR5AJpFmtrrnvd1NWRw/viewform?usp=pp_url&entry.1025781741='
            + encodeURIComponent(author.public_route)">Nahlásit</a>
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
            name
            type
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
            songs_originals { ...slFields }
            songs_translations { ...slFields }
            songs_interpreted { ...slFields }
        }
    }

    fragment slFields on SongLyric {
        type
        name
        public_route
        authors {
            name
            public_route
        }
        song {
            song_lyrics {
                type
                name
                public_route
                authors {
                    name
                    public_route
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
        if(!this.$apollo.loading && this.author === null) {
            this.$nuxt.error({ statusCode: 404 });
        }
    }
};
</script>
