<template>
    <span>
        <template v-if="link">
            <a v-if="type == TYPE_BLANK" :href="link" target="_blank" :class="classes">
                <slot></slot>
            </a>
            <nuxt-link v-else-if="type == TYPE_NUXTLINK" :to="link" :class="classes">
                <slot></slot>
            </nuxt-link>
            <a
                v-else-if="[TYPE_IMAGE, TYPE_YOUTUBE, TYPE_VIDEO, TYPE_IFRAME, TYPE_PDF].includes(type)"
                :href="link" target="_blank" @click.prevent="openBP($event, link, type)" :class="classes"
            >
                <slot></slot>
            </a>
            <a v-else :href="link" :class="classes">
                <slot></slot>
            </a>
        </template>
        <span v-else :class="classes">
            <slot></slot>
        </span>
    </span>
</template>

<script>

// SUPPORTED MEDIA TYPES

// see https://github.com/proscholy/api.regenschori.cz/blob/development/graphql/news.graphql
// respectively the enum LinkType in the graphql schema

const TYPE_NORMAL = 'NORMAL';
const TYPE_NUXTLINK = 'NUXTLINK';
const TYPE_BLANK = 'BLANK';
const TYPE_IMAGE = 'IMAGE';
const TYPE_YOUTUBE = 'YOUTUBE';
const TYPE_VIDEO = 'VIDEO';
const TYPE_IFRAME = 'IFRAME';
const TYPE_PDF = 'PDF';

// todo import bigimage
import BigPicture from 'bigpicture';
import Bowser from 'bowser';

export default {
    props: ['type', 'link', 'classes'],

    data() {
        return {
            browser: process.client
                ? Bowser.getParser(window.navigator.userAgent)
                : null,
            supportPdfIframesCondition: {
                mobile: {
                    chrome: '>1000'
                },
                desktop: {
                    chrome: '>70',
                    firefox: '>60'
                }
            }
        };
    },

    methods: {
        openBP(e, link, type) {
            switch (type) {
                case TYPE_IMAGE:
                    BigPicture({el: e.target, imgSrc: link});
                    break;

                case TYPE_YOUTUBE:
                    BigPicture({el: e.target, ytSrc: link.replace(/.*(([?&]v=)|(\/))([^?&]+).*/g, '$4')});
                    break;

                case TYPE_VIDEO:
                    BigPicture({el: e.target, vidSrc: link});
                    break;

                case TYPE_PDF:
                    if (this.browser.satisfies(this.supportPdfIframesCondition)) {
                        BigPicture({el: e.target, iframeSrc: link});
                    } else {
                        BigPicture({el: e.target, iframeSrc: 'https://docs.google.com/viewer?embedded=true&url=' + link});
                    }
                    break;

                default:
                    BigPicture({el: e.target, iframeSrc: link});
                    break;
            }
        }
    }
};
</script>
