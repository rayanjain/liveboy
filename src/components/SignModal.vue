<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="mb-2">
            <button
              type="button"
              ref="closeModal"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style="float: right"
            ></button>
          </div>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Log In
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Sign Up
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <!-- Sign In -->
              <form @submit.prevent="signIn">
                <div
                  v-if="signInError != ''"
                  class="alert alert-danger mb-3"
                  role="alert"
                >
                  {{ signInError }}
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    autocapitalize="none"
                    class="form-control"
                    id="username"
                    v-model="username"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    autocomplete="current-password"
                    v-model="password"
                    required
                  />
                </div>
                <div
                  v-if="signInLoading"
                  class="d-flex justify-content-center mt-3"
                >
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div v-else class="d-grid gap-2 mt-3">
                  <button class="btn btn-primary" type="submit">Sign In</button>
                </div>
                <div class="m-2" align="right">
                  <router-link to="/forgotpassword">
                    Forgotten Password?
                  </router-link>
                </div>
              </form>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <!-- Sign Up -->
              <form class="needs-validation" @submit.prevent="signUp">
                <div v-if="signUpError != ''" class="alert alert-danger mb-3">
                  {{ signUpError }}
                </div>
                <div
                  v-if="signUpSuccess != ''"
                  class="alert alert-success mb-3"
                >
                  {{ signUpSuccess }}
                </div>
                <div class="mb-3">
                  <label for="newusername" class="form-label">Username</label>
                  <input
                    type="text"
                    autocapitalize="none"
                    class="form-control"
                    :class="{
                      'is-valid': allowUsername == 1,
                      'is-invalid': allowUsername == -1,
                    }"
                    id="newusername"
                    v-model="newusername"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="newpassword" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="newpassword"
                    autocomplete="new-password"
                    v-model="newpassword"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="confirmpassword" class="form-label"
                    >Confirm Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="confirmpassword"
                    autocomplete="new-password"
                    v-model="confirmpassword"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      aria-describedby="button-addon2"
                      required
                      v-model="email"
                      id="email"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      disabled="true"
                      v-if="getOTPLoading"
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Loading...</span>
                    </button>
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      @click="sendOTP"
                      v-else
                    >
                      Get OTP
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="otp" class="form-label">OTP</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="otp"
                    maxlength="6"
                    v-model="otp"
                    required
                  />
                </div>
                <div
                  v-if="signUpLoading"
                  class="d-flex justify-content-center mt-3"
                >
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div v-else class="d-grid gap-2 mt-3">
                  <button class="btn btn-primary" type="submit">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-3">
            <div class="text-secondary text-center">
              OR
            </div>
            <!-- Sign In with google button -->
            <div class="mt-2" align="center">
              <div id="my-signin2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allowUsername: 0,
      signInError: '',
      signInLoading: false,
      signUpError: '',
      signUpSuccess: '',
      signUpLoading: false,
      getOTPLoading: false,
      //v-model data
      username: '',
      password: '',
      newusername: '',
      newpassword: '',
      confirmpassword: '',
      email: '',
      otp: '',
    }
  },
  mounted() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 300,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onGSuccess,
    })
  },
  methods: {
    signIn() {
      this.signInLoading = true
      this.signInError = ''
      axios
        .post('/login/signin', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.signInLoading = false
          localStorage.setItem('token', response.data)
          this.$store.commit('changeToken', response.data)
          this.$refs['closeModal'].click()
        })
        .catch((err) => {
          this.signInLoading = false
          if (err.response) this.signInError = err.response.data
          else this.signInError = 'Network Error'
        })
    },
    signUp() {
      this.signUpLoading = true
      this.signUpError = ''
      this.signUpSuccess = ''
      if (this.newpassword != this.confirmpassword) {
        this.signUpLoading = false
        this.signUpError = 'Passwords do not match'
        return
      }
      axios
        .post('login/signup', {
          newusername: this.newusername,
          newpassword: this.newpassword,
          email: this.email,
          otp: this.otp,
        })
        .then((response) => {
          this.signUpLoading = false
          localStorage.setItem('token', response.data)
          this.$store.commit('changeToken', response.data)
          this.$refs['closeModal'].click()
        })
        .catch((err) => {
          this.signUpLoading = false
          if (err.response) this.signUpError = err.response.data
          else this.signUpError = 'Network Error'
        })
    },
    checkUsername() {},
    sendOTP() {
      this.signUpError = ''
      this.signUpSuccess = ''
      this.getOTPLoading = true
      axios
        .post('login/getotp', {
          email: this.email,
        })
        .then((response) => {
          this.getOTPLoading = false
          this.signUpSuccess = response.data
        })
        .catch((err) => {
          this.getOTPLoading = false
          this.signUpError = err.response.data
        })
    },
    onGSuccess(googleUser) {
      this.signInLoading = true
      this.signUpLoading = true
      const id_token = googleUser.getAuthResponse().id_token
      axios
        .post('/login/googlesignin', {
          id_token: id_token,
        })
        .then((response) => {
          const auth2 = window.gapi.auth2.getAuthInstance()
          auth2.signOut()

          this.signInLoading = false
          this.signUpLoading = false

          localStorage.setItem('token', response.data)
          this.$store.commit('changeToken', response.data)
          this.$refs['closeModal'].click()
        })
        .catch(() => {
          const auth2 = window.gapi.auth2.getAuthInstance()
          auth2.signOut()

          this.signInError = 'Some error occured'
          this.signUpError = 'Some error occured'

          this.signInLoading = false
          this.signUpLoading = false
        })
    },
  },
}
</script>

<style></style>
