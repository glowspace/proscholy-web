<template>
    <div class="song-tags p-0 mt-3">
        <div class="d-inline-flex flex-row flex-wrap align-items-start mr-3"
            v-if="song.tags_liturgy_part.length || song.liturgy_approval_status">
            <nuxt-link to="/napoveda#schvaleno-cbk" class="tag tag-blue" v-if="song.liturgy_approval_status">{{
                JSON.parse(song.liturgy_approval_status_string_values)[song.liturgy_approval_status]
            }} <i class="fas fa-check"></i></nuxt-link>
            <nuxt-link class="tag tag-blue" v-for="tag in song.tags_liturgy_part" :key="tag.id"
               :to="'/?stitky=' + tag.id">{{ tag.name }}</nuxt-link>
        </div>

        <div class="d-inline-flex flex-row flex-wrap align-items-start mr-3"
            v-if="song.tags_liturgy_period.concat(song.tags_saints).concat(song.tags_generic).length">
            <nuxt-link class="tag tag-red" v-for="tag in song.tags_liturgy_period" :key="tag.id"
               :to="'/?stitky=' + tag.id">{{ tag.name }}</nuxt-link>
            <nuxt-link class="tag tag-green" v-for="tag in song.tags_saints.concat(song.tags_generic)" :key="tag.id"
               :to="'/?stitky=' + tag.id">{{ tag.name }}</nuxt-link>
        </div>

        <div class="d-inline-flex flex-row flex-wrap align-items-start"
            v-if="publicSongbookRecords.length">
            <nuxt-link class="tag tag-yellow songbook-tag" v-for="(sb, key) in publicSongbookRecords" :key="'sb' + key"
                :to="'/?zpevniky=' + sb.songbook.id + '&razeni=2'">
                <span class="songbook-name">{{ sb.songbook.name }}</span><span class="songbook-number">{{ sb.number }}</span>
            </nuxt-link>
        </div>

        <div class="d-inline-flex flex-row flex-wrap align-items-start"
            v-if="bibleRefs">
            <a
                class="tag tag-blue"
                v-for="(reference, key) in bibleRefs"
                :key="'ref' + key"
                :href="`https://www.bibleserver.com/CEP/${reference}`"
            >{{ reference }}</a>
        </div>
    </div>
</template>

<script>
/**
 * Song tags component.
 *
 * It renders:
 * 1) related tags
 * 2) related songbooks
 * 3) liturgy approval
 * 4) bible reference
 */
import BibleReference from 'bible-reference/bible_reference';

export default {
    name: 'Tags',

    props: ['song'],

    computed: {
        // todo: refactor to use server-side filtering of songbooks

        publicSongbookRecords() {
            return this.song.songbook_records.filter(sb => !sb.songbook.is_private)
        },

        bibleRefs() {
            if (this.song.bible_refs_src) {
                const lines = this.song.bible_refs_src.split('\n');
                const bib_refs = lines.map(l => BibleReference.fromEuropean(l));
                const lines_cz = bib_refs.flatMap(r => r.toCzechStrings());

                return lines_cz;
            }

            return false;
        }
    }
};
</script>
