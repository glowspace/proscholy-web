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
            { name: 'index', path: '/', component: Search },

            { path: '/o-zpevniku', component: AboutSongBook },
            { path: '/pisen/:id*', component: Song },
            { path: '/autor/:id', component: Author },

            { path: '/muj-ucet', component: Login },

            { path: '/vanoce', redirect: { name: 'index', query: { stitky: '22' } } },
            { path: '/velikonoce', redirect: { name: 'index', query: { stitky: '23' } } },
            { path: '/advent', redirect: { name: 'index', query: { stitky: '24' } } },
            { path: '/postni-doba', redirect: { name: 'index', query: { stitky: '25' } } }
        ],
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }

    });
}
