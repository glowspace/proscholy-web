<template>
    <span>
        <span v-if="song.type">
            <span v-if="original">
                <span>Originál: </span>
                <nuxt-link :to="original.public_route">{{ original.name }}</nuxt-link><br>
                <span v-if="!original.authors.length">Autor neznámý,</span>
                <span v-else>
                    <span v-if="original.authors.length == 1">Autor:</span>
                    <span v-else>Autoři:</span>
                    <span v-for="(author, key) in original.authors" v-bind:key="key">
                        <nuxt-link :to="author.public_route">{{ author.name }}</nuxt-link><span>, </span>
                    </span>
                </span>
            </span>

            <span v-if="!song.authors.length">{{original?'a':'A'}}utor překladu neznámý</span>
            <span v-else>
                <span v-if="song.authors.length == 1">{{original?'a':'A'}}utor překladu:</span>
                <span v-else>{{original?'a':'A'}}utoři překladu:</span>
                <span v-for="(author, key2) in song.authors" v-bind:key="key2">
                    <span v-if="key2">,</span> <nuxt-link :to="author.public_route">{{ author.name }}</nuxt-link>
                </span>
            </span>
        </span>
        <span v-else>
            <span v-if="!song.authors.length">Autor neznámý</span>
            <span v-else>
                <span v-if="song.authors.length == 1">Autor:</span>
                <span v-else>Autoři:</span>
                <span v-for="(author, key3) in song.authors" v-bind:key="key3">
                    <span v-if="key3">,</span> <nuxt-link :to="author.public_route">{{ author.name }}</nuxt-link>
                </span>
            </span>
        </span>
    </span>
</template>

<script>
export default {
    name: 'SongAuthorLabel',

    props: ['song'],

    computed: {
        original: function() {
            for (let index = 0; index < this.song.song.song_lyrics.length; index++) {
                const element = this.song.song.song_lyrics[index];
                if(!element.type) {
                    return {
                        name: element.name,
                        public_route: element.public_route,
                        authors: element.authors
                    };
                }
            }
            return false;
        }
    }
};
</script>
