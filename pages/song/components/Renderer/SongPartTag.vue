<template>
    <span
        class="song-part-tag"
        v-bind:style="{ fontSize: chordSharedStore.fontSizePercent + '%' }"
    >
        <slot></slot>
    </span>
</template>

<script>
import { store } from '../../store.js';

export default {
    data() {
        return {
            chordSharedStore: store
        };
    }
};
</script>
