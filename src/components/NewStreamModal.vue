<template>
  <div
    class="modal fade"
    id="newlivemodal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Stream</h5>
          <button
            ref="closeModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div v-if="newStreamError != ''" class="">
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {{ newStreamError }}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div class="">
              <form @submit.prevent="" ref="imageInput">
                <input
                  type="file"
                  accept="image/*"
                  style="display: none;"
                  ref="imageUpload"
                  @change="processImage"
                />
              </form>
              <div class="w-100">
                <div style="width: 100%;" ref="cropBox"></div>
              </div>
              <div v-if="cropTime" class="text-center">
                <button class="btn btn-secondary" @click="cancelCrop">
                  Cancel
                </button>
                <button class="btn btn-success ms-2" @click="crop">
                  Crop
                </button>
              </div>
              <div
                v-if="!cropTime && image != null"
                @click="$refs['imageUpload'].click()"
              >
                <img
                  :src="imageURL"
                  class="w-100 mb-2 border"
                  style="cursor: pointer;"
                />
              </div>
              <div
                v-if="!cropTime && image == null"
                class="border ratio ratio-16x9"
              >
                <div
                  class=""
                  @click="$refs['imageUpload'].click()"
                  style="display: grid; justify-content: center; align-content: center; text-align: center; cursor: pointer;"
                >
                  <div class="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      class="bi bi-upload"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                      />
                    </svg>
                  </div>
                  <div class="mt-1">
                    Upload Thumbnail
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-2">
              <form @submit.prevent="goLive">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input
                    type="text"
                    v-model="title"
                    class="form-control"
                    id="title"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1"
                      >&#8377;</span
                    >
                    <input
                      type="number"
                      step="0.01"
                      v-model="price"
                      class="form-control"
                      id="price"
                      required
                    />
                  </div>
                  <div id="emailHelp" class="form-text">
                    ex. 20, 1.50
                  </div>
                </div>
                <button
                  v-if="loading"
                  class="btn btn-danger"
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
                <button v-else type="submit" class="btn btn-danger">
                  Go Live
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Croppie from 'croppie'
import 'croppie/croppie.css'
import axios from 'axios'

export default {
  data() {
    return {
      cropper: null,
      newStreamError: '',
      cropTime: false,
      image: null,
      imageURL: null,
      title: '',
      price: null,
      loading: false,
    }
  },
  methods: {
    goLive() {
      this.loading = true
      this.newStreamError = ''
      if (this.image == null) {
        this.loading = false
        this.newStreamError = 'Upload Thumbnail'
      } else {
        const fd = new FormData()
        fd.append('title', this.title)
        fd.append('price', this.price)
        fd.append('image', this.image)
        axios
          .post('/streams', fd, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          })
          .then(() => {
            this.loading = false
            this.$refs['closeModal'].click()
            this.image = null
            this.imageURL = null
            this.title = ''
            this.price = null
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
              this.newStreamError = err.response.data.message
                ? err.response.data.message
                : 'Network Error'
            } else {
              this.newStreamError = 'Network Error'
            }
          })
      }
    },
    processImage(e) {
      this.cropper = new Croppie(this.$refs['cropBox'], {
        enableExif: true,
        viewport: { width: 240, height: 135 },
        boundary: { width: 320, height: 240 },
        showZoomer: true,
        enableOrientation: true,
      })
      this.cropTime = true
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
    },
    crop() {
      this.cropper
        .result({
          type: 'blob',
          size: { width: 800, height: 450 },
          format: 'png',
        })
        .then((blob) => {
          this.cropTime = false
          this.image = blob
          this.imageURL = URL.createObjectURL(blob)
          this.cropper.destroy()
        })
    },
    cancelCrop() {
      this.cropTime = false
      this.cropper.destroy()
    },
  },
}
</script>

<style></style>
