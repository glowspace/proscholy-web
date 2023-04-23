<template>
    <div class="row">
        <div class="col-lg-9">
            <div class="card card-lyrics" id="cardLyrics">
                <div class="card-header p-1">
                    <div class="d-inline-block">
                        <a
                            v-if="scores.length"
                            class="btn btn-secondary"
                            :class="[{ chosen: topMode == 1 }]"
                            @click="topMode = topMode == 1 ? 0 : 1"
                        >
                            <i class="fas fa-file-alt"></i>
                            <span class="d-sm-inline">Noty</span>
                        </a>
                        <a
                            v-if="otherExternals.length"
                            class="btn btn-secondary"
                            :class="[{ chosen: topMode == 3 }]"
                            @click="topMode = topMode == 3 ? 0 : 3"
                        >
                            <i class="fas fa-link"></i>
                            <span class="d-none d-sm-inline"
                                >Další materiály</span
                            >
                        </a>
                        <a
                            v-if="renderTranslations"
                            class="btn btn-secondary"
                            :class="{ chosen: topMode == 2 }"
                            @click="topMode = topMode == 2 ? 0 : 2"
                        >
                            <i class="fas fa-language"></i>
                            <span class="d-none d-sm-inline">Překlady</span>
                        </a>
                        <a
                            v-if="hasArrangements"
                            class="btn"
                            :href="regenschoriUrl + song_lyric.public_route"
                        >
                            <i class="fas fa-edit"></i>
                            <span class="d-none d-sm-inline">Aranže</span>
                        </a>
                    </div>
                    <div class="float-right">
                        <!-- <a class="btn btn-secondary">
                            <i class="fas fa-folder-plus"></i>
                            <span class="d-none d-sm-inline">Do seznamu</span>
                        </a>
                        <a class="btn btn-secondary">
                            <i class="fas fa-file-export"></i>
                            <span class="d-none d-sm-inline">Export</span>
                        </a>
                        <a class="btn btn-secondary">
                            <i class="fas fa-share-alt"></i>
                            <span class="d-none d-sm-inline">Sdílet</span>
                        </a> -->
                        <a
                            class="btn"
                            title="Nahlásit"
                            :href="
                                'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
                                    encodeURIComponent(
                                        baseUrl + $route.fullPath
                                    )
                            "
                        >
                            <i class="fas fa-exclamation-triangle p-0"></i>
                        </a>
                    </div>

                    <!-- scores -->
                    <div v-show="topMode === 1">
                        <div class="overflow-auto toolbox toolbox-u">
                            <a
                                class="btn btn-secondary float-right fixed-top position-sticky cross"
                                @click="topMode = 0"
                            >
                                <i class="fas fa-times pr-0"></i>
                            </a>
                            <div class="row ml-0" v-if="!$apollo.loading">
                                <table class="table m-0">
                                    <tbody>
                                        <external
                                            v-for="(external, index) in scores"
                                            :key="index"
                                            :line="true"
                                            :index="index"
                                            :external="external"
                                            :song-name="song_lyric.name"
                                        ></external>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- other externals -->
                    <div v-show="topMode === 3">
                        <div class="overflow-auto toolbox toolbox-u">
                            <a
                                class="btn btn-secondary float-right fixed-top position-sticky cross"
                                @click="topMode = 0"
                            >
                                <i class="fas fa-times pr-0"></i>
                            </a>
                            <div class="row ml-0" v-if="!$apollo.loading">
                                <table class="table m-0">
                                    <tbody>
                                        <external
                                            v-for="(external,
                                            index) in otherExternals"
                                            :key="index"
                                            :line="true"
                                            :index="index"
                                            :external="external"
                                            :song-name="song_lyric.name"
                                        ></external>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- translations -->
                    <div v-show="topMode === 2">
                        <div class="overflow-auto toolbox toolbox-u">
                            <a
                                class="btn btn-secondary float-right fixed-top position-sticky cross"
                                @click="topMode = 0"
                            >
                                <i class="fas fa-times pr-0"></i>
                            </a>
                            <div
                                class="row ml-0"
                                v-if="!$apollo.loading && renderTranslations"
                            >
                                <table class="table m-0">
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th>Název</th>
                                            <th>Typ</th>
                                            <th>Autor (překladu)</th>
                                        </tr>
                                        <translation-line
                                            v-for="(translation,
                                            index) in song_lyric.song.song_lyrics.filter(
                                                lyric => lyric.type == 0
                                            )"
                                            :translation="translation"
                                            :original_name="song_lyric.name"
                                            :key="index + '0'"
                                        >
                                        </translation-line>
                                        <translation-line
                                            v-for="(translation,
                                            index) in song_lyric.song.song_lyrics.filter(
                                                lyric => lyric.type == 2
                                            )"
                                            :translation="translation"
                                            :original_name="song_lyric.name"
                                            :key="index + '1'"
                                        >
                                        </translation-line>
                                        <translation-line
                                            v-for="(translation,
                                            index) in song_lyric.song.song_lyrics.filter(
                                                lyric => lyric.type == 1
                                            )"
                                            :translation="translation"
                                            :original_name="song_lyric.name"
                                            :key="index + '2'"
                                        >
                                        </translation-line>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card-body py-2 pl-3 overflow-hidden">
                        <div
                            class="d-flex align-items-start justify-content-between flex-column-reverse flex-sm-row"
                        >
                            <div
                                id="song-lyrics"
                                :class="{
                                    'p-1': true,
                                    'flex-grow-1': true,
                                    'song-lyrics-extended':
                                        chordSharedStore.chordMode == 2
                                }"
                            >
                                <div
                                    v-if="song_lyric.lilypond_svg"
                                    v-html="song_lyric.lilypond_svg"
                                    class="ml-n3 mr-n3 ml-md-3 mr-md-0 mb-3 lilypond-container"
                                ></div>
                                <span v-if="song_lyric.has_lyrics">
                                    <a
                                        class="btn btn-secondary bg-transparent p-0 mb-2"
                                        v-if="
                                            chordSharedStore.nChordModes != 1 &&
                                                chordSharedStore.chordMode == 0
                                        "
                                        @click="chordSharedStore.chordMode = 2"
                                        >Zobrazit akordy</a
                                    >
                                    <a
                                        class="btn btn-secondary bg-transparent p-0 mb-2"
                                        v-if="chordSharedStore.chordMode != 0"
                                        @click="chordSharedStore.chordMode = 0"
                                        >Skrýt akordy</a
                                    >
                                    <div
                                        v-if="
                                            !$apollo.loading &&
                                                song_lyric.capo > 0 &&
                                                chordSharedStore.chordMode != 0
                                        "
                                        class="mb-2"
                                    >
                                        <i>capo: {{ song_lyric.capo }}</i>
                                    </div>
                                    <!-- here goes the song lyrics -->
                                    <song-lyric-parts
                                        :song-id="song_lyric.id"
                                        :font-size-percent="
                                            chordSharedStore.fontSizePercent
                                        "
                                        @loaded="isScrollable(true)"
                                    ></song-lyric-parts>
                                </span>
                                <span
                                    v-else
                                    :style="{
                                        fontSize:
                                            chordSharedStore.fontSizePercent +
                                            '%'
                                    }"
                                    >Text písně připravujeme.</span
                                >
                            </div>
                            <right-controls
                                :song_lyric="song_lyric"
                            ></right-controls>
                        </div>
                    </div>

                    <div
                        class="controls fixed-bottom position-sticky p-1 clearfix"
                        :class="{ 'card-footer': controlsDisplay }"
                    >
                        <div v-show="bottomMode == 1 && controlsDisplay">
                            <div class="overflow-auto toolbox">
                                <a
                                    class="btn btn-secondary float-right"
                                    @click="bottomMode = 0"
                                >
                                    <i class="fas fa-times pr-0"></i>
                                </a>
                                <div
                                    class="toolbox-item"
                                    v-if="chordSharedStore.nChordModes != 1"
                                    :class="{
                                        'hidden-toolbox-item':
                                            chordSharedStore.chordMode == 0
                                    }"
                                >
                                    <transposition
                                        v-model="chordSharedStore.transposition"
                                    ></transposition>
                                </div>

                                <div
                                    class="toolbox-item"
                                    v-if="chordSharedStore.nChordModes != 1"
                                    :class="{
                                        'hidden-toolbox-item':
                                            chordSharedStore.chordMode == 0
                                    }"
                                >
                                    <chord-sharp-flat
                                        v-model="chordSharedStore.useFlatScale"
                                    ></chord-sharp-flat>
                                </div>

                                <div
                                    class="toolbox-item"
                                    v-if="chordSharedStore.nChordModes != 1"
                                >
                                    <chord-mode
                                        v-model="chordSharedStore.chordMode"
                                        :n-chord-modes="
                                            chordSharedStore.nChordModes
                                        "
                                    ></chord-mode>
                                </div>

                                <div class="toolbox-item">
                                    <font-sizer
                                        v-model="
                                            chordSharedStore.fontSizePercent
                                        "
                                    ></font-sizer>
                                </div>
                            </div>
                        </div>
                        <!-- media -->
                        <div v-show="bottomMode == 2 && controlsDisplay">
                            <div class="overflow-auto media-card toolbox">
                                <a
                                    class="btn btn-secondary float-right fixed-top position-sticky cross"
                                    @click="bottomMode = 0"
                                >
                                    <i class="fas fa-times pr-0"></i>
                                </a>
                                <div
                                    class="row ml-0 pt-2"
                                    v-if="hasExternals && !$apollo.loading"
                                >
                                    <div
                                        class="col-md-6"
                                        v-for="(external, index) in recordings"
                                        :key="index"
                                    >
                                        <external
                                            :line="false"
                                            :index="index"
                                            :external="external"
                                            :song-name="song_lyric.name"
                                        ></external>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- control buttons -->
                        <div>
                            <a
                                class="btn btn-secondary"
                                :class="{ chosen: bottomMode === 1 }"
                                @click="bottomMode = bottomMode === 1 ? 0 : 1"
                            >
                                <i class="fas fa-sliders-h"></i>
                                <span class="d-none d-sm-inline">Nástroje</span>
                            </a>
                            <a
                                class="btn btn-secondary"
                                v-if="recordings.length"
                                :class="{ chosen: bottomMode == 2 }"
                                @click="bottomMode = bottomMode == 2 ? 0 : 2"
                            >
                                <i class="fas fa-headphones"></i>
                                <span class="d-none d-sm-inline">Nahrávky</span>
                            </a>
                            <div
                                class="d-inline-block btn-group m-0 float-right"
                                role="group"
                                :class="{ chosen: autoscroll }"
                                v-if="scrollable"
                            >
                                <a
                                    class="btn btn-secondary"
                                    @click="autoscroll = !autoscroll"
                                >
                                    <i
                                        class="fas"
                                        :class="[
                                            autoscroll
                                                ? 'pr-0 fa-stop-circle'
                                                : 'fa-arrow-circle-down'
                                        ]"
                                    ></i>
                                    <span
                                        class="d-none d-sm-inline"
                                        v-if="!autoscroll"
                                        >Rolovat</span
                                    > </a
                                ><a
                                    class="btn btn-secondary"
                                    v-if="autoscroll"
                                    @click="autoscrollNum--"
                                    :class="{ disabled: autoscrollNum == 1 }"
                                    >&minus;</a
                                ><a
                                    class="btn btn-secondary"
                                    v-if="autoscroll"
                                    @click="autoscrollNum++"
                                    :class="{ disabled: autoscrollNum == 20 }"
                                    >&plus;</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-1 mb-3 mt-n2">
                <div class="px-3 py-2 d-inline-block">
                    Zpěvník ProScholy.cz
                    <img src="/img/logo.svg" width="20px" />
                    {{ new Date().getFullYear() }}
                </div>
                <div class="float-right">
                    <a
                        class="btn btn-secondary"
                        :href="
                            'https://proscholy.atlassian.net/servicedesk/customer/portal/1/group/1/create/19?customfield_10056=' +
                                encodeURIComponent(baseUrl + $route.fullPath)
                        "
                        >Nahlásit</a
                    >
                    <a
                        class="btn btn-secondary"
                        v-if="song_lyric"
                        :href="adminUrl + '/song/' + song_lyric.id + '/edit'"
                        >Upravit</a
                    >
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <widget-funding></widget-funding>

            <div
                class="card card-blue mb-3 d-none d-lg-flex"
                @click="topMode = 1"
                v-if="scores.length"
            >
                <div class="card-header media-opener py-2 rounded">
                    <i class="fas fa-file-alt"></i> Zobrazit notové zápisy
                </div>
            </div>
            <div
                class="card card-green mb-3 d-none d-lg-flex"
                @click="bottomMode = 2"
                v-if="recordings.length"
            >
                <div class="card-header media-opener py-2">
                    <i class="fas fa-headphones"></i> Dostupné nahrávky<span
                        class="d-none d-xl-inline"
                    >
                        a videa</span
                    >
                </div>
                <div class="media-opener" v-if="mediaTypes[0]">
                    <i class="fab fa-spotify text-success"></i> Spotify
                </div>
                <div class="media-opener" v-if="mediaTypes[1]">
                    <i class="fab fa-soundcloud" style="color: orangered;"></i>
                    SoundCloud
                </div>
                <div class="media-opener" v-if="mediaTypes[3]">
                    <i class="fas fa-music"></i> MP3
                </div>
                <div class="media-opener" v-if="mediaTypes[2]">
                    <i class="fab fa-youtube text-danger"></i> YouTube
                </div>
            </div>

            <div class="card mb-3 d-none d-lg-flex" @click="bottomMode = 1">
                <div
                    class="card-header media-opener py-2 rounded bg-secondary text-white"
                >
                    <i class="fas fa-sliders-h"></i> Nastavit zobrazení
                </div>
                <div
                    class="media-opener"
                    v-if="chordSharedStore.nChordModes != 1"
                >
                    <i class="fas fa-angle-right"></i> Transpozice:
                    <span class="float-right">{{
                        chordSharedStore.transposition
                    }}</span>
                </div>
                <div
                    class="media-opener"
                    v-if="chordSharedStore.nChordModes != 1"
                >
                    <i class="fas fa-angle-right"></i> Posuvky:
                    <span class="float-right">{{
                        chordSharedStore.useFlatScale ? '♭' : '#'
                    }}</span>
                </div>
                <div
                    class="media-opener"
                    v-if="chordSharedStore.nChordModes != 1"
                >
                    <i class="fas fa-angle-right"></i> Akordy:
                    <span class="float-right">{{
                        chordSharedStore.chordMode ? '+' : '–'
                    }}</span>
                </div>
                <div class="media-opener">
                    <i class="fas fa-angle-right"></i> Velikost písma:
                    <span class="float-right">{{
                        (chordSharedStore.fontSizePercent - 100) / 10
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store.js';
import { clone, throttle } from 'lodash';

import FontSizer from './FontSizer';
import ChordMode from './ChordMode';
import ChordSharpFlat from './ChordSharpFlat';
import RightControls from './RightControls';
import Transposition from './Transposition';
import SongLyricParts from '../Renderer/SongLyricParts.vue';
import TranslationLine from '~/components/TranslationLine.vue';
import External from '~/components/External.vue';
import { getFullName } from '~/components/SongName';
import WidgetFunding from '~/components/WidgetFunding';

/**
 * This component renders white box on song detail page.
 *
 * It contains lyrics and another stuff.
 */
export default {
    props: ['song_lyric'],

    components: {
        FontSizer,
        ChordMode,
        ChordSharpFlat,
        External,
        RightControls,
        Transposition,
        TranslationLine,
        SongLyricParts,
        WidgetFunding
    },

    data() {
        // use this only in SongBox and Chord component
        // use v-model to bind data from every other component
        return {
            controlsDisplay: true,
            bottomMode: 0,
            topMode: 0,
            autoscroll: false,
            autoscrollNum: 10,
            scrolldelay: null,
            fullscreen: false,
            selectedScoreIndex: 0,
            scrollable: true,

            chordSharedStore: store,
            baseUrl: process.env.baseUrl,
            adminUrl: process.env.adminUrl,
            regenschoriUrl: process.env.regenschoriUrl
        };
    },

    watch: {
        autoscroll: function() {
            this.setScroll(this.autoscrollNum, this.autoscroll);
        },
        autoscrollNum: function() {
            this.setScroll(this.autoscrollNum, this.autoscroll);
        }
    },

    destroyed() {
        this.setScroll(this.autoscrollNum, false);
    },

    computed: {
        hasExternals: {
            get() {
                return (
                    this.song_lyric &&
                    this.song_lyric.externals &&
                    this.song_lyric.externals.length
                );
            }
        },

        hasArrangements: {
            get() {
                return (
                    this.song_lyric &&
                    this.song_lyric.arrangements &&
                    this.song_lyric.arrangements.length
                );
            }
        },

        recordings: {
            get() {
                return this.song_lyric.externals.filter(
                    ext => ext.content_type == 'RECORDING'
                );
            }
        },

        scores: {
            get() {
                return this.song_lyric.externals.filter(
                    ext => ext.content_type == 'SCORE'
                );
            }
        },

        otherExternals: {
            get() {
                return this.song_lyric.externals.filter(
                    ext =>
                        ext.content_type != 'RECORDING' &&
                        ext.content_type != 'SCORE'
                );
            }
        },

        renderTranslations: {
            get() {
                // if SongLyric is an arrangement, then .song property is undefined
                return (
                    this.song_lyric.song &&
                    this.song_lyric.song.song_lyrics.length > 1
                );
            }
        },

        mediaTypes: {
            get() {
                var arrayOfTypes = [
                    'spotify',
                    'soundcloud',
                    'youtube',
                    'file/mp3',
                    'file/wav',
                    'file/aac',
                    'file/flac'
                ];
                var returnArray = [];
                for (let i = 0; i < arrayOfTypes.length; i++) {
                    returnArray[i] = this.recordings.filter(
                        ext => ext.media_type == arrayOfTypes[i]
                    ).length;
                }
                return returnArray;
            }
        }
    },

    methods: {
        controlsToggle: function() {
            if (process.client) {
                this.controlsDisplay = !this.controlsDisplay;
                document
                    .querySelector('.navbar.fixed-top')
                    .classList.toggle('d-none');
            }
        },

        setScroll: function(num, condition) {
            clearInterval(this.scrolldelay);
            if (process.client && num > 0 && num < 21 && condition) {
                this.scrolldelay = setInterval(
                    function() {
                        window.scrollBy(0, 1);
                        if (
                            window.innerHeight + window.scrollY >=
                            document.body.scrollHeight
                        ) {
                            // we're at the bottom of the page
                            this.autoscroll = false;
                        }
                    }.bind(this),
                    (21 - num) * 10
                );
            }
        },

        isScrollable: throttle(function isScrollableTh(initial) {
            if (
                process.client &&
                document.body.scrollHeight == document.body.clientHeight
            ) {
                // the page isn't scrollable
                this.scrollable = false;

                if (initial === true) {
                    this.bottomMode = 1;
                }
            } else {
                this.scrollable = true;
            }
        }, 100),

        keyUp: function(e) {
            if (e.key == '+') {
                if (this.autoscroll && this.autoscrollNum < 20) {
                    this.autoscrollNum++;
                }
                this.autoscroll = true;
            } else if (e.key == 'Escape') {
                this.autoscroll = false;
            } else if (e.key == '-' && this.autoscrollNum > 1) {
                this.autoscrollNum--;
            }
        },

        getFullName: getFullName
    },

    mounted() {
        if (!this.song_lyric.has_lyrics) {
            if (this.recordings.length) {
                this.bottomMode = 2;
            }
            if (this.scores.length) {
                this.topMode = 1;
            } else if (this.renderTranslations) {
                this.topMode = 2;
            }
            this.scrollable = false;
        } else {
            window.addEventListener('resize', this.isScrollable);
            this.isScrollable(true);
            window.addEventListener('keyup', this.keyUp);
        }

        this.chordSharedStore.transposition = 0;
    }
};
</script>
