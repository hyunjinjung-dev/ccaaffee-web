<template>
  <v-dialog
    v-model="dialog"
    persistent
    :fullscreen="breakPointXs ? true : false"
    max-width="500"
    transition="scroll-x-transition"
  >
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 추가</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="inputFile"
          accept="image/*"
          label="사진 선택"
          prepend-icon="mdi-camera"
          show-size
          :loading="resizeLoading"
          @change="resize"
        />

        <!-- resizing이 완료되면, 원본 이미지를 미리보기로 제공 -->
        <v-img :src="originalImg" style="border: 1px solid red;" />
        <v-img :src="originalImg" v-if="resizedImg" />

        <!-- 내가 올린 이미지 삭제 버튼 추가 버튼 업로드 용량 제한 유저 기록 등등 -->
      </v-card-text>

      <v-card-actions class="mt-5">
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked">업로드</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["title", "store", "dialog"],
  data() {
    return {
      inputFile: null,
      originalImg: null,
      resizedImg: null,
      uploadFile: null,

      resizeLoading: false,
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
    fireUser() {
      return this.$store.state.fireUser
    },
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    getFile(file) {
      return new Promise((resolve, reject) => {
        let contents = ""
        const reader = new FileReader()
        reader.onloadend = function(e) {
          contents = e.target.result
          resolve(contents)
        }
        reader.onerror = function(e) {
          reject(e)
        }
        reader.readAsDataURL(file)
      })
    },

    // 출처 : https://stackoverflow.com/questions/53708278/how-to-resize-the-image-in-vue
    async resize(file) {
      // init Data
      this.originalImg = null
      this.resizedImg = null
      this.uploadFile = null
      if (!file) {
        return
      }
      this.resizeLoading = true // 로딩 on

      // START: preview original
      let result = await this.getFile(file)
      this.originalImg = result
      // END: preview original

      // Check File Size : 1MB이하이면 resize를 하지 않음
      const size = file.size
      let base_size = 1024000 //1MB (썸네일 작업 유무 기준 사이즈)
      if (size <= base_size) {
        this.resizedImg = this.originalImg
        this.uploadFile = file
        this.resizeLoading = false // 로딩 off
        return
      }

      // START: preview resized
      await this.resizeImage({ file: file })
        .then((resizedImage) => {
          this.uploadFile = resizedImage
          this.resizedImg = URL.createObjectURL(resizedImage)
        })
        .catch((err) => {
          console.error(err)
        })
      // END: preview resized
      this.resizeLoading = false // 로딩 off
    },

    dataURItoBlob(dataUrl) {
      const bytes =
        dataUrl.split(",")[0].indexOf("base64") >= 0
          ? atob(dataUrl.split(",")[1])
          : unescape(dataUrl.split(",")[1])
      const mime = dataUrl
        .split(",")[0]
        .split(":")[1]
        .split(";")[0]
      const max = bytes.length
      const ia = new Uint8Array(max)
      for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i)
      return new Blob([ia], { type: mime })
    },

    resizeImage({ file }) {
      const reader = new FileReader()
      const image = new Image()
      const canvas = document.createElement("canvas")
      const size = file.size

      const resize = () => {
        // let comp_size = 102400 //100KB (썸네일 작업 결과물 사이즈, 50~200KB 수준으로 압축됨)
        let comp_size = 204800 //200KB
        let { width, height } = image

        var ratio = Math.ceil(Math.sqrt(size / comp_size, 2))
        width = image.width / ratio
        height = image.height / ratio
        canvas.width = width
        canvas.height = height
        canvas.getContext("2d").drawImage(image, 0, 0, width, height)
        // const dataUrl = canvas.toDataURL("image/png") // 용량이 여전히 큰 문제로 인해 jpeg로 변경
        const dataUrl = canvas.toDataURL("image/jpeg")
        return this.dataURItoBlob(dataUrl)
      }

      return new Promise((ok, no) => {
        if (!file.type.match(/image.*/)) {
          no(new Error("Not an image"))
          return
        }

        reader.onload = (readerEvent) => {
          image.onload = () => ok(resize())
          image.src = readerEvent.target.result
        }

        reader.readAsDataURL(file)
      })
    },
    async updateBtnClicked() {
      if (!this.uploadFile) {
        this.$toast.error("이미지 파일을 업로드해주세요")
        return
      }
      const file = this.uploadFile
      const storeId = this.store.storeId
      const uid = this.fireUser.uid
      const fileName = new Date().getTime().toString() + "-" + uid

      await this.$firebase
        .storage()
        .ref("cafes/" + storeId + "/photo/" + fileName)
        .put(file)

      this.closeBtnClicked()
    },
  },
}
</script>

<style></style>
