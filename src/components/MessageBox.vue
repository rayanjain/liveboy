<template>
  <div class="col-md-4  p-md-3" style="height: 100%; overflow: hidden;">
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div
        class="border border-bottom-0 p-2"
        style="flex-shrink: 0; text-align: right;"
      >
        <small>{{ viewerCount }} Viewers</small>
      </div>
      <div class="message-box border">
        <div
          class=""
          ref="messageArea"
          v-on:scroll="onScrollE"
          style="height: 100%; overflow-y: scroll;"
        >
          <div v-for="(m, i) in messages" :key="i" class="p-2 border-bottom">
            <b class="text-secondary"
              >{{ m.username }}{{ m.message ? ':' : ' joined' }}</b
            >
            {{ m.message }}
          </div>
          <div
            v-if="showDown"
            class="p-3"
            @click="goToBottom"
            style="position: absolute; bottom: 0px; width: 100%; color: white; background-color: #ccc; text-align: center; cursor: pointer; opacity: 0.8;"
          >
            <b
              >New Messages Arrived
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-caret-down-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"
                />
                <path
                  d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"
                /></svg
            ></b>
          </div>
        </div>
      </div>
      <div class="border border-top-0 p-1" style="flex-shrink: 0;">
        <form @submit.prevent="sendMessage">
          <div class="input-group">
            <input
              type="text"
              v-model="message"
              class="form-control"
              placeholder="Send Message"
              aria-label="Send Message"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-return-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'messageURL'],
  data() {
    return {
      message: '',
      viewers: 0,
      messages: [],
      showDown: false,
      webSocket: new WebSocket(this.messageURL),
    }
  },
  mounted() {
    this.getMessages()
  },
  methods: {
    getMessages() {
      {
        this.webSocket.onopen = () => {
          this.webSocket.send(
            JSON.stringify({ token: this.$store.state.token, id: 'this.id' })
          )
        }

        this.webSocket.onmessage = (event) => {
          if (
            this.$refs['messageArea'].scrollTop +
              this.$refs['messageArea'].clientHeight !=
            this.$refs['messageArea'].scrollHeight
          )
            this.showDown = true
          else {
            setTimeout(() => {
              this.$refs['messageArea'].scrollTop = this.$refs[
                'messageArea'
              ].scrollHeight
            }, 500)
          }

          const m = JSON.parse(event.data)
          if (m.viewers) this.viewers = m.viewers
          else if (!m.message) {
            this.viewers = this.viewers + 1
            this.messages.push(m)
          } else this.messages.push(m)
        }

        this.webSocket.onclose = () => {
          this.getMessages()
        }
      }
    },
    sendMessage() {
      this.webSocket.send(JSON.stringify({ message: this.message }))
      this.message = ''
    },
    goToBottom() {
      this.$refs['messageArea'].scrollTop = this.$refs[
        'messageArea'
      ].scrollHeight
      this.showDown = false
    },
    onScrollE() {
      if (
        this.$refs['messageArea'].scrollTop +
          this.$refs['messageArea'].clientHeight ==
        this.$refs['messageArea'].scrollHeight
      )
        this.showDown = false
    },
  },
  computed: {
    viewerCount() {
      return this.viewers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style></style>
