<template>
    <div class="d-flex flex-column mr-n3 position-relative">
        <a
            class="btn btn-secondary m-0"
            :title="[
                !fullscreen
                    ? 'Zobrazit na celou obrazovku'
                    : 'Zrušit zobrazení na celou obrazovku'
            ]"
            @click="toggleFullscreen"
            ><i
                class="fas"
                :class="[fullscreen ? 'fa-compress' : 'fa-expand']"
            ></i
        ></a>
        <!-- <a
            class="btn btn-secondary m-0"
            :title="[
                !columns
                    ? 'Zobrazit text ve sloupcích'
                    : 'Zrušit zobrazení ve sloupcích'
            ]"
            @click="toggleColumns"
            ><i
                class="fas"
                :class="[columns ? 'fa-align-justify' : 'fa-columns']"
            ></i
        ></a> -->
        <a
            class="btn btn-secondary m-0 nosleep"
            :title="[
                !nosleep
                    ? 'Blokovat zhasínání displeje'
                    : 'Přestat blokovat zhasínání displeje'
            ]"
            @click="toggleNosleep"
            ><i class="fa-sun" :class="[nosleep ? 'far' : 'fas']"></i
        ></a>
        <a class="btn btn-secondary nosleep-caption">{{
            !nosleep
                ? 'zhasínání&nbsp;displeje není&nbsp;blokováno'
                : 'zhasínání&nbsp;displeje je&nbsp;blokováno'
        }}</a>
        <!-- <a
            class="btn btn-secondary m-0"
            :title="[
                !starred
                    ? 'Označit píseň hvězdičkou'
                    : 'Zrušit hvězdičku'
            ]"
            @click="toggleStar"
            ><i class="fa-star" :class="[starred ? 'fas' : 'far']"></i
        ></a> -->
    </div>
</template>

<script>
import NoSleep from 'nosleep.js';

export default {
    data() {
        return {
            fullscreen: false,
            nosleep: false,

            noSleeper: process.client ? new NoSleep() : null
        };
    },

    methods: {
        toggleFullscreen() {
            if (process.client) {
                var element = document.documentElement;
                var isFullscreen =
                    document.webkitIsFullScreen ||
                    document.mozFullScreen ||
                    false;
                element.requestFullScreen =
                    element.requestFullScreen ||
                    element.webkitRequestFullScreen ||
                    element.mozRequestFullScreen ||
                    function() {
                        return false;
                    };
                document.cancelFullScreen =
                    document.cancelFullScreen ||
                    document.webkitCancelFullScreen ||
                    document.mozCancelFullScreen ||
                    function() {
                        return false;
                    };
                if (isFullscreen) {
                    document.cancelFullScreen();
                } else {
                    element.requestFullScreen();
                }
            }
        },

        toggleNosleep() {
            this.nosleep = !this.nosleep;

            if (this.nosleep) {
                this.noSleeper.enable();
            } else {
                this.noSleeper.disable();
            }
        },

        fullscreenChanged() {
            this.fullscreen = !this.fullscreen;
        }
    },

    mounted() {
        if (process.client) {
            document.addEventListener(
                'fullscreenchange',
                this.fullscreenChanged
            );
            document.addEventListener(
                'mozfullscreenchange',
                this.fullscreenChanged
            );
            document.addEventListener(
                'webkitfullscreenchange',
                this.fullscreenChanged
            );
            document.addEventListener(
                'msfullscreenchange',
                this.fullscreenChanged
            );
        }
    }
};
</script>
