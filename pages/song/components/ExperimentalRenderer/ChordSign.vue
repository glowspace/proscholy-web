<template>
    <span class="chord-sign">
        <span class="chord-left-bracket" v-if="chord.isOptional">(</span>
        <span class="chord-base">{{ chord.base }}</span>
        <span class="chord-variant">{{ chord.variant }}</span>
        <span class="chord-extension">{{ chord.extension }}</span>
        <span class="chord-bass">{{ chord.bass }}</span>
        <span class="chord-right-bracket" v-if="chord.isOptional">)</span>
    </span>
</template>

<script>

export default {
    props: [
        'chord'
    ],

    mounted() {
        
    }
};
</script>
