<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark absolute-top">
            <div class="container">
                <nuxt-link to="/" class="navbar-brand" id="navbar-brand">
                    <img
                        src="/img/logo.svg"
                        style="padding-right:10px"
                        width="60"
                        alt="logo"
                    /><h1 v-if="$nuxt.$route.path == '/'" class="home-h1">Zpěvník pro scholy</h1>
                    <span v-else>Zpěvník pro scholy</span>
                </nuxt-link>
                <div class="d-inline-flex">
                    <nuxt-link
                        to="/"
                        :class="[{ active: isHome }, 'btn btn-secondary mr-1']"
                    ><i class="fas fa-search"></i> Vyhledávání</nuxt-link>
                    <nuxt-link
                        to="/o-zpevniku"
                        class="btn btn-secondary mr-1"
                        active-class="active"
                    ><i class="fas fa-info"></i> O&nbsp;zpěvníku</nuxt-link>
                    <dark-mode-button v-cloak> Tmavý&nbsp;mód</dark-mode-button>
                </div>
            </div>
        </nav>

        <a class="invisible btn btn-secondary mobile-padding-button">
            <i class="fas fa-search"></i>
        </a>

        <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
            <div class="container">
                <nuxt-link to="/" class="btn" id="navbar-brand-small">
                    <img src="/img/logo.svg" height="24" alt="logo"
                /></nuxt-link>

                <nuxt-link to="/" class="btn btn-secondary" :class="[{ active: isHome }, 'btn btn-secondary']"
                    ><i class="fas fa-search"></i
                ></nuxt-link>

                <nuxt-link to="/o-zpevniku" class="btn btn-secondary" active-class="active"
                    ><i class="fas fa-info"></i
                ></nuxt-link>

                <dark-mode-button></dark-mode-button>
            </div>
        </nav>
    </div>
</template>

<script>
import DarkModeButton from '~/components/DarkModeButton';

export default {
    name: 'Navbar',

    components: { DarkModeButton },

    computed: {
        isHome() {
            return this.$nuxt.$route.name == 'index';
        }
    }
};
</script>
