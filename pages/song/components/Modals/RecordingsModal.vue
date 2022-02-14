<template>
    <div class="nav-link pl-5 mr-auto"
         @click="open = true">
        <p class="mb-0"><i class="fas fa-headphones"></i></p>

        <div class="modal-bottom">
            

        </div>
    </div>
</template>

<script>
export default {
    name: "RecordingsModal",
    props: ['song'],
    data: () => {
        return {
            open: false
        }
    }
}
</script>

<style scoped>

</style>
