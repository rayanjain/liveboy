<template>
  <!-- <navBar /> -->
  <div class="container pt-md-5 pt-3 pb-md-5">
    <div class="row">
      <div class="col-md-8 mb-3">
        <div class="d-flex flex-row justify-content-between pb-1">
          <div class="align-self-center">
            <h5>Available Streams</h5>
          </div>
          <div class="pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-clockwise me-2"
              viewBox="0 0 16 16"
              @click="loadStreams"
              style="cursor: pointer;"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
              />
            </svg>
            <button
              class="btn btn-outline-danger"
              data-bs-toggle="modal"
              data-bs-target="#newlivemodal"
              ref="openlivemodal"
            >
              Add New +
            </button>
          </div>
        </div>
        <div v-if="streamsLoading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else-if="loadingError" class="card">
          <div class="card-body text-center">
            Network Error<br />
            <button
              class="btn btn-outline-secondary m-3"
              @click="loadStreams()"
            >
              Retry
            </button>
          </div>
        </div>
        <div
          v-else-if="streams.length == 0"
          class="text-center p-3 text-muted"
          style="background: #f2f2f2; cursor: pointer"
          @click="$refs['openlivemodal'].click()"
        >
          <h4>+ Add a Stream</h4>
        </div>
        <div v-else>
          <!-- <CompletedStream />
          <AvailableStream
            @reloadStreams="loadStreams()"
            v-for="stream in streams"
            v-bind="stream"
            :key="stream._id"
          /> -->
          <div v-for="stream in streams" :key="stream._id">
            <CompletedStream
              v-if="!stream.active"
              @reloadStreams="loadStreams()"
              v-bind="stream"
            />
            <AvailableStream
              v-else
              @reloadStreams="loadStreams()"
              v-bind="stream"
            />
          </div>
        </div>
      </div>
      <div class="col-md-4 pb-5">
        <div class="card" style="">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="d-flex flex-row">
                <div class="w-25">
                  <a href="http://streamlabs.com" target="_blank">
                    <img
                      src="../assets/streamlabs.png"
                      class="w-100"
                      style="border-radius: 20%;"
                    />
                  </a>
                </div>
                <div class="w-75 ps-2 align-self-center">
                  Download <strong>streamlabs</strong> to stream on
                  <a
                    href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1294578643&mt=8"
                    target="_blank"
                    >ios<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      /></svg
                  ></a>
                  or
                  <a
                    href="https://play.google.com/store/apps/details?id=com.streamlabs"
                    target="_blank"
                    >android<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      /></svg
                  ></a>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex flex-row">
                <div class="w-25">
                  <a href="http://obsproject.com" target="_blank">
                    <img src="../assets/obs.png" class="w-100" />
                  </a>
                </div>
                <div class="w-75 ps-2 align-self-center">
                  Download <strong>OBS Studio</strong> to stream on
                  <a href="http://obsproject.com" target="_blank"
                    >Windows<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      /></svg
                  ></a>
                  or
                  <a href="http://obsproject.com" target="_blank"
                    >MacOS<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
                      /></svg
                  ></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <NewStreamModal @reloadStreams="loadStreams()" />
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar'
import AvailableStream from '@/components/AvailableStream'
import NewStreamModal from '@/components/NewStreamModal'
import CompletedStream from '@/components/CompletedStream'

import axios from 'axios'

export default {
  components: {
    //NavBar,
    AvailableStream,
    NewStreamModal,
    CompletedStream,
  },
  data() {
    return {
      streams: [],
      streamsLoading: false,
      loadingError: false,
    }
  },
  mounted() {
    this.loadStreams()
  },
  methods: {
    loadStreams() {
      this.streamsLoading = true
      this.loadingError = false
      axios
        .get('/streams', {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((response) => {
          this.streamsLoading = false
          this.streams = response.data
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 401) {
              localStorage.removeItem('token')
              this.$store.commit('changeToken', '')
              this.$router.push('/')
            }
          }
          this.streamsLoading = false
          this.loadingError = true
        })
    },
  },
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
