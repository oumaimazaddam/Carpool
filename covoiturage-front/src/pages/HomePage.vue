<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg shadow-2 fade-in" style="width: 400px; text-align: center">
      <q-card-section>
        <div class="text-h5">Bienvenue sur l'application</div>
      </q-card-section>

      <q-card-section class="column items-center">
        <q-btn
          label="Se connecter"
          color="primary"
          class="full-width q-mb-md"
          @click="goToLogin"
        />
        
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()


const goToLogin = () => {
    window.location.href = 'http://localhost:9000/login1'; 
  };
  
 
</script>

<style scoped>
/* Animation d'apparition */
.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
