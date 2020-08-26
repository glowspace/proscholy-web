<template>
    <div class="song-lyric-lines">
        <template v-for="line in part.songLines">
            <slot name="song-line" :song-line="line">
            </slot>
        </template>
    </div>
</template>

<script>
export default {
    props: ['part'],
}
</script>
