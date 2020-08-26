<template>
    <span class="chord">
        <span class="chord-sign">
            {{ chord.chord.base + chord.chord.variant }}
        </span>
        <span class="chord-text"><slot name="text"></slot></span>
        <span class="chord-line" v-if="chord.chord.isDivided"></span>
    </span>
</template>

<script>
// import { store } from '../../store.js';

export default {
    props: [
        'chord'
    ],
};
</script>
