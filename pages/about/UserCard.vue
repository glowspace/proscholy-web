<template>
    <div :class="[{ 'bg-transparent': multiple }, 'card']">
        <div class="card-body">
            <h5 :class="[{ 'mb-0': !info }, 'card-title']">{{ name }}</h5>
            <p class="card-text">{{ info }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserCard',

    props: ['name', 'info', 'multiple']
};
</script>
