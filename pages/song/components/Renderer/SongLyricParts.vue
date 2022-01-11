<template>
    <sl-parts-loading v-if="$apollo.loading" />
    <div v-else-if="song_lyric_parts">
        <div
            :class="getSongPartClass(part)"
            v-for="(part, key) in song_lyric_parts"
            :key="key"
            :style="{ fontSize: fontSizePercent + '%' }"
        >
            <div
                v-for="(line, key2) in part.songLines"
                :key="key2"
                :class="[{'song-line--newline': isLineNewLine(line)}, 'song-line',
                {'song-line--comment': line.is_comment}]"
            >
                <!-- references \u2009 in JavaScript (these characters are to be replaced by \n by JS) -->
                <span>&#8201;</span>
                <span v-if="!key2" class="song-part-tag">{{ part.type + (part.type ? (part.isVerse ? '.' : ':') : '') }}&nbsp;</span
                ><template v-for="(chord, key3) in line.chords">
                    <chord
                        :key="key3"
                        :base="chord.base"
                        :variant="chord.variant"
                        :extension="chord.extension"
                        :bass="chord.bass"
                        :isDivided="chord.isDivided"
                        :isOptional="chord.isOptional"
                        :isSubstitute="chord.isSubstitute"
                        :hasNextSibling="hasNextSibling(chord)"
                        :breakLineBefore="previousLineIsNewline(part, key2) && key3 == 0"
                    >{{ chord.text.replace(/^ /, '&nbsp;')}}</chord
                    ><template v-if="!chord.isDivided && line.chords[key3 + 1]"><span class="chord">&nbsp;</span></template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Chord from './Chord';
import SlPartsLoading from '../SlPartsLoading';
import ChordSheetJs from 'chordsheetjs';

const FETCH_SONG_LYRIC_PARTS = gql`
    query($id: ID!) {
        song_lyric_parts_json(id: $id) {
            json
        }
    }
`;

export default {
    props: ['songId', 'fontSizePercent'],

    data() {
        return {
            song_lyric_parts: []
        };
    },

    components: {
        Chord,
        SlPartsLoading
    },

    apollo: {
        song_lyric_parts_json: {
            query: FETCH_SONG_LYRIC_PARTS,
            variables() {
                return {
                    id: this.songId
                };
            },
            result() {
                this.song_lyric_parts = JSON.parse(this.song_lyric_parts_json.json);
                this.$nextTick(() => { this.$emit('loaded', null); });
            }
        }
    },

    methods: {
        getSongPartClass(part) {
            let cl = 'song-part';

            if (part.isRefrain) cl += ' song-part-refrain';
            if (part.isHidden) cl += ' song-part-hidden';
            if (part.isHiddenText) cl += ' song-part-hidden-text';
            if (part.isInline) cl += ' song-part-inline';

            return cl;
        },
        hasNextSibling(chord) {

        },
        isLineNewLine(line) {
            return line.chords.length == 1 && line.chords[0].base + line.chords[0].text == ''
        },
        previousLineIsNewline(part, key) {
            if (key == 0) {
                return false;
            }
            return this.isLineNewLine(part.songLines[key - 1])
        }
    },

    mounted() {
        document.addEventListener('copy', (event) => {
            let text = document.getSelection();
            text = `${text}`
                    .trim()
                    .replaceAll(String.fromCharCode(10), '') // replace arbitrary new-lines
                    .replaceAll('\u2009', '\n') // create `true` new-lines
                    .replaceAll('\n ', '\n')
                    .replaceAll('\u200a', ']')
                    .replaceAll('\u200b', '[')

            // change the ChordPro format to plain text format
            const parser = new ChordSheetJs.ChordProParser();
            const song = parser.parse(text)
            const formatter = new ChordSheetJs.TextFormatter();

            text = formatter.format(song)

            event.clipboardData.setData('text/plain', text);
            event.preventDefault();
        });
    }
};
</script>
