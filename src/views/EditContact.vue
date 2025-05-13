<script setup>
import { useRouter, useRoute } from "vue-router";
import EditAndAddComponent from "../components/EditAndAddComponent.vue";

const routeBack = useRouter();
const id = parseInt(useRoute().params.id);
</script>
<template>
   <div class="container">
      <button @click="routeBack.back()" class="float-end btn btn-success m-2">
         Go Back
      </button>
   </div>
   <EditAndAddComponent pageName="editPage" :id="id" />
</template>
