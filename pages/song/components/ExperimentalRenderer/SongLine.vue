<template>
    <div class="song-line">
        <template v-for="chord in line.songLine.chords">
            <slot name="chord" :chord="chord"></slot>
        </template>
    </div>
</template>

<script>

export default {
    props: ['line']
}
</script>