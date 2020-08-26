<template>
    <div class="song-line">
        <span v-for="(chord, key) in line.songLine.chords" :key="key">
            <slot name="chord" :chord="chord"></slot>
        </span>
    </div>
</template>

<script>
import Chord from './Chord';

export default {
    props: ['line'],
    components: { Chord }
}
</script>