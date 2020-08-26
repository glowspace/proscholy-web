<template>
    <span class="chord-sign">
        <span class="chord-left-bracket" v-if="chord.chord.isOptional">(</span>
        <span class="chord-base">{{ chord.chord.baseNote }}</span>
        <span class="chord-variant">{{ chord.chord.variant }}</span>
        <span class="chord-extension">{{ chord.chord.extension }}</span>
        <span class="chord-bass" v-if="chord.chord.bass.length !== 0">/{{ chord.chord.bassNote }}</span>
        <span class="chord-right-bracket" v-if="chord.chord.isOptional">)</span>
    </span>
</template>

<script>

export default {
    props: [
        'chord'
    ],
};
</script>
