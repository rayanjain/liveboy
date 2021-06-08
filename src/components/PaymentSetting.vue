<template>
  <div class="card mb-3">
    <div class="card-header bg-body">
      Accept Payments
    </div>
    <div class="card-body">
      <form @submit.prevent="saveChanges">
        <div class="row">
          <div class="text-danger">
            {{ errMessage }}
          </div>
          <div v-if="dataAvailable" class="d-flex justify-content-end">
            <button
              v-if="disabled"
              type="button"
              class="btn btn-outline-success"
              @click="disabled = false"
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
              Edit
            </button>
            <button
              v-else
              type="button"
              class="btn btn-outline-success"
              @click="disabled = true"
            >
              Cancel
            </button>
          </div>
          <div class="col-md-4">
            <div class="mb-2">
              <label for="cname" class="form-label">Name</label>
              <input
                v-model="name"
                type="text"
                class="form-control"
                id="cname"
                required
                :disabled="disabled"
              />
            </div>
            <div class="mb-2">
              <label for="pemail" class="form-label">email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="pemail"
                required
                :disabled="disabled"
              />
            </div>
            <div class="mb-2">
              <label for="pnumber" class="form-label">Phone No</label>
              <input
                v-model="contact"
                type="tel"
                class="form-control"
                id="pnumber"
                required
                :disabled="disabled"
              />
            </div>
          </div>
          <div class="col-md-8">
            <div class="d-flex mb-3 mt-3 mt-md-0">
              <div class="form-check pe-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="account_type"
                  value="bank_account"
                  id="ba"
                  v-model="account_type"
                  required
                  :disabled="disabled"
                />
                <label class="form-check-label" for="ba">Bank Account</label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="account_type"
                  value="vpa"
                  id="vpa"
                  v-model="account_type"
                  required
                  :disabled="disabled"
                />
                <label class="form-check-label" for="vpa">UPI</label>
              </div>
            </div>
            <div v-if="account_type == 'bank_account'">
              <div class="mb-2">
                <label for="pname" class="form-label">Beneficiary's Name</label>
                <input
                  v-model="bname"
                  type="text"
                  class="form-control"
                  id="pname"
                  required
                  :disabled="disabled"
                />
              </div>
              <div class="mb-2">
                <label for="pnumber" class="form-label">Account No</label>
                <input
                  v-model="account_number"
                  type="number"
                  class="form-control"
                  id="pnumber"
                  required
                  :disabled="disabled"
                />
              </div>
              <div class="mb-2">
                <label for="fifsc" class="form-label">IFSC Code</label>
                <input
                  v-model="ifsc"
                  type="text"
                  class="form-control"
                  id="fifsc"
                  required
                  :disabled="disabled"
                />
              </div>
            </div>
            <div v-else>
              <div class="mb-2">
                <label for="fvpa" class="form-label">UPI ID (VPA)</label>
                <input
                  v-model="vpa"
                  type="text"
                  class="form-control"
                  id="fvpa"
                  required
                  :disabled="disabled"
                />
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <button
                v-if="loading"
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
                type="submit"
                class="btn btn-primary"
                :disabled="disabled"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      account_type: 'bank_account',
      errMessage: '',
      disabled: false,
      dataAvailable: false,
      loading: false,
      name: '',
      email: '',
      contact: '',
      bname: '',
      ifsc: '',
      account_number: '',
      vpa: '',
    }
  },
  mounted() {
    this.disabled = true
    axios
      .get('/user/payinfo', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((res) => {
        if (res.data.contacts) {
          this.disabled = true
          this.dataAvailable = true
          this.name = res.data.contacts.name
          this.email = res.data.contacts.email
          this.contact = res.data.contacts.contact
          this.account_type = res.data.fund_accounts.account_type
          if (this.account_type == 'bank_account') {
            this.account_number =
              res.data.fund_accounts.bank_account.account_number
            this.bname = res.data.fund_accounts.bank_account.name
            this.ifsc = res.data.fund_accounts.bank_account.ifsc
          } else {
            this.vpa = res.data.fund_accounts.vpa.address
          }
        } else {
          this.disabled = false
          this.dataAvailable = false
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 401) {
            localStorage.removeItem('token')
            this.$store.commit('changeToken', '')
            this.$router.push('/')
          }
          this.errMessage = err.response.data.message
            ? err.response.data.message
            : 'Network Error'
        } else {
          this.errMessage = 'Network Error'
        }
      })
  },
  methods: {
    saveChanges() {
      this.loading = true
      // var fund_accounts = {}
      // if (this.account_type == 'bank_account') {
      //   fund_accounts = {
      //     name: this.bname,
      //     ifsc: this.ifsc,
      //     account_number: this.account_number,
      //   }
      // } else {
      //   fund_accounts = {
      //     address: this.vpa,
      //   }
      // }
      // const fd = {
      //   contacts: {
      //     name: this.name,
      //     email: this.email,
      //     contact: this.contact,
      //   },
      //   account_type: this.account_type,
      //   fund_accounts: fund_accounts,
      // }
      const contact_info = {
        name: this.name,
        email: this.email,
        contact: this.contact,
      }
      var fund_accounts_info = {}
      if (this.account_type == 'bank_account') {
        fund_accounts_info = {
          account_type: 'bank_account',
          bank_account: {
            name: this.bname,
            ifsc: this.ifsc,
            account_number: this.account_number,
          },
        }
      } else {
        fund_accounts_info = {
          account_type: 'vpa',
          vpa: {
            address: this.vpa,
          },
        }
      }
      axios
        .post(
          '/change/payinfo',
          { contacts: contact_info, fund_accounts: fund_accounts_info },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then(() => {
          this.loading = false
          this.dataAvailable = true
          this.disabled = true
        })
        .catch(() => {
          this.loading = false
          this.errMessage = 'Network Error'
        })
    },
  },
}
</script>

<style></style>
