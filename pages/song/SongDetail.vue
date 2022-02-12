<template>
    <div class="song-detail">
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
        <div class="navbar-song d-flex justify-content-between py-1 bg-white border-top fixed-bottom d-block d-md-none">
            <div class="nav-link  pl-5 mr-auto">
                <p class="mb-0"><i class="fas fa-headphones"></i></p>
            </div>
            <div class="nav-link  mx-auto"><p class="mb-0"><i class="fas fa-music"></i></p></div>
            <div class="nav-link mx-auto"><p class="mb-0"><i class="fas fa-sliders-h"></i></p></div>
            <div class="nav-link  pr-5 ml-auto"><p class="mb-0"><i class="fas fa-search"></i></p></div>

        </div>
        <p class="song-author ml-3 mb-5 d-md-none d-block">
            <song-author-label :song="song"/>
            <song-info :song="song"/>
        </p>
    </div>
</template>
<script>
import SongAuthorLabel from './components/SongAuthorLabel';
import SongBox from './components/SongBox/SongBox';
import Tags from './components/Tags';
import SongName from '~/components/SongName';
import SongInfo from '~/components/SongInfo';

export default {
    name: 'SongDetail',

    components: {
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
    //font-family: "Roboto", sans-serif;

    .song-title {
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-size:   1.5rem;
    }
}


</style>
