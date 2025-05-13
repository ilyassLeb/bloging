<script setup>
import { useRouter } from "vue-router";
import EditAndAddComponent from "../components/EditAndAddComponent.vue";
const routeBack = useRouter();
</script>
<template>
   <div class="container">
         <button @click="routeBack.back()" class="float-end btn btn-success m-2">
            Go Back
         </button>
   </div>
   <EditAndAddComponent pageName="addPage" />
</template>
