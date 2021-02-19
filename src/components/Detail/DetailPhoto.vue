<template>
  <v-card tag="section">
    <detail-card-bar
      :title="title"
      :store="store"
      :expand="expand"
      menuOption
      @expandToggle="expandToggle"
      @addPhotoBtnClicked="openAddPhotoDialog"
      @deletePhotoBtnClicked="deletePhotoBtnClicked"
    ></detail-card-bar>

    <v-expand-transition>
      <v-card-text v-show="expand">
        <!-- <v-row v-if="photoList && photoList.length > 0"> -->
        <!-- <v-btn @click="loadMorePhoto">더보기</v-btn> -->

        <v-row v-if="sortedPhotoList && sortedPhotoList.length > 0">
          <!-- v-for 와 v-if를 함께 쓸 수 없어서 v-col은 그리되, pa-0으로 여백을 없애서 클릭할 수 없게 만듦 -->
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
              style="border-radius: 4px;"
              v-if="index < exposedPhotoCount"
              transition="scale-transition"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>

              <div
                v-if="index == exposedPhotoCount - 1 && totalPhotoCount != exposedPhotoCount"
                style="cursor:pointer"
              >
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
      @addPhotoComplete="updateUserPagePhoto"
      @closeBtnClicked="closeAddPhotoDialog"
    >
    </detail-photo-add>

    <detail-photo-delete
      v-if="deleteDialog"
      :title="title"
      :store="store"
      :dialog="deleteDialog"
      :photoList="userPhotoList"
      @deletePhotoComplete="deleteUserPagePhoto"
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
      userPhotoList: [],
      photoDialog: false,
      selectedPhoto: "",
      exposedPhotoCount: 0,

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
    fireUser() {
      return this.$store.state.fireUser
    },
    user() {
      return this.$store.state.user
    },
    totalPhotoCount() {
      if (this.storagePhotoList) {
        return this.storagePhotoList.length
      } else {
        return 0
      }
    },
    sortedPhotoList() {
      return sortBy(this.storagePhotoList, "createdAt").reverse()
    },
  },

  methods: {
    async read() {
      const storageRef = this.$firebase.storage().ref()
      const listRef = storageRef.child("cafes/" + this.store.storeId + "/photo")

      let storageDataLength = 0
      let storageData = await listRef
        .listAll()
        .then(function(res) {
          let list = []
          res.items.forEach(function(itemRef) {
            // storage file의 이름 가져오기 >> createdAt, uid 세팅
            let fileName = itemRef.name
            let fileNameSplit = itemRef.name.split("-")
            let createdAt = Number(fileNameSplit[0])
            let uid = fileNameSplit[1]

            // storage file의 링크 가져오고 Data Setting
            itemRef.getDownloadURL().then(function(url) {
              let link = url
              list.push({
                fileName: fileName,
                createdAt: createdAt,
                link: link,
                uid: uid,
              })
            })
            storageDataLength++
          })
          return list
        })
        .catch(function(error) {
          console.log("error", error)
        })

      if (storageDataLength < 3) {
        this.exposedPhotoCount = storageDataLength
      } else {
        this.exposedPhotoCount = 3
      }
      this.storagePhotoList = storageData
    },
    photoClicked(index) {
      if (index == this.exposedPhotoCount - 1 && this.totalPhotoCount != this.exposedPhotoCount) {
        this.loadMorePhoto("load")
        return
      } else {
        this.selectedPhoto = index
        this.photoDialog = true
      }
    },
    loadMorePhoto(type) {
      // %3에 따라 count를 가변적으로 올려서 add, delete할 시에도 대응
      let plusCount = 0
      if (this.exposedPhotoCount % 3 == 0) {
        if (type == "update") {
          return
        } else {
          plusCount = 3
        }
      } else if (this.exposedPhotoCount % 3 == 1) {
        plusCount = 2
      } else {
        plusCount = 1
      }
      for (let i = 0; i < plusCount; i++) {
        if (this.totalPhotoCount > this.exposedPhotoCount) {
          this.exposedPhotoCount++
        }
      }
    },
    updateUserPagePhoto(fileName, createdAt, link, uid) {
      let addedPhoto = {
        fileName: fileName,
        createdAt: createdAt,
        link: link,
        uid: uid,
      }
      this.storagePhotoList.push(addedPhoto)
      this.loadMorePhoto("update")
    },
    deletePhotoBtnClicked() {
      this.userPhotoList = []

      if (this.user.level == 0) {
        console.log("manager")
        this.userPhotoList = this.sortedPhotoList
      } else {
        console.log("normal user")
        let myPhotoList = []
        let myUid = this.fireUser.uid
        this.sortedPhotoList.forEach((item) => {
          if (item.uid == myUid) {
            myPhotoList.push(item)
          }
        })
        this.userPhotoList = myPhotoList
      }

      if (this.userPhotoList.length > 0) {
        this.openDeletePhotoDialog()
      } else {
        this.$toast.error("업로드한 사진이 없어요")
      }
    },
    deleteUserPagePhoto(fileId) {
      const deleteStorageListIndex = this.storagePhotoList.findIndex((item) => {
        return item.createdAt == fileId
      })
      this.storagePhotoList.splice(deleteStorageListIndex, 1)

      const deleteUserListIndex = this.userPhotoList.findIndex((item) => {
        return item.createdAt == fileId
      })
      this.userPhotoList.splice(deleteUserListIndex, 1)

      this.exposedPhotoCount--
      this.loadMorePhoto("update")
    },

    expandToggle() {
      this.expand = !this.expand
    },
    closePhotoDialog() {
      this.photoDialog = false
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
      this.userPhotoList = []
      this.deleteDialog = false
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  background-color: black;
}
</style>
