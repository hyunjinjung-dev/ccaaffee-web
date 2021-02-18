<template>
  <v-card tag="section" flat>
    <v-card-title>
      <v-flex class="font-weight-bold subheading" :shrink="sizeXS ? true : false">
        {{ title }}
      </v-flex>
      <!-- <v-flex class="py-0" shrink>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-2 mr-0 my-0" icon v-on="on" @click="editBtnClicked">
              <v-icon>mdi-pencil-circle</v-icon>
            </v-btn>
          </template>
          <span>{{ title }} 수정</span>
        </v-tooltip>
      </v-flex> -->
      <v-flex class="py-0" shrink v-if="!menuOption">
        <v-btn class="ml-2 mr-0 my-0" icon @click="editBtnClicked">
          <v-icon>mdi-pencil-circle</v-icon>
        </v-btn>
      </v-flex>
      <v-flex class="py-0" shrink v-else>
        <div class="text-center">
          <!-- <v-menu offset-y left> -->
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-2 mr-0 my-0" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item v-for="(item, index) in menuOptions" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item> -->
              <v-list-item @click="addPhotoBtnClicked">추가</v-list-item>
              <v-list-item @click="deletePhotoBtnClicked">삭제</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-flex>
      <v-flex v-if="sizeXS">
        <!-- 중간 정렬용 v-flex -->
      </v-flex>
      <v-flex v-if="sizeXS" shrink>
        <v-btn icon @click="expandToggle">
          <v-icon>{{ expand ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-flex>
    </v-card-title>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "DetailCardBar",
  props: {
    title: String,
    store: Object,
    expand: Boolean,
    menuOption: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // menuOptions: [{ title: "사진 추가하기" }, { title: "내가 업로드한 사진 보기" }],
    }
  },
  computed: {
    sizeXS() {
      return this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    expandToggle() {
      this.$emit("expandToggle")
    },
    editBtnClicked() {
      this.$emit("updateBtnClicked")
    },
    addPhotoBtnClicked() {
      this.$emit("addPhotoBtnClicked")
    },
    deletePhotoBtnClicked() {
      this.$emit("deletePhotoBtnClicked")
    },
  },
}
</script>

<style></style>
