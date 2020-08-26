import Vue from 'vue';
import Router from 'vue-router';

import Search from '~/pages/search/Search';
import AboutSongBook from '~/pages/about/AboutSongBook';
import Song from '~/pages/song/Song';
import Author from '~/pages/author/Author';
import Support from '~/pages/support/Support';
import Login from '~/pages/account/Login';

import SongExample from '~/pages/song/components/ExperimentalRenderer/SongExample';

Vue.use(Router);

export function createRouter() {
    let routes = [
        { name: 'index', path: '/', component: Search },

        { path: '/o-zpevniku', component: AboutSongBook },
        { path: '/pisen/:id/*', component: Song },
        { path: '/autor/:id', component: Author },

        { path: '/napoveda', component: Support },

        { path: '/vanoce', redirect: { name: 'index', query: { stitky: '22' } } },
        { path: '/velikonoce', redirect: { name: 'index', query: { stitky: '23' } } },
        { path: '/advent', redirect: { name: 'index', query: { stitky: '24' } } },
        { path: '/postni-doba', redirect: { name: 'index', query: { stitky: '25' } } }
    ];
    
    if (process.env.ENABLE_EXPERIMENTAL_ROUTES) {
        routes.push({ path: '/muj-ucet', component: Login });
        routes.push({ path: '/renderer', component: SongExample });
    }

    return new Router({
        mode: 'history',
        routes: routes,
        scrollBehavior (to, from, savedPosition) {
            if (to.hash) {
                return { selector: to.hash }
            } else if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    });
}
