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
        <!-- <v-row v-if="photoList && photoList.length > 0"> -->
        <!-- <v-btn @click="loadMorePhoto">더보기</v-btn> -->

        <v-row v-if="sortedPhotoList">
          <!-- v-for 와 v-if를 함께 쓸 수 없어서 v-col은 그리되, pa-0으로 여백을 없애서 선택할 수 없게 만듦 -->
          <v-col
            v-for="(photo, index) in sortedPhotoList"
            :key="photo.createdAt"
            class="d-flex child-flex pa-0"
            cols="4"
            @click="photoClicked(index)"
          >
            <!-- v-img 'aspect-ratio' element로 가로/세로 비율 조절 가능 -->
            <v-img
              :src="photo.link"
              aspect-ratio="1"
              class="grey lighten-2 ma-1"
              v-if="index < exposedPhotoCount"
            >
              <div v-if="index == exposedPhotoCount - 1 && totalPhotoCount != exposedPhotoCount">
                <!-- @click="loadMorePhoto" click 이벤트가 동시에 두개가 걸려서 로직에 오류. 하나로 결합-->
                <div
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal subtitle-1 font-weight-bold white--text"
                  style="height: 100%;"
                >
                  더보기
                </div>
              </div>
            </v-img>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <span class="info--text">
              사진을 등록해주세요
            </span>
          </v-col>
        </v-row>
        <v-row v-if="exposedPhotoCount != totalPhotoCount" justify="end">
          <v-col cols="4" style="text-align:right;">
            {{ exposedPhotoCount }} / {{ totalPhotoCount }}
          </v-col>
        </v-row>
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

    <detail-photo-dialog
      v-if="photoDialog"
      :store="store"
      :dialog="photoDialog"
      :photoList="sortedPhotoList"
      :selectedPhoto="selectedPhoto"
      @closeBtnClicked="closePhotoDialog"
    ></detail-photo-dialog>
  </v-card>
</template>

<script>
import { sortBy } from "lodash"

import DetailCardBar from "@/components/Detail/DetailCardBar.vue"
import DetailPhotoDialog from "@/components/Detail/DetailPhotoDialog.vue"
import DetailPhotoAdd from "@/components/Detail/DetailPhotoAdd.vue"
import DetailPhotoDelete from "@/components/Detail/DetailPhotoDelete.vue"

export default {
  name: "DetailPhoto",
  props: ["store"],
  components: {
    DetailCardBar,
    DetailPhotoDialog,
    DetailPhotoAdd,
    DetailPhotoDelete,
  },
  data() {
    return {
      title: "사진",
      expand: true,
      addDialog: false,
      deleteDialog: false,

      storagePhotoList: [],
      photoList: [],
      waitingPhotoList: [],
      photoDialog: false,
      selectedPhoto: "",

      exposedPhotoCount: 3,

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
    totalPhotoCount() {
      return this.storagePhotoList.length
    },
    sortedPhotoList() {
      return sortBy(this.storagePhotoList, "createdAt").reverse()
    },
  },
  methods: {
    photoClicked(index) {
      if (index == this.exposedPhotoCount - 1 && this.totalPhotoCount != this.exposedPhotoCount) {
        this.loadMorePhoto()
        return
      } else {
        this.selectedPhoto = index
        this.photoDialog = true
      }
    },
    loadMorePhoto() {
      for (let i = 0; i < 3; i++) {
        if (this.totalPhotoCount > this.exposedPhotoCount) {
          this.exposedPhotoCount++
        }
      }
    },
    closePhotoDialog() {
      this.photoDialog = false
    },
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
      let storageData = await listRef
        .listAll()
        .then(function(res) {
          let list = []
          res.items.forEach(function(itemRef) {
            // storage file의 이름 가져오기 >> createdAt, uid 세팅
            let fileName = itemRef.name.split("-")
            let createdAt = Number(fileName[0])
            let uid = fileName[1]

            // storage file의 링크 가져오기
            itemRef.getDownloadURL().then(function(url) {
              let link = url
              list.push({
                createdAt: createdAt,
                uid: uid,
                link: link,
              })
            })
          })
          return list
        })
        .catch(function(error) {
          console.log("error", error)
        })
      this.storagePhotoList = storageData
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
