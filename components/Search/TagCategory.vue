<template>
    <div>
        <h4>{{ heading }}</h4>
        <a
            :class="[
                {'tag-selected': isSelectedTag(tag)},
                'tag tag-' + color
            ]"
            v-for="tag in tagsInCategory"
            :key="'tag-' + tag.id"
            @click="$emit('selectTag', tag)"
            >{{ tag.name }}</a
        >
    </div>
</template>

<script>
export default {
    props: ['heading', 'color', 'tags-in-category', 'selected-tags'],

    methods: {
        isSelectedTag(tag) {
            return this.selectedTags[tag.id];
        }
    }
}
</script>
