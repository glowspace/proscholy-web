<template>
    <div class="song-line">
        <template v-for="(chord, key) in line.songLine.chords">
            <slot name="song-part-tag" :part="part" v-if="key === 0"></slot>
            <slot name="chord" :chord="chord"></slot>
        </template>
    </div>
</template>

<script>

export default {
    props: ['line', 'part'],
}
</script>