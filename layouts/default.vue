<template>
    <div id="app">
        <navbar />
        <nuxt />
    </div>
</template>

<script>
import Navbar from '~/components/Navbar';

export default {
    components: { Navbar },

    data() {
        return {
            baseUrl: process.env.baseUrl
        }
    },

    head() {
        return {
            meta: [
                {property: 'og:url', content: this.baseUrl + this.$nuxt.$route.path},
                {property: 'twitter:url', content: this.baseUrl + this.$nuxt.$route.path}
            ]
        }
    }
};
</script>
