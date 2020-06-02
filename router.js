import Vue from 'vue';
import Router from 'vue-router';

import Search from '~/pages/search/Search';
import AboutSongBook from '~/pages/about/AboutSongBook';
import Song from '~/pages/song/Song';
import Author from '~/pages/author/Author';
import Login from '~/pages/account/Login';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: Search },

            { path: '/o-zpevniku', component: AboutSongBook },
            { path: '/pisen/:id/:slug', component: Song },
            { path: '/autor/:id', component: Author },

            { path: '/muj-ucet', component: Login }
        ]
    });
}
