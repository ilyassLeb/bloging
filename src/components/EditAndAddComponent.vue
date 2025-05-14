<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const routePush = useRouter();

let allContactsData = reactive({ data: {} });
let allGroupData = reactive({ data: {} });
const successMessage = ref(""); // ✅ Message de succès

const errors = reactive({
  name: "",
  email: "",
  phone: "",
  company: "",
  title: "",

  photo: ""
});

const props = defineProps({
  pageName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
  },
});

const baseUrl = "http://localhost:9000";

// Récupérer tous les groupes
(async function getAllGroup() {
  try {
    const res = await fetch(`${baseUrl}/groups`);
    const data = await res.json();
    allGroupData.data = data;
  } catch (error) {
    console.log(error);
  }
})();

// Si c’est une page de modification : récupérer le contact
if (props.pageName === "editPage") {
  (async function getSingleContactsForEdit() {
    try {
      const res = await fetch(`${baseUrl}/contacts/${props.id}`);
      const data = await res.json();
      allContactsData.data = data;
    } catch (error) {
      console.log(error);
    }
  })();
}

// Validation des champs
function validateForm() {
  let isValid = true;

  errors.name = !allContactsData.data.name ? "Name is required." : "";
  errors.email = !allContactsData.data.email
    ? "Email is required."
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(allContactsData.data.email)
    ? "Invalid email format."
    : "";
  errors.phone = !allContactsData.data.phone ? "Phone is required." : "";
  errors.company = !allContactsData.data.company ? "Company is required." : "";
  errors.title = !allContactsData.data.title ? "Title is required." : "";
  errors.photo = !allContactsData.data.photo ? "Photo link is required." : "";

  for (const key in errors) {
    if (errors[key]) isValid = false;
  }

  return isValid;
}

// Ajouter un contact
async function addNewContact(data) {
  if (!validateForm()) return;

  try {
    await fetch(`${baseUrl}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    successMessage.value = "✅ Contact ajouté avec succès !";

    // Redirection après 2 secondes
    setTimeout(() => {
      routePush.push("/");
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}

// Modifier un contact
async function updateData(id) {
  if (!validateForm()) return;

  try {
    await fetch(`${baseUrl}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allContactsData.data),
    });
    routePush.push("/");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <h3 v-if="pageName == 'addPage'">Add page</h3>
        <h3 v-if="pageName == 'editPage'">Edit page</h3>
      </div>
      <hr class="mt-3" />
    </div>

    <div class="row">
      <div class="col d-flex justify-content-between bg-success bg-opacity-25 p-3">
        <div class="col-6">

          <!-- ✅ Message de succès -->
          <div v-if="successMessage" class="alert alert-success text-center">
            {{ successMessage }}
          </div>

          <form>
            <div class="mt-1">
              <input type="text" v-model="allContactsData.data.name" class="form-control bg-transparent border-dark" placeholder="Name" />
              <div class="text-danger" v-if="errors.name">{{ errors.name }}</div>
            </div>
            <div class="mt-1">
              <input type="email" v-model="allContactsData.data.email" class="form-control bg-transparent border-dark" placeholder="Email" />
              <div class="text-danger" v-if="errors.email">{{ errors.email }}</div>
            </div>
            <div class="mt-1">
              <input type="number" v-model="allContactsData.data.phone" class="form-control bg-transparent border-dark" placeholder="Phone" />
              <div class="text-danger" v-if="errors.phone">{{ errors.phone }}</div>
            </div>
            <div class="mt-1">
              <input type="text" v-model="allContactsData.data.company" class="form-control bg-transparent border-dark" placeholder="Company" />
              <div class="text-danger" v-if="errors.company">{{ errors.company }}</div>
            </div>
            <div class="mt-1">
              <input type="text" v-model="allContactsData.data.title" class="form-control bg-transparent border-dark" placeholder="Title" />
              <div class="text-danger" v-if="errors.title">{{ errors.title }}</div>
            </div>
            <div class="mt-1">
              <!-- <select v-model="allContactsData.data.groupId" class="form-select bg-transparent border-dark">
                <option :value="null">Select group</option>
                <option v-for="group in allGroupData.data" :key="group.id" :value="group.id">{{ group.name }}</option>
              </select> -->
              <div class="text-danger" v-if="errors.groupId">{{ errors.groupId }}</div>
            </div>
            <div class="mt-1">
              <input type="text" v-model="allContactsData.data.photo" class="form-control bg-transparent border-dark" placeholder="Paste your image link ....." />
              <div class="text-danger" v-if="errors.photo">{{ errors.photo }}</div>
            </div>
            <button v-if="pageName == 'editPage'" @click.prevent="updateData(props.id)" type="submit" class="btn btn-success float-end mt-3">Update Contact</button>
            <button v-if="pageName == 'addPage'" @click.prevent="addNewContact(allContactsData.data)" type="submit" class="btn btn-warning float-end mt-3">Save Contact</button>
          </form>
        </div>
        <div class="col-6 rounded-circle m-auto w-auto">
          <img :src="allContactsData.data.photo" alt="Please upload your picture" class="img-fluid rounded-circle img-height" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-height {
  height: 250px;
}
.text-danger {
  font-size: 0.875rem;
}
</style>
