  <template>
    <v-app>
      <NavBar />
      <v-main class="main">
          <Nuxt />
      </v-main>
    </v-app>
  </template>

  <script>

  export default {
    name: 'DefaultLayout',
  }
  </script>

  <style>
  .main {
    background-color: white;
  }
  </style>