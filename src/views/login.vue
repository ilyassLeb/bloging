<template>
  <div class="container mt-5">
    <h2>Connexion</h2>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" v-model="email" class="form-control" id="email" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Mot de passe</label>
      <input type="password" v-model="password" class="form-control" id="password" />
    </div>
    <button @click="login" class="btn btn-primary">Se connecter</button>
    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = () => {

  const validEmail = 'admin@example.com'
  const validPassword = 'admin123'

  if (email.value === validEmail && password.value === validPassword) {
    localStorage.setItem('token', 'fake_token') 
    router.push({ name: 'home' })
  } else {
    error.value = 'Identifiants invalides.'
  }
}
</script>
