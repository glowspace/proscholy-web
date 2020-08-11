<template>
    <div class="song-tags card pt-1" v-if="$apollo.loading || !tags">
    </div>
    <div class="song-tags card pt-1" v-else>
        <a
            v-bind:class="[
                'tag'
            ]"
            v-for="tag in randomTags"
            :key="'tag-' + tag.id"
            @click="selectTag(tag)"
            >{{ tag.name }}</a
        >
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Vue from 'vue'

const FETCH_TAGS = gql`
    query {
        tags: tags_enum {
            id
            name
        }
    }
`;

export default {
    props: ['selected-tags'],

    data() {
        return {
            selected_tags: {}
        };
    },

    apollo: {
        tags: {
            query: FETCH_TAGS
        }
    },

    computed: {
        randomTags() {
            return [];
        }
    },

    methods: {
        selectTag(tag) {
            Vue.set(this.selected_tags, tag.id, true);

            // notify the parent that sth has changed
            this.$emit('update:selected-tags', this.selected_tags);
            this.$emit('input', null);
        }
    }
};
</script>
