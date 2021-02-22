<template>
  <div>
    <div>
      <v-file-input @change="Preview_image" v-model="image"> </v-file-input>
      <v-img :src="url"></v-img>
    </div>

    <!-- <v-btn @click="openDialogg">알림</v-btn>

    <v-btn @click="movemove">넘어가보자</v-btn> -->

    <v-btn @click="openAlert">openAlert</v-btn>

    <!-- 출처 : https://lovemewithoutall.github.io/it/vue-image-upload-to-firestorage/ -->
    <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
      Upload a cover image
      <v-icon right aria-hidden="true">mdi-camera</v-icon>
    </v-btn>
    <form ref="form">
      <input
        id="files"
        type="file"
        name="file"
        ref="uploadInput"
        accept="image/*"
        :multiple="false"
        @change="detectFiles($event)"
      />
    </form>
    <v-progress-circular
      v-if="uploading && !uploadEnd"
      :size="100"
      :width="15"
      :rotate="360"
      :value="progressUpload"
      color="primary"
    >
      %
    </v-progress-circular>
    <img v-if="uploadEnd" :src="downloadURL" width="100%" />
    <div v-if="uploadEnd">
      <v-btn class="ma-0" dark small color="error" @click="deleteImage()">
        Delete
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempDialog: false,

      url: null,
      image: null,

      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: "",

      images: [
        "https://picsum.photos/500/300?image=10",
        "https://picsum.photos/500/300?image=11",
        "https://picsum.photos/500/300?image=12",
        "https://picsum.photos/500/300?image=13",
        "https://picsum.photos/500/300?image=14",
      ],
    }
  },
  methods: {
    openAlert() {
      let alertDialogInfo = {
        // timeout: 5000,
        emoji: "🙏🏻",
        title: "카페가 성공적으로 등록되었어요!",
        firstLineText: "도움에 감사드립니다",
        secondLineText: "by.ccaaffee",
        // thirdLineText: "셋째줄",
      }
      this.$store.dispatch("openAlertDialog", alertDialogInfo)
    },
    closeDialog() {
      this.tempDialog = false
    },
    openDialogg() {
      this.tempDialog = true
      console.log(this.tempDialog)
    },
    movemove() {
      this.tempDialog = true
    },

    Preview_image() {
      this.url = URL.createObjectURL(this.image)
    },
    selectFile() {
      this.$refs.uploadInput.click()
    },
    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x])
      })
    },
    upload(file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = this.$firebase
        .storage()
        .ref("images/" + file.name)
        .put(file)
    },
    deleteImage() {
      this.$firebase
        .storage()
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ""
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
      this.$refs.form.reset()
    },
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        (sp) => {
          this.progressUpload = Math.floor((sp.bytesTransferred / sp.totalBytes) * 100)
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.uploadEnd = true
            this.downloadURL = downloadURL
            this.$emit("downloadURL", downloadURL)
          })
        }
      )
    },
  },
}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>
