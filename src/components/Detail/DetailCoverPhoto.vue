<template>
  <v-sheet style="background-color: inherit;">
    <v-hover v-if="coverPhoto" v-slot="{ hover }" style="">
      <v-parallax height="375" :src="coverPhoto">
        <div v-if="hover" class="mt-auto ml-auto mb-4">
          <v-btn icon color="white" @click="editBtnClicked">
            <v-icon>mdi-pencil-circle</v-icon>
          </v-btn>
        </div>
      </v-parallax>
    </v-hover>

    <div v-else style="text-align: right; height: 100px; border: 1px solid red;">
      <div style=" border: 1px solid red;" class="mt-auto">
        <v-btn class="mt-auto" icon @click="editBtnClicked">
          <v-icon>mdi-pencil-circle</v-icon>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: ["store"],

  data() {
    return {
      coverPhoto: null,
    }
  },
  mounted() {
    this.read()
  },
  methods: {
    async read() {
      const storageRef = this.$firebase.storage().ref()
      const listRef = storageRef.child("cafes/" + this.store.storeId + "/photo_cover")

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
          })
          return list
        })
        .catch(function(error) {
          console.log("error", error)
        })
      this.coverPhoto = storageData[0]
    },
    editBtnClicked() {
      console.log("hell")
    },
  },
}
</script>

<style></style>
