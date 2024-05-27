<template>
  <v-form>
    <v-text-field v-model="newsletter.subject" label="Subject" required></v-text-field>
    <v-textarea v-model="newsletter.content" label="Content" required></v-textarea>
    <v-text-field v-model="newsletter.callToActionLabel" label="Call to Action Label" required></v-text-field>
    <v-text-field v-model="newsletter.callToActionLink" label="Call to Action Link" required></v-text-field>
    <v-file-input v-model="newsletter.attachment" label="Attachment" accept="application/pdf, image/png"></v-file-input>
    <v-btn color="primary" @click="sendNewsletter" :loading="isLoading">Send Newsletter</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      newsletter: {
        subject: '',
        content: '',
        callToActionLabel: '',
        callToActionLink: '',
        attachment: null
      },
      isLoading: false,
    }
  },
  methods: {
    async sendNewsletter() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('subject', this.newsletter.subject);
      formData.append('content', this.newsletter.content);
      formData.append('callToActionLabel', this.newsletter.callToActionLabel);
      formData.append('callToActionLink', this.newsletter.callToActionLink);
      if (this.newsletter.attachment) {
        formData.append('attachment', this.newsletter.attachment);
      }

      try {
        const response = await this.$axios.post('/api/api/newsletters/send', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Response data:', response.data);

        if (response.data.success) {
          this.$toast.success('Newsletter sent successfully!');
        } else {
          this.$toast.error('Failed to send newsletter');
        }
      } catch (error) {
        console.error('Error during request:', error);
        if (error.response) {
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        this.$toast.error('Failed to send newsletter');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
</style>
