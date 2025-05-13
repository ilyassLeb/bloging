<script setup >
import { RouterLink } from "vue-router";
</script>
<template>
   <nav class="navbar navbar-light bg-light mb-3">
      <div class="container-fluid justify-content-around">
         <router-link to="/" class="navbar-brand"
            ><i class="bi bi-person-lines-fill"></i> Gestionnaire de contacts Vue Js</router-link>
         <form class="d-flex" role="search">
            <router-link to="/Add" class="btn btn-success">
               <i class="bi bi-plus-circle"></i> Ajouter
            </router-link>
         </form>
      </div>
   </nav>
</template>
