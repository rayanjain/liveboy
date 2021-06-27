<template>
  <div class="container mt-5 d-flex justify-content-center" style="">
    <div class="col-lg-6 col-md-8 col">
      <div class="card">
        <div class="card-header bg-body">
          Change Password
        </div>
        <div class="card-body">
          <form class="needs-validation" @submit.prevent="changePassword">
            <div v-if="errorMessage != ''" class="alert alert-danger mb-3">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage != ''" class="alert alert-success mb-3">
              {{ successMessage }}
            </div>
            <div class="mb-3">
              <label for="newemail" class="form-label">Email</label>
              <div class="input-group">
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="button-addon2"
                  required
                  v-model="email"
                  id="newemail"
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
            <div class="mb-3">
              <label for="newpassword" class="form-label">New Password</label>
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
            <div v-if="loading" class="d-flex justify-content-center mt-3">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else class="d-grid gap-2 mt-3">
              <button class="btn btn-primary" type="submit">
                Change Password
              </button>
            </div>
          </form>
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
      errorMessage: '',
      successMessage: '',
      email: '',
      otp: '',
      newpassword: '',
      confirmpassword: '',
      loading: false,
      getOTPLoading: false,
    }
  },
  methods: {
    sendOTP() {
      if (this.email == '') {
        this.errorMessage = 'Invalid Email'
        return
      }
      this.errorMessage = ''
      this.successMessage = ''
      this.getOTPLoading = true
      axios
        .post('user/passwordotp', {
          email: this.email,
        })
        .then(() => {
          this.getOTPLoading = false
          this.successMessage = 'OTP Sent'
        })
        .catch((err) => {
          this.getOTPLoading = false
          if (err.response) this.errorMessage = err.response.data
          else this.errorMessage = 'Network Error'
        })
    },
    changePassword() {
      if (this.newpassword != this.confirmpassword) {
        this.errorMessage = 'Passwords do not match'
        return
      }
      this.errorMessage = ''
      this.successMessage = ''
      this.loading = true
      axios
        .post('user/changepassword', {
          email: this.email,
          otp: this.otp,
          password: this.newpassword,
        })
        .then(() => {
          this.loading = false
          this.successMessage = 'Password Changed Successfully'
        })
        .catch((err) => {
          this.loading = false
          this.getOTPLoading = false
          if (err.response) this.errorMessage = err.response.data
          else this.errorMessage = 'Network Error'
        })
    },
  },
}
</script>

<style></style>
