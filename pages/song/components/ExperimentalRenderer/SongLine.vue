<template>
    <div class="song-line">
        <template v-for="chord in line.songLine.chords">
            <slot name="chord" :chord="chord"></slot>
        </template>
    </div>
</template>

<script>
import Chord from './Chord';

export default {
    props: ['line'],
    components: { Chord }
}
</script>