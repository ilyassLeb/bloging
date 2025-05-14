<script setup>
import { reactive, ref, onMounted } from "vue";

const allContactsData = reactive({ data: [] });
const searchString = ref("");

// Récupérer tous les contacts
async function getAllContacts(search = "") {
   try {
      let url = 'http://localhost:9000/contacts';
      if (search) {
         url += `?q=${search}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (search) {
         allContactsData.data = result.filter(contact =>
            contact.name.toLowerCase().includes(search.toLowerCase())
         );
      } else {
         allContactsData.data = result;
      }
   } catch (error) {
      console.log(error);
   }
}

async function deleteContacts(id) {
   const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?");
   if (!confirmed) return;

   try {
      const result = await fetch(`http://localhost:9000/contacts/${id}`, {
         method: 'DELETE'
      });
      if (result.ok) {
         getAllContacts(searchString.value);
      }
   } catch (error) {
      console.log(error);
   }
}

function onSearch() {
   getAllContacts(searchString.value);
}

onMounted(() => {
   getAllContacts();
});
</script>


<template>
   <div class="container">
      <div class="row mb-3">
         <div class="col d-flex justify-content-center">
            <nav class="navbar bg-transparent">
               <div class="container-fluid">
                  <form @submit.prevent="onSearch" class="d-flex bg-transparent" role="search">
                     <input
                        v-model="searchString"
                        class="form-control border-success me-2 bg-transparent"
                        type="search"
                        placeholder="Search by name"
                        aria-label="Search"
                     />
                     <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
               </div>
            </nav>
         </div>
         <hr class="mt-3" />
      </div>

      <!-- Afficher un message si la liste est vide -->
      <div v-if="allContactsData.data.length === 0" class="text-center text-muted mt-4">
         Aucun contact trouvé.
      </div>

      <!-- Afficher la liste des contacts -->
      <div v-else class="row justify-content-center">
         <div
            v-for="data in allContactsData.data"
            :key="data.id"
            class="col-5 m-1 p-2 d-flex bg-success bg-opacity-25 rounded-3"
         >
            <div class="col-3 rounded-circle m-auto w-auto">
               <img :src="data.photo" class="img-fluid rounded-circle img-height" alt="..." />
            </div>
            <div class="col-6 m-auto">
               <div class="d-flex flex-column">
                  <div class="my-1">
                     <h6 class="text-secondary d-inline">Name:</h6>
                     <p class="card-text d-inline">{{ data.name }}</p>
                  </div>
                  <div class="my-1">
                     <h6 class="text-secondary d-inline">Mobile:</h6>
                     <p class="card-text d-inline">{{ data.phone }}</p>
                  </div>
                  <div class="my-1">
                     <h6 class="text-secondary d-inline">Email:</h6>
                     <p class="card-text d-inline">{{ data.email }}</p>
                  </div>
               </div>
            </div>
            <div class="col-1 d-flex flex-column m-auto">
               <router-link :to="`/View/${data.id}`" class="btn btn-sm btn-success my-1">
                  <i class="bi bi-eye"></i>
               </router-link>
               <router-link :to="`/Edit/${data.id}`" class="btn btn-sm btn-warning my-1">
                  <i class="bi bi-pen"></i>
               </router-link>
               <button @click="deleteContacts(data.id)" class="btn btn-sm btn-danger my-1">
                  <i class="bi bi-trash3"></i>
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.img-height {
   height: 80px;
}
</style>
