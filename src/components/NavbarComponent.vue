<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem('token'); // Supprimer le token
  router.push('/login');            // Rediriger vers la page login
}
</script>

<template>
  <nav class="navbar navbar-light bg-light mb-3">
    <div class="container-fluid justify-content-around">
      <router-link to="/" class="navbar-brand">
        <i class="bi bi-person-lines-fill"></i> Gestionnaire de contacts Vue Js
      </router-link>

      <div class="d-flex gap-2">
        <router-link to="/Add" class="btn btn-success">
          <i class="bi bi-plus-circle"></i> Ajouter
        </router-link>

        <button @click="logout" class="btn btn-outline-danger">
          <i class="bi bi-box-arrow-right"></i> Déconnexion
        </button>
      </div>
    </div>
  </nav>
</template>
