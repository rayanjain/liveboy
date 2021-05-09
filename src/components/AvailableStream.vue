<template>
  <div class="card mb-3">
    <div class="card-header bg-body">
      <strong>
        {{ videotitle }}
      </strong>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <div class="d-flex justify-content-between mb-2">
          <div class="align-self-center">
            Video Link
          </div>
          <div class="">
            <button
              class="btn btn-outline-secondary ms-2"
              @click="videoLinkCopy"
            >
              Copy
            </button>
          </div>
        </div>
        <a :href="`https://liveboy.netlify.app/watch/${_id}`" target="_blank">
          https://liveboy.netlify.app/watch/{{ _id }}
        </a>
      </div>
      <div class="d-flex">
        <div class="col-6 align-self-center">
          <img
            :src="thumbnail"
            width="160"
            height="90"
            class="w-100"
            style="height: auto"
          />
        </div>
        <div class="col-6 ps-3 align-self-center align-self-stretch">
          <div
            class="card h-100"
            style="display: grid; justify-content: center; align-content: center;"
          >
            <div>
              Price:
              {{
                price % 1 == 0
                  ? `&#8377; ${price}`
                  : `&#8377; ${price.toFixed(2)}`
              }}<br />Views: {{ viewCount }}<br />
              <strong class="text-success"
                >Earned:
                {{
                  earned % 1 == 0
                    ? `&#8377; ${earned}`
                    : `&#8377; ${earned.toFixed(2)}`
                }}</strong
              >
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2">
        <label class="pb-1">Server</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            :value="serverurl"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            readonly
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="servercopy"
            @click="serverCopy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
              />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
              />
            </svg>
          </button>
        </div>
        <label class="pb-1 pt-1">Stream Key</label>
        <div class="input-group">
          <input
            :type="streamKeyShow ? 'text' : 'password'"
            class="form-control"
            :value="streamkey"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            readonly
          />
          <button
            @click="streamKeyShow = !streamKeyShow"
            class="btn btn-outline-secondary"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
              v-if="!streamKeyShow"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
              v-else
            >
              <path
                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
              />
              <path
                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
              />
              <path
                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
              />
            </svg>
          </button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="servercopy"
            @click="streamKeyCopy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
              />
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
              />
            </svg>
          </button>
        </div>
        <div class="pt-3 d-grid">
          <button v-if="loading" class="btn btn-danger" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
          <button v-else @click="stopStream()" class="btn btn-danger">
            Stop Streaming
          </button>
        </div>
      </div>
    </div>
    <div class="card-footer bg-body text-muted text-center">
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
    earned: Number,
    serverurl: String,
    streamkey: String,
    starttime: String, //new Date(year, month, day, hours, minutes, seconds, milliseconds)
  },
  data() {
    return {
      streamKeyShow: false,
      loading: false,
    }
  },
  methods: {
    streamKeyCopy() {
      navigator.clipboard.writeText(this.streamkey).then(() => {})
    },
    serverCopy() {
      navigator.clipboard.writeText(this.serverurl).then(() => {})
    },
    videoLinkCopy() {
      navigator.clipboard
        .writeText(`https://liveboy.netlify.app/watch/${this._id}`)
        .then(() => {})
    },
    stopStream() {
      this.loading = true
      axios
        .delete(`/stream/${this._id}`, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          this.$emit('reloadStreams')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
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
  },
}
</script>

<style></style>
