<template>
    <nuxt-link v-if="type == TYPE_NUXTLINK" :to="link">
        <slot></slot>
    </nuxt-link>
    <a :href="link" v-else-if="type == TYPE_NORMAL">
        <slot></slot>
    </a>
    <a :href="link" target="_blank" v-else-if="type == TYPE_BLANK">
        <slot></slot>
    </a>
    <span v-else>
        <slot></slot>
    </span>
</template>

<script>

// SUPPORTED MEDIA TYPES

// see https://github.com/proscholy/api.regenschori.cz/blob/development/graphql/news.graphql
// respectively the enum LinkType in the graphql schema

const TYPE_NORMAL = 'NORMAL';
const TYPE_NUXTLINK = 'NUXTLINK';
const TYPE_BLANK = 'BLANK';
const TYPE_IMAGE = 'IMAGE';
const TYPE_YOUTUBE = 'YOUTUBE';
const TYPE_VIDEO = 'VIDEO';
const TYPE_IFRAME = 'IFRAME';
const TYPE_PDF = 'PDF';

// todo import bigimage

export default {
    props: ['type', 'link']
};
</script>
