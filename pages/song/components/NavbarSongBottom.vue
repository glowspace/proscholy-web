<template>
    <div class="navbar-song-bottom d-flex justify-content-between py-1 bg-white fixed-bottom d-block d-md-none">
        <recordings-modal :song="song"/>
        <div class="nav-link  mx-auto"><p class="mb-0"><i class="fas fa-file"></i></p></div>
        <div class="nav-link mx-auto"><p class="mb-0"><i class="fas fa-sliders-h"></i></p></div>
        <div class="nav-link  pr-5 ml-auto"><p class="mb-0"><i class="fas fa-search"></i></p></div>
    </div>
</template>

<script>
import RecordingsModal from "~/pages/song/components/Modals/RecordingsModal";

/**
 * This navbar is visible only in mobile version.
 */
export default {
    name: "NavbarSongBottom",
    components: {RecordingsModal},
    props: ['song'],
}
</script>

<style lang="scss">
.navbar-song-bottom {
    //height: 70px;
    border-top:       1px solid #dedede;
    background-color: #f8fafc;

    bottom:           -1px; // Because the 1px border
}
</style>
