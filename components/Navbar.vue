<template>
    <div class="navbar-song d-flex justify-content-between pr-5 py-2 bg-white border-bottom">
        <div class="nav-link text-black-50 pl-5"><p class="mb-0"><i class="fas fa-plus"></i></p></div>
        <div class="nav-link text-black-50 mr-auto "><p class="mb-0"><i class="fas fa-edit"></i></p></div>
        <div class="nav-link ml-auto text-black-50"><p class="mb-0"><i class="fas fa-star"></i></p></div>
        <div class="nav-link text-black-50"><p class="mb-0"><i class="fas fa-heart"></i></p></div>
        <div class="nav-link text-black-50"><p class="mb-0"><i class="fas fa-user"></i></p></div>
        <input class="form-control search-top ml-4 mb-0"
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
    //height: 70px;
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
