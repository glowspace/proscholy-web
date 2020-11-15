<template>
    <span v-if="multiline">
        <span class="song-name">{{ song.name }}</span>
        <span class="song-secondary-name" v-if="song.secondary_name_1">
            <br/>
            {{ song.secondary_name_1 }}
        </span>
        <span class="song-secondary-name" v-if="song.secondary_name_2">
            <br/>
            {{ song.secondary_name_2 }}
        </span>
    </span>
    <span v-else>
        <span class="song-name">{{ song.name }}</span>
        <span class="song-secondary-name" v-if="song.secondary_name_1">
            ({{ song.secondary_name_1 }}<span v-if="song.secondary_name_2">, {{ song.secondary_name_2 }}</span>)
        </span>
    </span>
</template>

<script>
export default {
    props: {
        song: {
            type: Object
        },
        multiline: {
            type: Boolean,
            default: false
        }
    }
}
</script>