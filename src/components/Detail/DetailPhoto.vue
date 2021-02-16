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
        <v-btn @click="sortBtn">sortBtn</v-btn>

        <v-row>
          <v-col
            v-for="(photo, index) in photoList"
            :key="index"
            class="d-flex child-flex"
            cols="4"
          >
            <v-img :src="photo.link" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
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
  </v-card>
</template>

<script>
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
      photoListLoading: true,

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
  watch: {
    photoList(nv, ov) {
      console.log("new", nv, " // old", ov)
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
      this.photoList = storagePhotoList
      console.log("hell", this.photoList)
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

<style></style>
