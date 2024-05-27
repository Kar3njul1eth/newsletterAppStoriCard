<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-form ref="form" @submit.prevent="onSubmit">
              <v-text-field v-model="form.name" label="Name" required></v-text-field>
              <v-text-field v-model="form.email" label="Email" required></v-text-field>
              <v-btn type="submit" :loading="isLoading" color="primary">Subscribe</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-data-table :headers="headers" :items="users" class="elevation-1">
          <template v-slot:[`item.newsletterStatus`]="{ item }">
            <span :class="statusClass(item.newsletterStatus)">{{ item.newsletterStatus }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="showSuccessModal" max-width="500">
      <v-card>
        <v-card-title class="headline">Subscription Successful</v-card-title>
        <v-card-text>
          You have successfully subscribed!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showSuccessModal = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      isLoading: false,
      showSuccessModal: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Newsletter Status', value: 'newsletterStatus' },
      ],
      users: []
    }
  },
  async created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get('/users');
        if (Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        const response = await this.$axios.post('/users', this.form);
        this.$refs.form.reset();
        this.users.push(response.data);
        this.showSuccessModal = true;
      } catch (error) {
        console.error('Error adding user:', error);
        this.$toast.error('Failed to add user');
      } finally {
        this.isLoading = false;
      }
    },
    statusClass(status) {
      return {
        'text-green-500': status === 'Subscribed',
        'text-red-500': status === 'Unsubscribed'
      };
    }
  }
};
</script>

<style scoped>
.text-green-500 {
  color: green;
}
.text-red-500 {
  color: red;
}
</style>
