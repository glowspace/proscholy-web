<template>
    <div class="song-tags card pt-1" v-if="$apollo.loading || !tags_generic">
        <template v-for="(x, key2) in [1.3, 1.2, 1.4, 1.1, 1.2, 1.3]">
            <v-skeleton-loader type="heading" class="my-3" />
            <div
                class="tag d-inline-block"
                v-for="(w, key) in [400, 200, 300, 350, 250, 350, 400, 250, 200, 450]"
                :key="key + '.' + key2"
                :style="'width:' + (w/3)*x + 'px'"
            >&nbsp;</div>
        </template>
    </div>
    <div class="song-tags card pt-1" v-else>
        <div class="btn-group m-0 my-2 bg-light" role="group">
            <a
                class="btn btn-secondary"
                v-bind:class="{ chosen: !authors }"
                v-on:click="authors = false"
                >písně</a
            >
            <a
                class="btn btn-secondary mb-0"
                v-bind:class="{ chosen: authors }"
                v-on:click="authors = true"
                >autoři</a
            >
        </div>
        <!-- todo: make component -->
        <div v-if="!authors">
            <h4>Liturgie – mše svatá</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-blue',
                    isSelectedTag(tag) ? 'tag-selected' : ''
                ]"
                v-for="tag in tags_liturgy_part"
                v-bind:key="'tag-' + tag.id"
                v-on:click="selectTag(tag)"
                >{{ tag.name }}</a
            >

            <h4>Liturgický rok</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-blue',
                    isSelectedTag(tag) ? 'tag-selected' : ''
                ]"
                v-for="tag in tags_liturgy_period"
                v-bind:key="'tag-' + tag.id"
                v-on:click="selectTag(tag)"
                >{{ tag.name }}</a
            >

            <h4>Příležitosti</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-green',
                    isSelectedTag(tag) ? 'tag-selected' : ''
                ]"
                v-for="tag in tags_generic"
                v-bind:key="'tag-' + tag.id"
                v-on:click="selectTag(tag)"
                >{{ tag.name }}</a
            >

            <h4>Ke svatým</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-green',
                    isSelectedTag(tag) ? 'tag-selected' : ''
                ]"
                v-for="tag in tags_saints"
                v-bind:key="'tag-' + tag.id"
                v-on:click="selectTag(tag)"
                >{{ tag.name }}</a
            >

            <h4>Zpěvníky</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-yellow',
                    isSelectedSongbook(songbook) ? 'tag-selected' : ''
                ]"
                v-for="songbook in songbooks"
                v-bind:key="'songbook-' + songbook.id"
                v-on:click="selectSongbook(songbook)"
                >{{ songbook.name }}</a
            >

            <h4>Jazyky</h4>
            <a
                v-bind:class="[
                    'tag',
                    'tag-red',
                    isSelectedLanguage(lang_code) ? 'tag-selected' : ''
                ]"
                v-for="(lang_name, lang_code) in all_languages"
                v-bind:key="'lang-' + lang_code"
                v-on:click="selectLanguage(lang_code)"
                >{{ lang_name }}</a
            >
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Vue from 'vue'

const FETCH_TAGS_AND_SONGBOOKS = gql`
    query {
        tags_generic: tags_enum(type: GENERIC) {
            id
            name
        }
        tags_liturgy_part: tags_enum(type: LITURGY_PART) {
            id
            name
        }
        tags_liturgy_period: tags_enum(type: LITURGY_PERIOD) {
            id
            name
        }
        tags_saints: tags_enum(type: SAINTS) {
            id
            name
        }
        songbooks(is_private: false) {
            id
            name
            shortcut
        }
    }
`;

export default {
    props: ['selected-tags', 'selected-songbooks', 'selected-languages', 'show-authors'],

    data() {
        return {
            selected_tags: {},
            selected_songbooks: {},
            selected_languages: {},
            all_languages: {
                cs: 'čeština',
                sk: 'slovenština',
                en: 'angličtina',
                la: 'latina',
                pl: 'polština',
                de: 'němčina',
                fr: 'francouzština',
                es: 'španělština',
                it: 'italština',
                sv: 'svahilština',
                he: 'hebrejština',
                cu: 'staroslověnština',
                mixed: 'vícejazyčná píseň'
            },
            authors: this.showAuthors
        };
    },

    apollo: {
        tags_generic: {
            query: FETCH_TAGS_AND_SONGBOOKS
        },
        tags_liturgy_part: {
            query: FETCH_TAGS_AND_SONGBOOKS
        },
        tags_liturgy_period: {
            query: FETCH_TAGS_AND_SONGBOOKS
        },
        tags_saints: {
            query: FETCH_TAGS_AND_SONGBOOKS
        },
        songbooks: {
            query: FETCH_TAGS_AND_SONGBOOKS
        }
    },

    methods: {
        selectTag(tag) {
            if (!this.isSelectedTag(tag)) {
                Vue.set(this.selected_tags, tag.id, true);
            } else {
                Vue.delete(this.selected_tags, tag.id);
            }

            // notify the parent that sth has changed
            this.$emit('update:selected-tags', this.selected_tags);
            this.$emit('input', null);
        },

        selectSongbook(songbook) {
            if (!this.isSelectedSongbook(songbook)) {
                Vue.set(this.selected_songbooks, songbook.id, true);
            } else {
                Vue.delete(this.selected_songbooks, songbook.id);
            }

            // notify the parent that sth has changed
            this.$emit('update:selected-songbooks', this.selected_songbooks);
            this.$emit('input', null);
        },

        selectLanguage(language) {
            if (!this.isSelectedLanguage(language)) {
                Vue.set(this.selected_languages, language, true);
            } else {
                Vue.delete(this.selected_languages, language);
            }

            // notify the parent that sth has changed
            this.$emit('update:selected-languages', this.selected_languages);
            this.$emit('input', null);
        },

        isSelectedTag(tag) {
            return this.selected_tags[tag.id];
        },

        isSelectedSongbook(songbook) {
            return this.selected_songbooks[songbook.id];
        },

        isSelectedLanguage(language) {
            return this.selected_languages[language];
        },

        getSelectedTagsDcnf() {
            const filterMapTags = tags =>
                tags.filter(tag => this.isSelectedTag(tag)).map(tag => tag.id);

            return {
                liturgy_part: this.tags_liturgy_part ? filterMapTags(this.tags_liturgy_part) : [],
                liturgy_period: this.tags_liturgy_period ? filterMapTags(this.tags_liturgy_period) : [],
                generic: this.tags_generic ? filterMapTags(this.tags_generic) : [],
                saints: this.tags_saints ? filterMapTags(this.tags_saints) : []
            };
        }
    },

    watch: {
        tags_generic(val, prev) {
            if (val && !prev) {
                this.$emit('tags-loaded', null);
            }
        },

        // watch props for changes
        selectedTags(val, prev) {
            this.selected_tags = val;

            // ok this needs to be here because otherwise the applyStateChange method on Search.vue
            // doesn't work properly when updating only the selectedTags property
            this.$emit('update:selected-tags-dcnf', this.getSelectedTagsDcnf());
        },

        selectedSongbooks(val, prev) {
            this.selected_songbooks = val;
        },

        selectedLanguages(val, prev) {
            this.selected_languages = val;
        },

        authors(val, prev) {
            this.$emit('update:show-authors', val);
        }
    }
};
</script>
