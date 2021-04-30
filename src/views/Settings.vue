<template>
  <NavBar ref="navBar" />
  <div class="container mt-md-5 mt-3">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-body">
            Profile Picture
          </div>
          <div class="card-body">
            <div class="d-flex">
              <div class="">
                <img
                  :src="this.$store.state.userInfo.useravatar"
                  style="width: 100px; height: 100px;"
                  class="rounded-circle"
                />
              </div>
              <div class="align-self-center">
                <button
                  class="btn btn-outline-secondary ms-3"
                  @click="$refs['imageUpload'].click()"
                >
                  Change Profile Picture
                </button>
                <button
                  style="display: none"
                  data-bs-toggle="modal"
                  data-bs-target="#changepp"
                  ref="openpp"
                >
                  open pp model
                </button>
                <form @submit.prevent="" ref="imageInput">
                  <input
                    type="file"
                    accept="image/*"
                    style="display: none;"
                    ref="imageUpload"
                    @change="processImage"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Change Profile Picture -->
      <div
        class="modal fade"
        id="changepp"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Profile Picture
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="text-danger">{{ changeUsernameError }}</div>
              <div ref="cropBox"></div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref="closepp"
              >
                Cancel
              </button>
              <button
                v-if="changePPLoading"
                class="btn btn-primary"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
              <button
                v-else
                @click="crop"
                type="button"
                class="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-md-0 mt-3">
        <div class="card">
          <div class="card-header bg-body">
            Change username
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :value="this.$store.state.userInfo.username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  readonly
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  data-bs-toggle="modal"
                  data-bs-target="#changeusername"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Change Username  -->
      <div
        class="modal fade"
        id="changeusername"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change Username
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form @submit.prevent="changeUsername()">
              <div class="modal-body">
                <div class="mb-3">
                  <div class="text-danger">{{ changeUsernameError }}</div>
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newUsername"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref="closeCUModal"
                >
                  Cancel
                </button>
                <button
                  v-if="changeUsernameLoading"
                  class="btn btn-primary"
                  type="button"
                  disabled
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
                <button v-else type="submit" class="btn btn-primary">
                  Change
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import axios from 'axios'
import Croppie from 'croppie'
import 'croppie/croppie.css'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      changeUsernameError: '',
      newUsername: this.$store.state.userInfo.username,
      changeUsernameLoading: false,
      changePPError: '',
      changePPLoading: false,
      cropper: null,
      image: null,
    }
  },
  methods: {
    changeUsername() {
      this.changeUsernameLoading = true
      this.changeUsernameError = ''
      axios
        .post(
          '/change/username',
          { username: this.newUsername },
          {
            headers: { Authorization: `Bearer ${this.$store.state.token}` },
          }
        )
        .then(() => {
          this.$refs['navBar'].getUserInfo()
          this.$refs['closeCUModal'].click()
          this.changeUsernameLoading = false
        })
        .catch((err) => {
          this.changeUsernameLoading = false
          if (err.response) this.changeUsernameError = err.response.data
          else this.changeUsernameError = 'Network Error'
        })
    },
    processImage(e) {
      console.log(this.cropper)
      this.$refs['openpp'].click()
      setTimeout(() => {
        this.cropper = new Croppie(this.$refs['cropBox'], {
          enableExif: true,
          viewport: { width: 100, height: 100, type: 'circle' },
          boundary: { width: 200, height: 200 },
          showZoomer: true,
          enableOrientation: true,
        })
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return

        var reader = new FileReader()
        reader.onload = (e) => {
          this.cropper.bind({
            url: e.target.result,
          })
        }
        reader.readAsDataURL(files[0])
        this.$refs['imageInput'].reset()
      }, 500)
    },
    crop() {
      this.changePPLoading = true
      this.cropper
        .result({
          type: 'blob',
          format: 'png',
        })
        .then((blob) => {
          this.image = blob
          const fd = new FormData()
          fd.append('image', this.image)
          axios
            .post('/change/profilepicture', fd, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then(() => {
              this.changePPLoading = false
              this.$refs['navBar'].getUserInfo()
              this.$refs['closepp'].click()
              this.cropper.destroy()
            })
            .catch(() => {
              this.changeUsernameError = 'An error occured'
              this.changePPLoading = false
            })
        })
    },
    cancelCrop() {
      this.cropper.destroy()
    },
  },
}
</script>

<style></style>
