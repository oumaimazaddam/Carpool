<template>
  <q-card class="bg-transparent no-shadow no-border" bordered>
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
            <q-item-section 
              v-if="icon_position === 'left' || icon_position === 'center'" 
              side 
              :style="`background-color: ${item.color2}`"
              class="q-pa-lg q-mr-none text-white"
            >
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section>
            
            <q-item-section class="q-pa-md q-ml-none text-white text-center">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            
            <q-item-section v-if="icon_position === 'right'  ">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },
  computed: {
    items: function () {
      if (this.icon_position === "left") {
        return [
          { title: "USERS", icon: "group", value: "80", color1: "#5064b5", color2: "#3e51b5" },
          { title: "Drivers", icon: "fas fa-car", value: "50", color1: "#f37169", color2: "#f34636" },
          { title: "Passengers", icon: "fas fa-user", value: "30", color1: "#ea6a7f", color2: "#ea4b64" },
          { title: "Trips", icon: "fas fa-route", value: "100", color1: "#a270b1", color2: "#9f52b1" }
        ];
      } else if (this.icon_position === "right") {
        return [
          { title: "Drivers", icon: "fas fa-car", value: "50", color1: "#546bfa", color2: "#3e51b5" },
          { title: "Trips", icon: "fas fa-route", value: "100", color1: "#3a9688", color2: "#3e51b5" },
          { title: "Car", icon: "fas fa-car", value: "50", color1: "#7cb342", color2: "#3e51b5" },
          { title: "Active Passenger", icon: "person", value: "30", color1: "#f88c2b", color2: "#3e51b5" }
        ];
      } else { 
        return [
          { title: "Total Reservations", icon: "fas fa-calendar-check", value: "100", color1: "#4CAF50", color2: "#388E3C" },
          { title: "Completed Rides", icon: "fas fa-check-circle", value: "85", color1: "#03A9F4", color2: "#0288D1" },
          { title: "Cancelled Trips", icon: "fas fa-ban", value: "15", color1: "#E91E63", color2: "#C2185B" },
          { title: "Active Driver", icon: "person", value: "50", color1: "#FF9800", color2: "#F57C00" }
        ];
      }
    }
  }
})
</script>
