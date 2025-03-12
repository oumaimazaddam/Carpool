<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>App</q-toolbar-title>
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          />

          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>5</q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>

          <!-- Display Temperature -->
          <div v-if="temperature !== null" class="q-px-md text-white">
            <q-item-label class="text-white">
              {{ temperature }}°C
            </q-item-label>
          </div>

          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-primary text-white">
      <q-list>
        <q-expansion-item icon="train" label="Dashboard ">
          <q-item to="/dashboard" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>DashboardAdmin</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Gestion de utilisateur" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Gestion des droits Utilisateurs</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Liste" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Liste des Utilisateurs</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Trajet" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="alt_route" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Gestion de Trajet</q-item-label>
            </q-item-section>
          </q-item>
        
          <q-item to="/Feedbacks" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="rate_review" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Feedbacks</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Finencement" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="attach_money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Financement</q-item-label>
            </q-item-section>
          </q-item>

        </q-expansion-item>
        <q-item to="/Profile" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>User Profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Messenger" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Messengers</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Passengers Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Dashboard3" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Drivers Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Logout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Messages from "./Messages.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default defineComponent({
  name: "MainLayout",
  components: {
    Messages
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const city = ref("Sousse");  // Default city
    const temperature = ref(null);
    const loading = ref(false);
    const errorMessage = ref("");

    const apiKey = 'e9ff1286dbfd43779be7d4be2465cff0'; // Replace with your Weatherbit API key

    // Fetch weather data
    const getWeatherData = async () => {
      loading.value = true;
      errorMessage.value = "";  // Reset error message

      try {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/current?city=${city.value}&key=${apiKey}&lang=fr`
        );

        // Update temperature data on successful API call
        temperature.value = response.data.data[0].temp;

      } catch (error) {
        console.error("Weather API Error:", error);
        errorMessage.value = "Failed to fetch weather data. Check API key or city.";
      } finally {
        loading.value = false;
      }
    };

    // Call weather API when component is mounted
    onMounted(() => {
      if (!city.value) {
        city.value = 'Tunisia'; // Default city
      }
      getWeatherData(); // Fetch weather data when component is mounted
      setInterval(getWeatherData, 60000); // Update the weather data every minute
    });

    return {
      $q,
      leftDrawerOpen,
      temperature,
      loading,
      errorMessage,
      getWeatherData,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>

<style>
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0%, 20%, 30%, 50%, 70% {
    transform: scale(1);
  }
  5%, 35%, 55% {
    transform: scale(1.25);
  }
}
</style>
