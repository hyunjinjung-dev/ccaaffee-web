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
        <!-- <v-btn @click="sortBtn">sortBtn</v-btn> -->

        <v-row>
          <v-col
            v-for="(photo, index) in photoList"
            :key="index"
            class="d-flex child-flex pa-2"
            cols="4"
            @click="photoClicked(index)"
          >
            <!-- v-img 'aspect-ratio' element로 가로/세로 비율 조절 가능 -->
            <v-img :src="photo.link" aspect-ratio="1" class="grey lighten-2">
              <div>
                <div
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-1 white--text"
                  style="height: 100%;"
                >
                  더보기
                </div>
              </div>
            </v-img>
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
      :photoList="photoList"
      :selectedPhoto="selectedPhoto"
      @closeBtnClicked="closePhotoDialog"
    ></detail-photo-dialog>
  </v-card>
</template>

<script>
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

      photoList: [],
      waitingPhotoList: [],
      photoDialog: false,
      selectedPhoto: "",

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
  // watch: {
  //   photoList(nv, ov) {
  //     console.log("new", nv, " // old", ov)
  //   },
  // },
  methods: {
    photoClicked(index) {
      this.selectedPhoto = index
      this.photoDialog = true
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
      let storagePhotoList = await listRef
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
          // list.sort((a, b) => {
          //   return b.createdAt - a.createdAt
          // })
        })
        .catch(function(error) {
          console.log("error", error)
        })
      this.waitingPhotoList = storagePhotoList

      // To Do
      // sort를 비동기로 하는 방법을 당췌 모르겠다. 하..
      // this.sortBtn()
    },

    sortBtn() {
      console.log("Sort!!")
      this.photoList.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
    },
    // 메타데이터 > 파일명 > 유저 > 유저정보 뿌리기
    // 메타데이터 > 파일명 > 유저 > 업로드 일시 확인해서 sort에 활용
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
}
</style>
