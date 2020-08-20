<template>
    <div class="card news" v-if="news && news.length">
        <span class="news-item"><b>Aktuálně:</b></span>
        <template v-for="(item, key) in news">
            <nuxt-link v-if="item.nuxt && item.link" :to="item.link" class="news-item"><i v-if="item.icon" :class="item.icon"></i>{{ item.text }}</nuxt-link>
            <a v-else-if="item.link" :href="item.link" class="news-item"><i v-if="item.icon" :class="item.icon"></i>{{ item.text }}</a>
            <span v-else="item.link" class="news-item"><i v-if="item.icon" :class="item.icon"></i>{{ item.text }}</span>
        </template>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'News',

    data() {
        return {
            news: [
                // {text: 'nová zpěvníková šifra', icon: 'fas fa-key', link: '/o-zpevniku', nuxt: true}
                // waiting for graphql endpoint
            ]
        };
    }
};
</script>
