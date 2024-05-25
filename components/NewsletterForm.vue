<template>
  <v-form>
    <v-text-field v-model="newsletter.subject" label="Subject"></v-text-field>
    <v-textarea v-model="newsletter.content" label="Content"></v-textarea>
    <v-text-field v-model="newsletter.callToActionLabel" label="Call to Action Label"></v-text-field>
    <v-text-field v-model="newsletter.callToActionLink" label="Call to Action Link"></v-text-field>
    <v-file-input v-model="newsletter.attachment" label="Attachment" accept="application/pdf, image/png"></v-file-input>
    <v-btn color="primary" @click="sendNewsletter">Send Newsletter</v-btn>
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
      }
    }
  },
  methods: {
    async sendNewsletter() {
      const formData = new FormData()
      formData.append('subject', this.newsletter.subject)
      formData.append('content', this.newsletter.content)
      formData.append('callToActionLabel', this.newsletter.callToActionLabel)
      formData.append('callToActionLink', this.newsletter.callToActionLink)
      if (this.newsletter.attachment) {
        formData.append('attachment', this.newsletter.attachment)
      }
      try {
        await this.$axios.post('/newsletters', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$toast.success('Newsletter sent successfully!')
      } catch (error) {
        console.error('Error sending newsletter:', error)
        this.$toast.error('Failed to send newsletter')
      }
    }
  }
}
</script>

<style scoped>
</style>
