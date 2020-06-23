<template>
    <div class="admin-controls" v-if="false">
        <a class="btn btn-secondary"
           :href="adminUrl">
            <i class="fas fa-columns"></i>
        </a>
        <a class="btn btn-secondary"
           href="#">Nástěnka</a>
        <br>

        <a class="btn btn-secondary"
           :href="adminUrl + '/song/' + song.id + '/edit'">
            <i class="fas fa-edit"></i>
        </a>
        <a class="btn btn-secondary"
           href="#">Upravit písničku</a>
        <br>

        <a class="btn btn-secondary"
           :href="adminUrl + '/external/new-for-song/' + song.id">
            <i class="fas fa-link"></i>
        </a>
        <a class="btn btn-secondary"
           href="#">Přidat odkaz</a>
        <br>

        <a class="btn btn-secondary"
           :href="adminUrl + '/file/new-for-song/' + song.id">
            <i class="fas fa-file"></i>
        </a>
        <a class="btn btn-secondary"
           href="#">Nahrát soubor</a>
    </div>
</template>

<script>
/**
 * TODO: show only when admin authenticated
 */
export default {
    name: 'AdminToolbox',

    props: ['song'],

    data() {
        return {
            adminUrl: process.env.adminUrl
        }
    }
}
</script>
