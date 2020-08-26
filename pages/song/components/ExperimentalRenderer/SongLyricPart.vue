<template>
    <div class="song-lyric-lines">
        <div v-for="(line, key) in part.songLines" :key="key">
            <slot name="song-line" :song-line="line">
            </slot>
        </div>
    </div>
</template>

<script>
import SongLine from './SongLine';

export default {
    props: ['part'],
    components: { SongLine }
}
</script>
