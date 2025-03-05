<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg no-shadow" bordered>
      <q-card-section class="text-center">
        <q-avatar size="100px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
      </q-card-section>
      
      <q-card-section class="text-center">
        <div class="text-h6 text-grey-8">Déconnexion</div>
        <p class="text-body1 text-grey-7">Êtes-vous sûr de vouloir vous déconnecter ?</p>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn label="Se déconnecter" color="red" @click="$router.push('login1')"  />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import axios from 'axios';
export default {
  name: "Footer",
  methods: {
    async logout() {
      try {
        const response = await axios.get("http://localhost:8000/api/logout", { withCredentials: true });

        if (response.data.success) {
          this.$router.push("/"); 
        } else {
          console.error("Erreur de déconnexion :", response.data.message);
        }
      } catch (error) {
        console.error("Erreur serveur :", error);
      }
    }
  }
};

</script>

<style scoped>

</style>
