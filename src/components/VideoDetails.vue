<template>
  <div class="col-md-8 p-md-3">
    <div
      class="alert alert-danger alert-dismissible fade show  mb-md-3 mb-0"
      role="alert"
      v-if="paymentError != ''"
    >
      {{ paymentError }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div v-if="!paymentstatus" style="position: relative;">
      <img
        :src="thumbnail"
        alt="Thumbnail"
        width="600"
        height="300"
        style="width: 100%; height: auto; opacity: 0.5;"
      />
      <button
        class="pay-btn center-of-image"
        type="button"
        v-if="gatewayLoading"
        disabled
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
      <button
        @click="payToWatch"
        class="center-of-image pay-btn btn-success"
        v-else
      >
        Pay
        {{
          price % 1 == 0 ? `&#8377; ${price}` : `&#8377; ${price.toFixed(2)}`
        }}
        to watch
      </button>
    </div>
    <div class="" v-else>
      <!-- <video
        :src="videoURL"
        :poster="thumbnail"
        controls
        playsinline
        alt="Thumbnail"
        width="600"
        height="300"
        style="width: 100%; height: auto;"
      /> -->
      <!-- <VideoPlayer
        :source="
          videourl[0] == '/'
            ? `http://192.168.29.145:3001${videourl}`
            : videourl
        "
      /> -->
      <VideoPlayer :source="videourl" />
    </div>
    <div class="p-1">
      <!-- <h5 class="mb-0 text-truncate">
        {{ videotitle }}
      </h5> -->
      <div class="d-flex">
        <div class="align-self-center" style="width: 60px; height: 60px">
          <img
            class="rounded-circle"
            :src="userinfo.useravatar"
            style="width: 100%;"
            alt="DP"
          />
        </div>
        <div
          class=" p-2 align-self-center text-truncate"
          style="width: calc(100% - 60px);"
        >
          <h5 class="text-truncate">{{ videotitle }}</h5>
          <b class="text-secondary">{{ userinfo.username }}</b>
        </div>
      </div>
    </div>

    <!-- <div class="border p-1">
      <div class="d-flex">
        <div class="" style="width: 60px; height: 60px">
          <img
            class="rounded-circle"
            :src="useravatar"
            style="width: 100%;"
            alt="DP"
          />
        </div>
        <div class=" p-2 flex-fill align-self-center text-truncate">
          <b class="">{{ username }}</b
          ><br /><small
            >{{ followers }}
            {{ followers == 1 ? 'Follower' : 'Followers' }}</small
          >
        </div>
        <div class="align-self-center p-1">
          <button v-if="following" class="btn btn-secondary">Following</button>
          <button v-else class="btn btn-primary">Follow</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import VideoPlayer from '@/components/VideoPlayer'
//import Razorpay from 'razorpay'

export default {
  props: {
    id: String,
    paymentstatus: Boolean,
    thumbnail: String,
    videotitle: String,
    userinfo: Object,
    //username: String,
    //useravatar: String,
    videourl: String,
    price: Number,
  },
  components: {
    VideoPlayer,
  },
  data() {
    return {
      paymentError: '',
      gatewayLoading: false,
    }
  },
  methods: {
    payToWatch() {
      if (this.authToken) {
        this.gatewayLoading = true
        this.paymentError = ''

        axios
          .get(`/payments/startpayment/${this.id}`, {
            headers: { Authorization: `Bearer ${this.authToken}` },
          })
          .then((response) => {
            this.gatewayLoading = false
            const options = {
              key: 'rzp_live_xVQkAQriW8RNlM',
              name: this.videotitle,
              description: this.username,
              image: this.thumbnail,
              order_id: response.data.order_id,
              prefill: {
                email: this.$store.state.userInfo.email || '',
              },
              theme: {
                color: 'white',
              },
              external: {
                wallets: ['paytm'],
              },
              handler: (resp) => {
                this.paymentHandler(resp)
              },
            }
            var rzp = new window.Razorpay(options)
            rzp.on('payment.failed', (res) => {
              this.paymentError = res.error.description
            })
            rzp.open()
          })
          .catch((err) => {
            this.gatewayLoading = false
            if (err.response) {
              this.paymentError = 'Payment Failed! Try Again'
            } else {
              this.paymentError = 'Network Error'
            }
          })
      } else this.$emit('signinfirst')
    },
    paymentHandler(resp) {
      this.gatewayLoading = true
      this.paymentError = ''
      axios
        .post('/payments/confirm', resp, {
          headers: { Authorization: `Bearer ${this.authToken}` },
        })
        .then(() => {
          this.$emit('reloadwatch')
        })
        .catch((err) => {
          this.gatewayLoading = false
          if (err.response) {
            this.paymentError = 'Payment Failed! Try Again'
          } else {
            this.paymentError = 'Network Error'
          }
        })
    },
  },
  computed: {
    authToken() {
      return this.$store.state.token
    },
  },
}
</script>

<style></style>
