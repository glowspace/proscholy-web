<template>
    <div class="song">
        <song-lyric-part :part="part" v-for="(part, key) in json" :key="key" :style="{ fontSize: fontSizePercent + '%' }">
            <template v-slot:song-line="line_data">
                <song-line :line="line_data" :part="part" :class="{'song-line--newline': isSongLineNewline(line_data)}">
                    <template v-slot:song-part-tag="part_data">
                        <span class="song-part-tag">{{ getSongPartTag(part_data) }}&nbsp;</span>
                    </template>

                    <template v-slot:chord="chord_data">
                        <span class="chord">
                            <chord-sign :chord="transposed(chord_data.chord, getSongPartSharpness(part))" v-if="showChordSigns" :style="{ fontSize: chordFontSizePercent + '%' }"></chord-sign>
                            <span :class="['chord-text', !chord_data.chord.isDivided ? 'chord-text-spaced' : '']">{{ chord_data.chord.text }}</span>
                            <span class="chord-line" v-if="chord_data.chord.isDivided"></span>
                        </span>
                        <span v-if="!chord_data.chord.isDivided" class="chord">&nbsp;</span>
                    </template>
                </song-line>
            </template>
        </song-lyric-part>
    </div>
</template>

<script>
import SongLyricPart from './SongLyricPart';
import SongLine from './SongLine';
import ChordSign from './ChordSign';
import { transposedChord, getSongPartSharpness } from './transposer.js';
import json_str from './babayetu';

export default {
    components: { SongLyricPart, SongLine, ChordSign },

    data() {
        return {
            transposition: 1,
            fontSizePercent: 100,
            chordFontSizePercent: 100,
            showChordSigns: true,
            json_str: json_str
        }
    },

    methods: {        
        getSongPartSharpness,
        // return data for transposed chord
        transposed: function(chord, songPartSharpness) {
            return transposedChord(chord, this.transposition, {
                sharpness: songPartSharpness,
                forceB: false,
                useAmericanNotation: false
            });
        },

        isSongLineNewline({songLine}) {
            return songLine.chords.length == 1 && songLine.chords[0].base + songLine.chords[0].text;
        },

        getSongPartTag({part}) {
            return part.type + (part.type ? (part.isVerse ? '.' : ':') : '');
        }
    },

    computed: {
        json() {
            return JSON.parse(this.json_str);
        }
    }
}
</script>