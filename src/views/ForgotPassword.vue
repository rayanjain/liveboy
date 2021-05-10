<template>
  Forgot Password Page
  <button @click="loadButton">click</button>
  <div class="google-signin-button"></div>
</template>

<script>
export default {
  mounted() {},
  methods: {
    loadButton() {
      window.gapi.signin2.render('google-signin-button', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: this.onGSuccess,
        onfailure: this.onGFailure,
      })
    },
    onGSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
    },
    onGFailure(err) {
      console.log(err)
    },
  },
}
</script>

<style></style>
