<template>
  <v-card tag="section">
    <detail-card-bar
      :title="title"
      :store="store"
      :expand="expand"
      menuOption
      @expandToggle="expandToggle"
      @addPhotoBtnClicked="openAddPhotoDialog"
      @deletePhotoBtnClicked="openDeletePhotoDialog"
    ></detail-card-bar>

    <v-expand-transition>
      <v-card-text v-show="expand">
        <!-- <v-col cols="4" v-for="(photo, index) in photoList" :key="index" ref="photoSquare">
            <v-img :src="photo" :height="squareHeight" />
          </v-col> -->
        <v-row>
          <v-col
            v-for="(photo, index) in photoList"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img :src="photo" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
        <v-btn @click="read">read</v-btn>
      </v-card-text>
    </v-expand-transition>

    <detail-photo-add
      v-if="addDialog"
      :title="title"
      :store="store"
      :dialog="addDialog"
      @closeBtnClicked="closeAddPhotoDialog"
    >
    </detail-photo-add>

    <detail-photo-delete
      v-if="deleteDialog"
      :title="title"
      :store="store"
      :dialog="deleteDialog"
      @closeBtnClicked="closeDeletePhotoDialog"
    >
    </detail-photo-delete>
  </v-card>
</template>

<script>
// import axios from "axios"

import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailPhotoAdd from "@/components/Detail/DetailPhotoAdd.vue"
import DetailPhotoDelete from "@/components/Detail/DetailPhotoDelete.vue"

export default {
  name: "DetailPhoto",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailPhotoAdd,
    DetailPhotoDelete,
  },
  data() {
    return {
      title: "사진",
      expand: true,
      addDialog: false,
      deleteDialog: false,

      photoList: [],

      url: "",
      imgUrl: null,
    }
  },
  mounted() {
    this.read()
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    expandToggle() {
      this.expand = !this.expand
    },
    openAddPhotoDialog() {
      this.addDialog = true
    },
    openDeletePhotoDialog() {
      this.deleteDialog = true
    },
    closeAddPhotoDialog() {
      this.addDialog = false
    },
    closeDeletePhotoDialog() {
      this.deleteDialog = false
    },
    async read() {
      const storageRef = this.$firebase.storage().ref()
      const listRef = storageRef.child("cafes/" + this.store.storeId + "/photo")
      let photoList = []
      await listRef
        .listAll()
        .then(function(res) {
          res.items.forEach(function(itemRef) {
            itemRef.getDownloadURL().then(function(url) {
              console.log(url)
              photoList.push(url)
            })
          })
        })
        .catch(function(error) {
          console.log("error", error)
          // Uh-oh, an error occurred!
        })
      this.photoList = photoList

      // 메타데이터 > 파일명 > 유저 > 유저정보 뿌리기
      // 메타데이터 > 파일명 > 유저 > 업로드 일시 확인해서 sort에 활용

      // const result = await axios.get(this.url)
      // console.log(result)
    },
  },
}
</script>

<style></style>
