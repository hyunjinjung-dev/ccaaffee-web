<template>
  <v-dialog v-model="dialog" persistent max-width="350" transition="scroll-x-transition">
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>

      <v-card-text>
        <div class="mb-5">
          <small>Tip. 수정하려면 아래 주소 칸을 터치(클릭)해주세요</small>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.address"
            :rules="addressRules"
            label="주소"
            readonly
            outlined
            required
            @click="openAddressDialog"
          ></v-text-field>
        </v-form>
        <v-dialog max-height="500px" max-width="500px" v-model="addressDialogToggle">
          <v-card>
            <vue-daum-postcode
              style="height: 500px; overflow: scroll;"
              @complete="addressSelected($event.roadAddress)"
            />
          </v-card>
        </v-dialog>
      </v-card-text>

      <v-card-actions class="mt-5">
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked" :disabled="!valid">수정</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueDaumPostcode } from "vue-daum-postcode"
import axios from "axios"

export default {
  props: ["title", "store", "dialog"],
  components: {
    VueDaumPostcode,
  },
  data() {
    return {
      addressDialogToggle: false,
      addressRules: [
        (v) => !!v || "주소를 입력해주세요",
        (v) => v != this.store.address || "기존 주소와 같아요",
      ],
      form: {
        address: "",
      },
      valid: true,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      if (this.store.address) {
        this.form.address = this.store.address
      }
    },
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    openAddressDialog() {
      this.addressDialogToggle = true
    },
    addressSelected(selectedAddress) {
      this.form.address = selectedAddress
      this.addressDialogToggle = false
    },
    async getLatLng() {
      // To Do
      // JavaSciprt Key : e9b8744f142d87e82a9a840a32aa395b
      // REST API Key : 8aec30f44a150144c4bcac2194e4d9f7

      let restAPIKey = "8aec30f44a150144c4bcac2194e4d9f7" // REST API key
      let queryString = this.form.address

      let URL = "https://dapi.kakao.com/v2/local/search/address.json?query=" + queryString
      axios.defaults.withCredentials = false
      axios.defaults.headers.common["Authorization"] = "KakaoAK " + restAPIKey
      axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
      await axios
        .get(URL)
        .then((res) => {
          this.form.lat = res.data.documents[0].y
          this.form.lng = res.data.documents[0].x
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async updateBtnClicked() {
      await this.$refs.form.validate()
      await this.getLatLng()

      if (this.valid && this.form.lat && this.form.lng) {
        this.update()
      } else {
        this.$toast.error("입력한 내용을 확인해주세요")
      }
    },
    async update() {
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
      try {
        await ref
          .collection("cafe")
          .doc(this.store.storeId)
          .update(this.form)
      } finally {
        this.closeBtnClicked()
      }
    },
  },
}
</script>

<style></style>
