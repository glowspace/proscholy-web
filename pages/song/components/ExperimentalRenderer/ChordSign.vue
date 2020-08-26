<template>
    <span class="chord-sign">
        <span class="chord-left-bracket" v-if="chordData.chord.isOptional">(</span>
        <span class="chord-base">{{ chordData.chord.base }}</span>
        <span class="chord-variant">{{ chordData.chord.variant }}</span>
        <span class="chord-extension">{{ chordData.chord.extension }}</span>
        <span class="chord-bass">{{ chordData.chord.bass }}</span>
        <span class="chord-right-bracket" v-if="chordData.chord.isOptional">)</span>
    </span>
</template>

<script>

export default {
    props: [
        'chord-data'
    ],
};
</script>
