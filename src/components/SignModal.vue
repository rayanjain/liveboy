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
              <div
                class="g-signin2"
                data-onsuccess="onSignIn"
                data-theme="light"
                data-width="300"
                data-height="50"
                data-longtitle="true"
              ></div>
            </div>
            <!-- <div
              class="g-signin2"
              data-onsuccess="onSignIn"
              data-width="100%"
              data-height="60"
            ></div> -->
            <!-- <div
              class="card p-1 text-secondary shadow mt-2"
              style="cursor: pointer;"
              data-onsuccess="onSignIn"
            >
              <div class="d-flex">
                <img
                  src="data:image/png;base64,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"
                  style="width: 40px; height: 40px;"
                />
                <div class="align-self-center ms-3">
                  Sign In with Google
                </div>
              </div>
            </div> -->
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
  mounted() {},
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
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
    },
    onGFailure(err) {
      console.log(err)
    },
  },
}
</script>

<style></style>
