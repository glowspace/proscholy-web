<template>
    <div class="inventory-wrapper d-md-block d-none">
        <nuxt-link to="/"
                   class="navbar-brand"
                   id="navbar-brand">
            <div class="brand-heading mb-2">
                <img
                    src="/img/logo_bubble_shadow.png"
                    style="padding-right:0px"
                    width="45"
                    alt="logo"/>
                <span>Zpěvník</span>
            </div>
        </nuxt-link>

        <div class="inventory-section-label ml-2">Můj účet</div>

        <table class="table-inventory ml-4">
            <tbody>
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
            </tbody>
        </table>

        <div class="inventory-section-label ml-2">Schola Dolany</div>

        <table class="table-inventory ml-4">
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
        <div class="small position-fixed py-3 d-inline-block"
             style="bottom: 0;">Zpěvník ProScholy.cz <img
            src="/img/logo.svg"
            width="20px"/> {{ new Date().getFullYear() }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Inventory"
}
</script>

<style lang="scss">
.inventory-wrapper {
    width:        100%;
    //background-color: #f8fafc;
    height:       100vh;
    border-right: 1px solid #dedede;

    padding:      7px 1rem;


    .brand-heading {
        color:       black;

        font-size:   1.3rem;
        font-weight: 500;
        font-family: "Open Sans", "Arial Black", sans-serif;

    }

    // Grey label above table
    .inventory-section-label {
        margin-top:     15px;
        margin-bottom:  7px;

        text-transform: uppercase;
        font-size:      0.73rem;
        color:          black;
        letter-spacing: 0.5px;
        font-weight:    600;
    }

    .table-inventory {
        .playlist-icon {
            padding:  0 10px 10px 5px;
            color:    #1d6dab;
            position: relative;
            top:      3px;
        }

        td {
            vertical-align: center;
            text-align:     center;
        }

        td.label {
            text-align: left;
        }
    }
}


</style>
