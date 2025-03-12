<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-card">
        
          <q-card-section class="text-center">
           
            <div class="text-subtitle1 q-mt-sm">
              <strong class="text-h6">Sign in to access dashboard.</strong>
            </div>
            
          </q-card-section>

          <!-- Formulaire de connexion -->
          <q-card-section>
            <q-form @submit="submitLogin" class="q-gutter-md">
              <!-- Email -->
              <q-input
                filled
                v-model="email"
                label="Your Email"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter your email']"
                autofocus
              />

              <!-- Mot de passe -->
              <q-input
                type="password"
                filled
                v-model="password"
                label="Your Password"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Enter your password']"
              />

              <!-- Options -->
              <div class="row items-center justify-between">
                <q-checkbox v-model="remember" label="Remember Me" />
              
              </div>

              <!-- Message d'erreur -->
              <div v-if="errorMessage" class="text-negative text-center">
                {{ errorMessage }}
              </div>

              <!-- Bouton Connexion -->
              <q-btn
                label="LOGIN"
                color="primary"
                :loading="loading"
                type="submit"
                class="full-width q-mt-md"
              />
            </q-form>
          </q-card-section>

          <!-- Connexion via réseaux sociaux -->
          <q-card-section class="text-center">
            <div class="custom-text">or Login with</div>
            <div class="q-mt-md social-buttons">
              <q-btn color="red" label="Google" class="social-btn" />
              <q-btn color="blue" label="Facebook" class="social-btn" />
              <q-btn color="blue-4" label="Twitter" class="social-btn" />
            </div>
          </q-card-section>

       
         
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async submitLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Both fields are required.';
        return;
      }

      this.loading = true;
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('access_token', response.data.access_token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      } finally {
        this.loading = false;

      }
    },
    async fetchProfile() {
      try {
        const response = await axios.get('http://localhost:8000/api/show-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        localStorage.setItem('user_profile', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }
};
  

</script>

<style scoped>
/* Styles pour le fond */
.q-page {
  background-color: #595757;
}

/* Card de connexion */
.login-card {
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
}


.app-title {
  margin-left: 100px;
}

/* Boutons Réseaux Sociaux */
.social-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-btn {
  min-width: 100px;
}

/* Pleine largeur pour le bouton LOGIN */
.full-width {
  width: 100%;
}
.custom-text {
  font-size: 20px; /* Ajuste selon tes besoins */
  font-weight: bold;
  color: #080808; /* Optionnel : changer la couleur */
}
</style>
