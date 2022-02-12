<template>
    <div id="app"
         class="container-fluid">
        <div class="row mr-0">
            <div class="col wrapper-inventory">
                <inventory/>
            </div>
            <div class="col wrapper-content">
                <navbar></navbar>

                <div class="wrapper-page">
                    <nuxt/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Navbar from '~/components/Navbar';
import Inventory from "~/components/Inventory";

export default {
    components: {Inventory, Navbar},

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
            ],
            htmlAttrs: {
                lang: 'cs'
            }
        }
    },

    mounted() {
        // http://patorjk.com/software/taag/#p=display&f=Ivrit&t=ProScholy.cz
        console.log("%c  ____           ____       _           _                 \n |  _ \\ _ __ ___/ ___|  ___| |__   ___ | |_   _   ___ ____\n | |_) | '__/ _ \\___ \\ / __| '_ \\ / _ \\| | | | | / __|_  /\n |  __/| | | (_) |__) | (__| | | | (_) | | |_| || (__ / / \n |_|   |_|  \\___/____/ \\___|_| |_|\\___/|_|\\__, (_)___/___|\n                                          |___/           ",
            "font-family: monospace; font-weight: bold;");
        console.log("Hmm, asi se tady vyznáš… Stále hledáme posily do našeho týmu vývojářů, takže jestli se k nám chceš přidat, neváhej nás kontaktovat na redakce@proscholy.cz.");
    }
};
</script>

<style lang="scss">
#app {
    max-height:    100vh;
    padding-right: 0;
    padding-left:  0;


    .wrapper-inventory {
        flex: 0 0 240px;
        padding-right: 0;
    }

    .wrapper-content {
        height:   100vh;
        padding: 0;

        .wrapper-page {
            padding: 0 3em;
            overflow: scroll;
            height: calc(100vh - 70px)
        }
    }
}


</style>
