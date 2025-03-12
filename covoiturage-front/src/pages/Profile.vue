<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="profile-card">
          <q-card-section class="text-center">
            <q-avatar size="100px">
              <img :src="profile.photo_profile" alt="Profile Picture" />
            </q-avatar>
            <div class="text-h6 q-mt-md">{{ profile.name }}</div>
            <div class="text-subtitle1">{{ profile.email }}</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="updateProfile" class="q-gutter-md">
              <q-input filled v-model="profile.name" label="Name" />
              <q-input filled v-model="profile.email" label="Email" type="email" />
              <q-input filled v-model="profile.phone_number" label="Phone Number" />
              <q-input filled v-model="profile.birthday" label="Birthday" type="date" />
            
              <q-input filled v-model="profile.passaword" label="Passaword" />
              

              <q-btn label="Update Profile" color="primary" :loading="loading" type="submit" class="full-width" />
            </q-form>
          </q-card-section>

          <q-card-section class="text-center">
            <q-btn label="Delete Account" color="negative" @click="deleteAccount" />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { Notify } from 'quasar';

export default {
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone_number: '',
        photo_profile: '',
        birthday: '',
        role_id: '',
        car_id: '',
        drivingLicence: '',
        passaword:""
      },
      loading: false,
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get('http://localhost:8000/api/show-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        this.profile = response.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    async updateProfile() {
      this.loading = true;
      try {
        await axios.put('http://localhost:8000/api/update-profile', this.profile, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        Notify.create({ type: 'positive', message: 'Profile updated successfully!' });
      } catch (error) {
        Notify.create({ type: 'negative', message: 'Failed to update profile.' });
      } finally {
        this.loading = false;
      }
    },
    async deleteAccount() {
      try {
        await axios.delete('http://localhost:8000/api/delete-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        localStorage.removeItem('access_token');
        this.$router.push('/login');
      } catch (error) {
        Notify.create({ type: 'negative', message: 'Failed to delete account.' });
      }
    }
  }
};
</script>

<style scoped>
.profile-card {
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
}
.full-width {
  width: 100%;
}
</style>
