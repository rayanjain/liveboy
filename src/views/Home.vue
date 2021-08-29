<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex flex-md-row flex-column justify-content-center">
      <div class="col-md-6 align-self-center pe-2">
        <h1>Go Live. Get Paid.</h1>
        Monazite your content without ads or sponsors. Get paid without a middle
        man.<br />
        <button class="btn btn-danger btn-lg mt-3 mb-3" @click="goLive">
          Go Live
        </button>
      </div>
      <div class="col-md-4">
        <div
          id="carouselExampleSlidesOnly"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/alisha.png" class="d-block w-100 border" />
            </div>
            <div class="carousel-item">
              <img src="../assets/auzi.png" class="d-block w-100 border" />
            </div>
            <div class="carousel-item">
              <img src="../assets/standy.png" class="d-block w-100 border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="border-top mb-3" v-if="videoLoading || videoList.length > 0">
    <div class="mt-3 ms-3">
      <h5>Live Now</h5>
    </div>
    <div
      class="d-flex"
      style="overflow: auto; white-space: nowrap;"
      v-if="videoLoading"
    >
      <div class="p-2 col-11 col-md-5 col-lg-3">
        <VideoCardLoading />
      </div>
      <div class="p-2 col-11 col-md-5 col-lg-3">
        <VideoCardLoading />
      </div>
      <div class="p-2 col-11 col-md-5 col-lg-3">
        <VideoCardLoading />
      </div>
      <div class="p-2 col-11 col-md-5 col-lg-3">
        <VideoCardLoading />
      </div>
    </div>
    <div class="d-flex" style="overflow: auto; white-space: nowrap;" v-else>
      <div
        class="p-2 col-11 col-md-5 col-lg-3"
        v-for="video in videoList"
        :key="video._id"
      >
        <VideoCard
          style="cursor: pointer;"
          @click="$router.push({ name: 'Watch', params: { id: video._id } })"
          v-bind="video"
        />
      </div>
    </div>
  </div>
  <div class=" pt-5 pb-5" style="background-color: #ffe6e6;">
    <div class="d-flex flex-md-row flex-column justify-content-start">
      <div class="col-md-6 col-10">
        <img src="../assets/screen.png" class="w-100" />
      </div>
      <div class="col-md-6 align-self-center p-5">
        <h2>Interact with your followers</h2>
        Live messages to interact with your viewers during the live stream.
        <br />
      </div>
    </div>
  </div>
  <div class="container pt-5 pb-5" style="align-content: center;">
    <center>
      <div class="col-md-3 col-6">
        <div class="d-flex">
          <div class="col-6 p-2">
            <a href="https://streamlabs.com" target="_blank">
              <img
                src="../assets/streamlabs.png"
                class="w-100"
                style="border-radius: 20%;"
              />
            </a>
          </div>
          <div class="col-6 p-2">
            <a href="https://obsproject.com" target="_blank">
              <img
                src="../assets/obs.png"
                class="w-100"
                style="border-radius: 50%;"
              />
            </a>
          </div>
        </div>
      </div>
      <h2>
        Use your favourite streaming service to go live.
      </h2>
    </center>
  </div>
  <div class="pt-5 pb-5 bg-light">
    <div class="container text-secondary">
      <div class="row">
        <div class="col-md-4 mb-3">
          <a href="/about.html" target="_blank" class="link-secondary">
            About Us
          </a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/contact.html" target="_blank" class="link-secondary">
            Contact Us
          </a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/pricing.html" target="_blank" class="link-secondary">
            Pricing
          </a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/privacy.html" target="_blank" class="link-secondary">
            Privacy Policy
          </a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/terms.html" target="_blank" class="link-secondary">
            Terms & Conditions
          </a>
        </div>
        <div class="col-md-4 mb-3">
          <a href="/refund.html" target="_blank" class="link-secondary">
            Cancellation/Refund Ploicy
          </a>
        </div>
        <div class="mb-3 mt-3">
          <img src="../assets/vaido.png" height="45" style="opacity: 0.5;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '@/components/VideoCard'
import VideoCardLoading from '@/components/VideoCardLoading'
import axios from 'axios'

export default {
  components: {
    VideoCard,
    VideoCardLoading,
  },

  data() {
    return {
      videoList: [],
      videoLoading: false,
    }
  },
  mounted() {
    this.loadVideos()
  },
  methods: {
    goLive() {
      if (this.$store.state.token) {
        this.$emit('golive')
      } else {
        this.$emit('signinfirst')
      }
    },
    loadVideos() {
      this.videoLoading = true
      axios
        .get('/')
        .then((response) => {
          this.videoList = response.data
          this.videoLoading = false
        })
        .catch(() => (this.videoLoading = false))
    },
  },
}

// // @ is an alias to /src
// import axios from 'axios'
// import VideoCard from '@/components/VideoCard'
// import VideoCardLoading from '@/components/VideoCardLoading'

// export default {
//   name: 'Home',
//   components: {
//     //NavBar,
//     VideoCard,
//     VideoCardLoading,
//   },
//   data() {
//     return {
//       loadingStatus: false,
//       videoList: null,
//       networkError: false,
//     }
//   },
//   mounted() {
//     this.loadVideos()
//   },
//   methods: {
//     goLive() {
//       if (this.$store.state.token) {
//         this.$emit('golive')
//       } else {
//         this.$emit('signinfirst')
//       }
//     },
//     loadVideos() {
//       this.loadingStatus = true
//       this.networkError = false
//       axios
//         .get('/')
//         .then((response) => {
//           this.loadingStatus = false
//           this.videoList = response.data
//         })
//         .catch(() => {
//           this.loadingStatus = false
//           this.networkError = true
//         })
//     },
//   },
// }
</script>
<style scoped>
a {
  text-decoration: none;
}
/* .videobox {
  width: 90vw;
}
@media screen and (min-width: 480px) {
  .videobox {
    width: 45%;
  }
}
@media screen and (min-width: 768px) {
  .videobox {
    width: 30%;
  }
}
@media screen and (min-width: 1024px) {
  .videobox {
    width: 23%;
  }
} */
</style>
