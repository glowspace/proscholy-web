<template>
    <div class="card news" v-if="news && news.length">
        <span class="news-item"><b>Aktuálně:</b></span>
        <UniversalLink v-for="(item, key) in news" :key="key" :type="item.type" :link="item.link" classes="news-item">
            <i v-if="item.fa_icon_class" :class="item.fa_icon_class"></i>{{ item.text }}
        </UniversalLink>
        <slot></slot>
    </div>
</template>

<script>

import UniversalLink from '~/components/UniversalLink';
import gql from 'graphql-tag';

// const FETCH_NEWS = gql`
//     query {
//         news {
//             text
//             fa_icon_class
//             link
//             type
//         }
//     }
// `;

export default {
    name: 'News',

    components: { UniversalLink },

    data() {
        return {
            news: [
                // {
                //     text: 'Zpěvníková šifra',
                //     fa_icon_class: 'fa fa-key',
                //     link: 'https://zpevnik.proscholy.cz/preview/501/a-mezidobi-11.pdf',
                //     type: 'PDF'
                // }
            ]
        };
    },

    // apollo: {
    //     news: {
    //         query: FETCH_NEWS
    //     }
    // }
};
</script>
