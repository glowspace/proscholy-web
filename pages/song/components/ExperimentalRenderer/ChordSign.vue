<template>
    <span class="chord-sign">
        <span class="chord-left-bracket" v-if="chordData.chord.isOptional">(</span>
        <span class="chord-base">{{ chordData.chord.baseNote }}</span>
        <span class="chord-variant">{{ chordData.chord.variant }}</span>
        <span class="chord-extension">{{ chordData.chord.extension }}</span>
        <span class="chord-bass" v-if="chordData.chord.bass.length !== 0">/{{ chordData.chord.bassNote }}</span>
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
