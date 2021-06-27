<template>
  <div class="card mt-2">
    <img
      :src="thumbnail"
      class="card-img-top"
      alt="Thumbnail"
      width="600"
      height="300"
      style="height: auto"
    />
    <div class="card-img-overlay p-2">
      <h6>
        <span class="badge rounded-pill bg-primary">{{
          price == 0
            ? 'FREE'
            : price % 1 == 0
            ? `&#8377; ${price}`
            : `&#8377; ${price.toFixed(2)}`
        }}</span>
      </h6>
    </div>
    <div class="card-body pt-1 pb-1">
      <div class="row">
        <div class="p-0" style="width: 40px">
          <img
            :src="userinfo.useravatar"
            alt="DP"
            class="rounded-circle"
            width="100"
            height="100"
            style="width:100%; height: auto"
          />
        </div>
        <div class="" style="width: calc(100% - 40px);">
          <div class="text-truncate">
            <b class="">
              {{ videotitle }}
            </b>
          </div>
          <div class="text-truncate font-weight-light">
            {{ userinfo.username }}
          </div>
          <div class="d-flex flex-wrap">
            <div style="">
              <small> {{ viewCount }} views .</small>
            </div>
            <div style="">
              <small>started {{ timeBefore }} </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  props: {
    _id: String,
    thumbnail: String,
    videotitle: String,
    // username: String,
    // useravatar: String,
    userinfo: Object,
    views: Number,
    starttime: String,
    price: Number,
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
