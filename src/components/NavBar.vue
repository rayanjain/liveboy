<template>
  <nav
    class="navbar sticky-top navbar-light border border-top-0 border-right-0 border-left-0"
    style="background-color: #fff;"
  >
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">LiveBoy</router-link>
      <form @submit.prevent="" v-if="signInStatus" class="d-flex">
        <button
          type="button"
          class="btn btn-sm btn-danger"
          style="margin-right: 10px"
          @click="$router.push({ path: '/golive' })"
        >
          Go Live
        </button>
        <div class="dropdown">
          <a
            class=""
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              v-if="this.$store.state.userInfo.useravatar"
              class="rounded-circle"
              :src="this.$store.state.userInfo.useravatar"
              width="30"
              height="30"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-person-circle text-secondary"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <div
                v-if="dropdownLoading == 0"
                class="dropdown-item text-center"
                href="#"
              >
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div
                v-else-if="dropdownLoading == -1"
                class="dropdown-item text-center"
                href="#"
              >
                <button class="btn btn-secondary" @click="getUserInfo">
                  Try Again
                </button>
              </div>
              <div v-else class="dropdown-item text-center" href="#">
                <img
                  :src="this.$store.state.userInfo.useravatar"
                  alt="DP"
                  class="rounded-circle mb-2"
                  width="100"
                  height="100"
                  style="width:60px; height: auto"
                /><br />
                <b>{{ this.$store.state.userInfo.username }}</b
                ><br />
                {{ this.$store.state.userInfo.email }}
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link
                active-class="active"
                to="/payments"
                class="dropdown-item"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-credit-card-2-back"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"
                  />
                </svg>
                Payments
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <router-link
                active-class="active"
                to="/settings"
                class="dropdown-item"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                  />
                </svg>
                Account Settings
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a style="cursor: pointer;" @click="logout" class="dropdown-item">
                <div
                  v-if="logoutLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </form>
      <form v-else class="d-flex">
        <button
          class="btn btn-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref="signInButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          Sign In
        </button>
      </form>
    </div>
  </nav>
  <SignModal />
</template>

<script>
import SignModal from '@/components/SignModal'
import axios from 'axios'
export default {
  components: {
    SignModal,
  },
  data() {
    return {
      dropdownLoading: 1, //-1: Error, 0: Loading, 1: Succesfull
      logoutLoading: false,
    }
  },
  watch: {
    tokenChange() {
      this.getUserInfo()
    },
  },
  methods: {
    launchSignInModal() {
      this.$refs['signInButton'].click()
    },
    getUserInfo() {
      this.dropdownLoading = 0
      axios
        .get('/getinfo', {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((response) => {
          this.$store.commit('getInfo', response.data)
          this.dropdownLoading = 1
        })
        .catch((err) => {
          if (err.response) {
            this.logout()
          } else {
            this.dropdownLoading = -1
          }
        })
    },
    logout() {
      this.logoutLoading = true
      axios
        .get('/logout', {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          localStorage.removeItem('token')
          this.$store.commit('changeToken', '')
          this.logoutLoading = false
          if (this.$route.name == 'GoLive' || this.$route.name == 'Settings')
            this.$router.push('/')
        })
        .catch(() => {
          this.logoutLoading = false
          if (this.$route.name == 'GoLive' || this.$route.name == 'Settings')
            this.$router.push('/')
        })
    },
  },
  mounted() {
    if (this.$store.state.userInfo == '' && this.$store.state.token != '') {
      this.getUserInfo()
    }
  },
  computed: {
    signInStatus() {
      if (this.$store.state.token != '') return true
      else return false
    },
    tokenChange() {
      return this.$store.state.token
    },
  },
}
</script>

<style></style>
