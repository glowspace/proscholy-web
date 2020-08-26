<template>
    <div class="song">
        <song-lyric-part :part="part" v-for="(part, key) in json" :key="key">
            <template v-slot:song-line="line_data">
                <song-line :line="line_data">
                    <template v-slot:chord="chord_data">
                        <chord :chord="chord_data">
                            <template #text>ahoj</template>
                        </chord>
                    </template>
                </song-line>
            </template>
        </song-lyric-part>
    </div>
</template>

<script>
import SongLyricPart from './SongLyricPart';
import SongLine from './SongLine';
import Chord from './Chord';

export default {
    components: { SongLyricPart, SongLine, Chord },

    data() {
        return {
            transposition: 0,
            json_str: "[{\"type\":\"\",\"isHidden\":false,\"isHiddenText\":false,\"isEmpty\":false,\"isVerse\":false,\"isRefrain\":false,\"isInline\":false,\"songLines\":[{\"chords\":[{\"base\":\"C\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"A\\u0165 srdce m\\u00e9 Tebe v\\u00edd\\u00e1,\"}]},{\"chords\":[{\"base\":\"C\",\"variant\":\"\",\"extension\":\"maj7\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"a\\u0165 srdce m\\u00e9 Tebe zn\\u00e1,\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"vid\\u011bt T\\u011b \"},{\"base\":\"F\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"tou\\u017e\\u00edm, \"},{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"vid\\u011bt T\\u011b \"},{\"base\":\"C\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"tou\\u017e\\u00edm.\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"Chci vid\\u011bt \"},{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":true,\"text\":\"Kr\\u00e1le na tr\\u016f\"},{\"base\":\"A\",\"variant\":\"m\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"nu,\"}]},{\"chords\":[{\"base\":\"F\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":true,\"text\":\"z\\u00e1\\u0159\\u00edc\\u00edho ve sv\\u011btle sl\\u00e1\"},{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"vy.\"}]},{\"chords\":[{\"base\":\"E\",\"variant\":\"m\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":true,\"text\":\"Vylej svou l\\u00e1sku a mo\"},{\"base\":\"A\",\"variant\":\"m\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"c,\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"kdy\\u017e zp\\u00edv\\u00e1m: \"},{\"base\":\"F\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"Svat\\u00fd, svat\\u00fd, \"},{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"svat\\u00fd.\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"\"}]},{\"chords\":[{\"base\":\"C\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"Svat\\u00fd, svat\\u00fd, svat\\u00fd,\"}]},{\"chords\":[{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"svat\\u00fd, svat\\u00fd, svat\\u00fd,\"}]},{\"chords\":[{\"base\":\"F\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"svat\\u00fd, svat\\u00fd, \"},{\"base\":\"G\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"svat\\u00fd,\"}]},{\"chords\":[{\"base\":\"\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"vid\\u011bt T\\u011b \"},{\"base\":\"C\",\"variant\":\"\",\"extension\":\"\",\"bass\":\"\",\"isSubstitute\":false,\"isOptional\":false,\"isDivided\":false,\"text\":\"tou\\u017e\\u00edm.\"}]}]}]"
        }
    },

    methods: {        
        // return data for transposed chord
        transposed: function(chord) {
            return chord;
        }
    },

    computed: {
        json() {
            return JSON.parse(this.json_str);
        }
    }
}
</script>