<template>
    <div class="song-detail">
        <navbar></navbar>

        <div class="mt-4 mb-3">
            <div>
                <h1 class="song-title">
                    <song-name :song="song"/>
                </h1>
                <div class="d-flex align-items-center mt-1">
                    <h4 class="song-number m-0 d-md-block d-none">{{ song.song_number }}</h4>
                    <p class="song-author ml-3 mb-0 d-md-block d-none">
                        <song-author-label :song="song"/>
                        <song-info :song="song"/>
                    </p>
                </div>
            </div>
            <tags :song="song"></tags>
        </div>
        <song-box
            :song_lyric="song"
        ></song-box>

        <p class="song-author ml-3 mb-5 d-md-none d-block">
            <song-author-label :song="song"/>
            <song-info :song="song"/>
        </p>

        <navbar-song-bottom :song="song"/>
    </div>
</template>
<script>
import SongAuthorLabel from './components/SongAuthorLabel';
import SongBox from './components/SongBox/SongBox';
import Tags from './components/Tags';
import SongName from '~/components/SongName';
import SongInfo from '~/components/SongInfo';
import NavbarSongBottom from "~/pages/song/components/NavbarSongBottom";
import Navbar from "~/components/Navbar";

export default {
    name: 'SongDetail',

    components: {
        Navbar,
        NavbarSongBottom,
        SongBox,
        SongAuthorLabel,
        Tags,
        SongName,
        SongInfo
    },

    props: ['song']
};
</script>

<style lang="scss">
.song-detail {
    margin-top: 80px;

    .song-title {
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-size:   1.5rem;
    }
}


</style>
