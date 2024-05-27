<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="newsletter.subject"
        label="Subject"
        required
        :rules="[v => !!v || 'Subject is required']">
      </v-text-field>
      <v-textarea
        v-model="newsletter.content"
        label="Content"
        required
        :rules="[v => !!v || 'Content is required']">
      </v-textarea>
      <v-text-field
        v-model="newsletter.callToActionLabel"
        label="Call to Action Label"
        required
        :rules="[v => !!v || 'Call to Action Label is required']">
      </v-text-field>
      <v-text-field
        v-model="newsletter.callToActionLink"
        label="Call to Action Link"
        required
        :rules="[v => !!v || 'Call to Action Link is required']">
      </v-text-field>
      <v-file-input
        v-model="newsletter.attachment"
        label="Attachment"
        accept="application/pdf, image/png">
      </v-file-input>
      <v-btn color="primary" @click="sendNewsletter" :loading="isLoading" :disabled="!valid">Send Newsletter</v-btn>
    </v-form>
    <v-dialog v-model="showSuccessDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Success</v-card-title>
        <v-card-text>
          The newsletter was sent successfully!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeSuccessDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      showSuccessDialog: false,
      valid: false,
    };
  },
  methods: {
    async sendNewsletter() {
      if (!this.$refs.form.validate()) {
        this.$toast.error('Please fill in all required fields');
        return;
      }

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
          this.showSuccessDialog = true;
          this.$toast.success('Newsletter sent successfully!');
        } else {
          this.$toast.error('Failed to send newsletter');
        }
      } catch (error) {
        console.error('Error during request:', error);
      } finally {
        this.isLoading = false;
      }
    },
    closeSuccessDialog() {
      this.showSuccessDialog = false;
      this.resetForm();
    },
    resetForm() {
      this.newsletter.subject = '';
      this.newsletter.content = '';
      this.newsletter.callToActionLabel = '';
      this.newsletter.callToActionLink = '';
      this.newsletter.attachment = null;
      this.$refs.form.resetValidation();
    }
  }
}
</script>

<style scoped>
</style>
