<template>
  <!-- <NavBar ref="navbar" /> -->
  <div class="main-div">
    <div class="flex">
      <div class="col-md-8 p-md-3" v-if="videoLoading">
        <div class="ratio ratio-16x9" style="background:#f2f2f2;">
          <div
            style="display: grid; justify-content: center; align-content: center; color: grey;"
          >
            <h5>{{ videoError }}</h5>
          </div>
        </div>
        <div class="p-1">
          <!-- <h5 class="mb-0 text-truncate">
            <div
              style="background: #f2f2f2; min-height: 1.25em; line-height: 1.25; width: 50%"
            ></div>
          </h5> -->
          <div class="d-flex">
            <div
              style="width: 60px; height: 60px; background:#f2f2f2; border-radius: 50%"
            ></div>
            <div class=" p-2 flex-fill align-self-center text-truncate">
              <div
                class="mb-1"
                style="background: #f2f2f2; min-height: 1.25em; line-height: 1.25; width: 70%"
              ></div>
              <div
                style="background: #f2f2f2; min-height: 1.25em; line-height: 1.25; width: 40%"
              ></div>
            </div>
          </div>
        </div>
        <!-- <div class="border p-1">
          <div class="d-flex">
            <div
              style="width: 60px; height: 60px; background:#f2f2f2; border-radius: 50%"
            ></div>
            <div class=" p-2 flex-fill align-self-center text-truncate">
              <div
                class="mb-1"
                style="background: #f2f2f2; min-height: 1.25em; line-height: 1.25; width: 70%"
              ></div>
              <div
                style="background: #f2f2f2; min-height: 1.25em; line-height: 1.25; width: 40%"
              ></div>
            </div>
          </div>
        </div> -->
      </div>

      <VideoDetails
        @reloadwatch="loadVideo()"
        @signinfirst="this.$emit('signinfirst')"
        :id="id"
        v-bind="videoData"
        v-else
      />

      <div
        class="col-md-4 p-md-3"
        style="height: 100%; overflow: hidden;"
        v-if="!videoData.messageurl"
      >
        <div class="border h-100 d-flex flex-column justify-content-center">
          <div class="text-muted" style="text-align: center;">
            Live chat will appear here.
          </div>
        </div>
      </div>

      <MessageBox
        :id="id"
        :messageURL="
          `wss://liveboy.centralindia.cloudapp.azure.com${videoData.messageurl}`
        "
        v-else
      />
    </div>
  </div>
</template>

<script>
//import NavBar from '@/components/NavBar'
import VideoDetails from '@/components/VideoDetails'
import MessageBox from '@/components/MessageBox'
import axios from 'axios'

export default {
  props: ['id'],
  components: {
    //NavBar,
    VideoDetails,
    MessageBox,
  },
  data() {
    return {
      messageLoading: true,
      videoLoading: true,
      videoData: '',
      videoError: '',
    }
  },
  mounted() {
    this.loadVideo()
  },
  methods: {
    loadVideo() {
      this.messageLoading = true
      this.videoLoading = true
      axios
        .get(`/watch/${this.id}`, {
          headers: { Authorization: `Bearer ${this.authToken}` },
        })
        .then((response) => {
          this.videoData = response.data
          this.messageLoading = false
          this.videoLoading = false
        })
        .catch((err) => {
          if (err.response) {
            this.videoError = '404 Video Not Found'
          } else {
            this.videoError = 'Network Error'
          }
          if (err.response) {
            if (err.response.status == 404) {
              this.videoError = '404 Video Not Found'
            } else {
              this.videoError = 'Network Error'
            }
          } else {
            this.videoError = 'Network Error'
          }
        })
    },
  },
  computed: {
    authToken() {
      return this.$store.state.token
    },
  },
  watch: {
    authToken() {
      this.loadVideo()
    },
  },
}
</script>

<style>
.main-div {
  position: absolute;
  top: 55px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
}
.flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.message-box {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.center-of-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.pay-btn {
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}
.pay-alert {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

@media (min-width: 768px) {
  .flex {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
}
</style>
