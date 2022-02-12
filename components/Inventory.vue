<template>
    <div class="inventory-wrapper">
        <nuxt-link to="/" class="navbar-brand" id="navbar-brand">
        <div class="brand-heading mb-3 mt-2">
            <img
                src="/img/logo_bubble_shadow.png"
                style="padding-right:0px"
                width="45"
                alt="logo" />
            <span>Zpěvník</span>
        </div>
        </nuxt-link>

        <div class="inventory-section-label">Můj účet</div>

        <table class="table-inventory">
            <tr>
                <td><i class="fas fa-star playlist-icon"></i></td>
                <td class="label">Oblíbené písně</td>
            </tr>
            <tr>
                <td><i class="fas fa-user playlist-icon"></i></td>
                <td class="label">Vlastní písně</td>
            </tr>
            <tr>
                <td><i class="fas fa-list playlist-icon"></i></td>
                <td class="label">Chci se naučit</td>
            </tr>
        </table>

        <div class="inventory-section-label">Schola Dolany</div>

        <table class="table-inventory">
            <tr>
                <td><i class="fas fa-star playlist-icon"></i></td>
                <td class="label">Oblíbené písně</td>
            </tr>
            <tr>
                <td><i class="fas fa-users playlist-icon"></i></td>
                <td class="label">Vlastní písně</td>
            </tr>
            <tr>
                <td><i class="fas fa-list playlist-icon"></i></td>
                <td class="label">Mše 24.12.</td>
            </tr>
            <tr>
                <td><i class="fas fa-list playlist-icon"></i></td>
                <td class="label">Chvály</td>
            </tr>
        </table>

    </div>
</template>

<script>
export default {
    name: "Inventory"
}
</script>

<style lang="scss">
.inventory-wrapper {
    width:            100%;
    background-color: #f8fafc;
    height:           100vh;
    border-right: 1px solid #dedede;

    padding: 7px 1rem;


    .brand-heading {
        color: black;

        font-size: 1.3rem;
        font-weight: 500;
        font-family: "Open Sans", "Arial Black", sans-serif;

    }

    // Grey label above table
    .inventory-section-label {
        margin-top: 15px;
        margin-bottom: 7px;

        text-transform: uppercase;
        font-size: 0.73rem;
        color: grey;
        font-weight: 600;
    }

    .table-inventory {
        .playlist-icon {
            padding: 0 10px 10px 5px;
            color: #1d6dab;
            position: relative;
            top: 3px;
        }

        td {
            vertical-align: center;
            text-align: center;
        }
        td.label {
            text-align: left;
        }
    }
}


</style>
