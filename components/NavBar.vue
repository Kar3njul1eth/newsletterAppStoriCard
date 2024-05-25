<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Newsletter Technology App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" text>Home</v-btn>
    <v-btn to="/users" text>Users</v-btn>
    <v-btn to="/newsletters" text>Newsletters</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.v-toolbar__title {
  font-size: 24px;
}
</style>
