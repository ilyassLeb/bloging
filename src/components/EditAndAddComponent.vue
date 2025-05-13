<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const routePush = useRouter();
let allContactsData = reactive({ data: {} });
let allGroupData = reactive({ data: {} });

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

// get all group data
(async function getAllGroup() {
  try {
    const res = await fetch(`${baseUrl}/groups`);
    const data = await res.json();
    allGroupData.data = data;
  } catch (error) {
    console.log(error);
  }
})();

// if edit page: get contact by ID
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

// Add new contact
async function addNewContact(data) {
  try {
    await fetch(`${baseUrl}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    routePush.push("/");
  } catch (error) {
    console.log(error);
  }
}

// Update contact
async function updateData(id) {
  if (!id) {
    console.error("Aucun ID fourni pour la mise à jour !");
    return;
  }
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
         <div
            class="col d-flex justify-content-between bg-success bg-opacity-25 p-3"
         >
            <div class="col-6">
               <form>
                  <div class="mt-1">
                     <input
                        type="text"
                        v-model="allContactsData.data.name"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Name"
                        required
                     />
                  </div>
                  <div class="mt-1">
                     <input
                        type="email"
                        v-model="allContactsData.data.email"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        required
                     />
                  </div>
                  <div class="mt-1">
                     <input
                        type="number"
                        v-model="allContactsData.data.phone"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="phone"
                        required
                     />
                  </div>
                  <div class="mt-1">
                     <input
                        type="text"
                        v-model="allContactsData.data.company"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Company"
                        required
                     />
                  </div>
                  <div class="mt-1">
                     <input
                        type="text"
                        v-model="allContactsData.data.title"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Title"
                        required
                     />
                  </div>
                  <div class="mt-1">
                     <select
                        v-model="allContactsData.data.groupId"
                        class="form-select bg-transparent border-dark"
                        aria-label="Default select example"
                        placeholder="select group"
                        required
                     >
                        <option :value="null">Select group</option>
                        <option
                           v-for="group in allGroupData.data"
                           :key="group.id"
                           :value="group.id"
                        >
                           {{ group.name }}
                        </option>
                     </select>
                  </div>
                  <div class="mt-1">
                     <input
                        type="text"
                        v-model="allContactsData.data.photo"
                        class="form-control bg-transparent border-dark"
                        id=""
                        aria-describedby="emailHelp"
                        placeholder="Paste your image link ....."
                        required
                     />
                  </div>
                  <!-- if this component call by edit page then this button will be show -->
                  <button
                     v-if="pageName == 'editPage'"
               
                     @click.prevent="updateData(props.id)"

                     type="submit"
                     class="btn btn-success float-end mt-3"
                  >
                     Update Contact
                  </button>
                  <!-- if this component call by add page then this button will be show -->
                  <button
                     v-if="pageName == 'addPage'"
                     @click.prevent="addNewContact(allContactsData.data)"
                     type="submit"
                     class="btn btn-warning float-end mt-3"

                  >
                     Save Contact
                  </button>
               </form>
            </div>
            <div class="col-6 rounded-circle m-auto w-auto">
               <img
                  :src="allContactsData.data.photo"
                  alt="Please upload your picture"
                  class="img-fluid rounded-circle img-height"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.img-height {
   height: 250px;
}
</style>
