<template>
  <!-- <NavBar /> -->
  <div class="d-flex justify-content-center container mt-3 mt-md-5">
    <div class="col-md-6 col">
      <h5 class="mb-3">Payment History</h5>
      <div v-if="networkError" class="card mt-2">
        <div class="card-body text-center text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            class="bi bi-wifi-off"
            viewBox="0 0 16 16"
          >
            <path
              d="M10.706 3.294A12.546 12.546 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404l.785-.785c.63.24 1.228.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.934-.933a6.454 6.454 0 0 1 2.012.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905l.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .048.737.518.518 0 0 1-.668.05 11.496 11.496 0 0 0-1.812-1.07zM9.02 11.78c.238.14.236.464.04.66l-.706.706a.5.5 0 0 1-.708 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.373 0 .722.102 1.02.28zm4.355-9.905a.53.53 0 1 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"
            />
          </svg>
          <h5>Network Error</h5>
          <button @click="loadHistory" class="btn btn-secondary m-5">
            Retry
          </button>
        </div>
      </div>
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div
        v-else
        class="card mb-3"
        v-for="payment in paymentsMade"
        :key="payment._id"
      >
        <div class="card-header text-secondary bg-body" align="right">
          <small>{{ payment.id }}</small>
        </div>
        <div class="card-body">
          <div class="d-flex">
            <div class="col-4">
              <img
                :src="payment.thumbnail"
                width="160"
                height="90"
                class="w-100"
                style="height: auto"
              />
            </div>
            <div class="col-8 ms-2">
              <div class="text-truncate">
                <strong>{{ payment.title }}</strong>
              </div>
              <div
                class="mt-2"
                :class="{
                  'text-danger': payment.type == 'payment',
                  'text-success': payment.type == 'payout',
                }"
              >
                <h5>
                  {{
                    payment.type == 'payment'
                      ? `- &#8377; ${payment.amount}`
                      : `+ &#8377; ${payment.amount}`
                  }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar'
import axios from 'axios'

export default {
  data() {
    return {
      paymentsMade: '',
      loading: false,
      networkError: false,
    }
  },
  components: {
    //NavBar,
  },
  mounted() {
    this.loadHistory()
  },
  methods: {
    loadHistory() {
      this.loading = true
      this.networkError = false
      axios
        .get('/paymenthistory', {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((res) => {
          this.paymentsMade = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 401) {
              localStorage.removeItem('token')
              this.$store.commit('changeToken', '')
              this.$router.push('/')
            }
          }
          this.loading = false
          this.networkError = true
        })
    },
  },
}
</script>

<style></style>
