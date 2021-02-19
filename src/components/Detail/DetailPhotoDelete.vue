<template>
  <v-dialog
    v-model="dialog"
    persistent
    :fullscreen="breakPointXs ? true : false"
    max-width="500"
    transition="scroll-x-transition"
  >
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">
        내가 업로드한 {{ title }} 삭제
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(photo, index) in optionList"
            :key="index"
            class="d-flex child-flex pa-0"
            cols="4"
            @click="photoClicked(photo.fileName)"
          >
            <v-img
              :src="photo.link"
              aspect-ratio="1"
              class="grey lighten-2 ma-1"
              style="border-radius: 4px;"
            >
              <div style="cursor:pointer">
                <div
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal subtitle-1 font-weight-bold white--text"
                  style="height: 100%;"
                >
                  삭제
                </div>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <confirm-dialog
        v-if="confirmDialogToggle"
        :dialog="confirmDialogToggle"
        :title="confirmDialogTitle"
        :firstLineText="confirmDialogText"
        @closeBtnClicked="closeConfirmDialog"
        @confirmBtnClicked="deletePhoto"
      />

      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-btn text @click="closeBtnClicked">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ConfirmDialog from "@/components/Module/ConfirmDialog"

export default {
  components: {
    ConfirmDialog,
  },
  props: ["title", "store", "dialog", "photoList"],
  data() {
    return {
      optionList: [],

      selectedFileName: "",
      selectedFileId: "",

      confirmDialogToggle: false,
      confirmDialogTitle: "사진 삭제",
      confirmDialogText: "사진을 완전히 삭제할까요?",
    }
  },
  mounted() {
    this.fetch()
  },
  computed: {
    url() {
      if (!this.image) {
        return
      }
      return URL.createObjectURL(this.image)
    },
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  // watch: {
  //   photoList: {
  //     deep: true,
  //     handler() {
  //       console.log("watch child")
  //       this.fetch()
  //     },
  //   },
  // },
  methods: {
    fetch() {
      this.optionList = this.photoList
    },
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    closeConfirmDialog() {
      this.confirmDialogToggle = false
    },
    photoClicked(fileName) {
      this.selectedFileName = fileName
      this.selectedFileId = Number(fileName.split("-")[0])
      this.confirmDialogToggle = true
    },
    deletePhoto() {
      this.$firebase
        .storage()
        .ref("cafes/" + this.store.storeId + "/photo/" + this.selectedFileName)
        .delete()
        .then(() => {
          this.$emit("deletePhotoComplete", this.selectedFileId)
          this.selectedFileName = ""
          this.selectedFileId = ""
          this.closeConfirmDialog()
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.4;
  position: absolute;
  width: 100%;
  background-color: black;
}
</style>
