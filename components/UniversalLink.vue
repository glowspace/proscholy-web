<template>
    <nuxt-link v-if="type == 'NUXTLINK'" :to="link">
        <slot></slot>
    </nuxt-link>
    <a :href="link" v-else-if="type == 'NORMAL'">
        <slot></slot>
    </a>
    <a :href="link" target="_blank" v-else-if="type == 'BLANK'">
        <slot></slot>
    </a>
    <span v-else>
        <slot></slot>
    </span>
</template>

<script>

// todo import bigimage

export default {
    props: ['type', 'link']
};
</script>
