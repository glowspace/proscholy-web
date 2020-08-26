<template>
    <div class="song-line">
        <template v-for="(chord, key) in line.songLine.chords">
            <span class="song-part-tag" v-if="key === 0" :key="key">{{ part.type + (part.type ? (part.isVerse ? '.' : ':') : '') }}&nbsp;</span>
            <slot name="chord" :chord="chord"></slot>
        </template>
    </div>
</template>

<script>

export default {
    props: ['line', 'part']
}
</script>