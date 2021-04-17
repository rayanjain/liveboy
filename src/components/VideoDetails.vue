<template>
  <div class="col-md-8 p-md-3">
    <div v-if="!paymentstatus" style="position: relative;">
      <img
        :src="thumbnail"
        alt="Thumbnail"
        width="600"
        height="300"
        style="width: 100%; height: auto; opacity: 0.5;"
      />
      <button @click="$emit('signinfirst')" class="pay-btn btn-success">
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
      <VideoPlayer :source="videoURL" />
    </div>
    <div class="p-2">
      <h5 class="mb-0 text-truncate">
        {{ videotitle }}
      </h5>
    </div>

    <div class="border p-1">
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
    </div>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer'

export default {
  props: {
    paymentstatus: Boolean,
    thumbnail: String,
    videotitle: String,
    username: String,
    useravatar: String,
    videoURL: String,
    price: Number,
    followers: Number,
    following: Boolean,
  },
  components: {
    VideoPlayer,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
