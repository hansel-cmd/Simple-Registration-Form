<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <router-link to="/login">Log In</router-link>
                <router-link to="/register">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
