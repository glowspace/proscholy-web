<template>
    <div class="navbar-song d-flex justify-content-between p-3">
        <div></div>
        <input class="form-control search-top"
               placeholder="Zadejte název nebo číslo">
    </div>
</template>

<script>
export default {
    name: "NavbarSong"
}
</script>

<style lang="scss">
.navbar-song {
    height: 70px;
    border-bottom: 1px solid #dedede;
    background-color: #f8fafc;

    .search-top {
        width: 250px;

        &:focus {
            outline: none !important;
        }
    }
}
</style>
