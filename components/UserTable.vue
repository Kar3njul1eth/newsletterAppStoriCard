<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="newUser.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="addUser">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Subscribed', value: 'subscribed' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      newUser: {
        email: '',
        subscribed: true
      }
    }
  },
  async created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get('/users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async addUser() {
      try {
        const response = await this.$axios.post('/users', this.newUser)
        this.users.push(response.data)
        this.dialog = false
        this.newUser.email = ''
      } catch (error) {
        console.error('Error adding user:', error)
      }
    },
    editUser(user) {
      console.log('Edit user:', user)},
    async deleteUser(user) {
      try {
        await this.$axios.delete(`/users/${user.id}`)
        this.users = this.users.filter(u => u.id !== user.id)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }
}
</script>

<style scoped>
</style>
