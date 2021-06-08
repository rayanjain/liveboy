<template>
  <div class="card mb-3 border-success">
    <div class="card-header bg-body border-success">
      <strong>
        {{ videotitle }}
      </strong>
    </div>
    <div class="card-body">
      <div class="text-danger mb-2">
        {{ errMessage }}
      </div>
      <div class="d-flex">
        <div class="col-4 align-self-center">
          <img
            :src="thumbnail"
            width="160"
            height="90"
            class="w-100"
            style="height: auto"
          />
        </div>
        <div class="col-8 ps-3 align-self-stretch" align="right">
          <small>
            Price:
            {{
              price % 1 == 0
                ? `&#8377; ${price}`
                : `&#8377; ${price.toFixed(2)}`
            }}<br />
            Views: {{ views }}<br />
            <strong
              >Total:
              {{
                total % 1 == 0
                  ? `&#8377; ${total}`
                  : `&#8377; ${total.toFixed(2)}`
              }}</strong
            ><br />
            (10%) -
            {{
              commission % 1 == 0
                ? `&#8377; ${commission}`
                : `&#8377; ${commission.toFixed(2)}`
            }} </small
          ><br />
          <strong class="text-success"
            >Earned:
            {{
              earned % 1 == 0
                ? `&#8377; ${earned}`
                : `&#8377; ${earned.toFixed(2)}`
            }} </strong
          ><br />
        </div>
      </div>
      <div class="d-grid mt-2">
        <button v-if="loading" class="btn btn-success" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
        <button v-else class="btn btn-success" @click="getPaid">
          Get Paid
        </button>
      </div>
    </div>
    <div class="card-footer bg-body text-muted text-center border-success">
      {{ timeBefore }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  props: {
    _id: String,
    videotitle: String,
    thumbnail: String,
    price: Number,
    views: Number,
    starttime: String, //new Date(year, month, day, hours, minutes, seconds, milliseconds)
  },
  data() {
    return {
      errMessage: '',
      loading: false,
    }
  },
  methods: {
    getPaid() {
      this.loading = true
      axios
        .get(`payments/getpaid/${this._id}`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          this.loading = false
          this.$emit('reloadStreams')
        })
        .catch((err) => {
          this.loading = false
          if (err.response) {
            if (err.response.status == 401) {
              localStorage.removeItem('token')
              this.$store.commit('changeToken', '')
              this.$router.push('/')
            }
            this.errMessage = err.response.data.message
              ? err.response.data.message
              : 'Network Error'
          } else {
            this.errMessage = 'Network Error'
          }
        })
    },
  },
  computed: {
    timeBefore() {
      return dayjs(this.starttime).fromNow()
    },
    viewCount() {
      if (this.views < 1000) return `${parseInt(this.views)}`
      else if (this.views < 1000000) return `${parseInt(this.views / 1000)}K`
      else if (this.views < 1000000000)
        return `${parseInt(this.views / 1000000)}M`
      else return `${parseInt(this.views / 1000000000)}B`
    },
    earned() {
      return this.price * this.views * 0.9
    },
    commission() {
      return this.price * this.views * 0.1
    },
    total() {
      return this.price * this.views
    },
  },
}
</script>

<style></style>
