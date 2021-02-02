<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="scroll-x-transition"
    scrollable
    max-width="500px"
    :fullscreen="breakPointXs ? true : false"
    :hide-overlay="breakPointXs ? true : false"
  >
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>
      <v-card-text :class="breakPointXs ? 'pa-0' : ''" id="container" ref="hell">
        <draggable v-model="form" :options="{ group: 'menus' }" style="min-height: 10px">
          <template v-for="(item, index) in form">
            <v-container :key="index">
              <v-row align="center">
                <v-col cols="6">
                  <v-text-field
                    v-model="item.name"
                    :rules="menuNameRules"
                    label="메뉴명"
                    hide-details
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    hide-details
                    v-model="item.price"
                    :rules="menuPriceRules"
                    type="tel"
                    label="가격"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2" align="center">
                  <v-btn icon @click="removeMenuConfirm(index)">
                    <v-icon>mdi-minus-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="10">
                  <v-text-field
                    hide-details
                    v-model="form[index].describe"
                    :rules="menuDescribeRules"
                    label="메뉴설명"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2" align="center">
                  <v-btn icon @click="removeMenu(index)">
                    <v-icon>mdi-unfold-more-horizontal</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- divider 추가하기 -->
            </v-container>
          </template>
        </draggable>
      </v-card-text>

      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-actions class="mt-5">
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="addMenu">메뉴추가</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateBtnClicked">수정</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="removeConfirmDialog" max-width="290">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text v-if="removeMenuIndex >= 0">
          {{ this.form[removeMenuIndex].name }}
          메뉴를 삭제하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click=";[(removeConfirmDialog = false), (removeMenuIndex = -1)]">
            취소
          </v-btn>
          <v-btn color="error" text @click="removeMenu(removeMenuIndex)">
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import draggable from "vuedraggable"

export default {
  props: ["title", "store", "dialog"],
  components: {
    draggable,
  },
  data() {
    return {
      removeConfirmDialog: false,
      removeMenuIndex: -1,
      valid: true,
      form: [],
      menuNameRules: [(v) => !!v || "입력한 메뉴명을 확인해주세요"],
      menuPriceRules: [(v) => v.length <= 11 || "입력한 가격을 확인해주세요"],
      menuDescribeRules: [(v) => v.length <= 50 || "설명은 30자 이내로 작성해주세요"],
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  mounted() {
    this.fetch()
  },
  methods: {
    closeBtnClicked() {
      this.$emit("closeBtnClicked")
    },
    fetch() {
      if (this.store.menus) {
        // this.form = this.store.menus
        this.form = JSON.parse(JSON.stringify(this.store.menus))
      } else {
        this.form = [{ name: "", price: "", describe: "" }]
      }
    },
    async updateBtnClicked() {
      // v-for <> valicadte 호환문제로 이해하고 넘어감.
      // await this.$refs.form.validate()

      await this.form.forEach((menu) => {
        if (menu.name == "") {
          this.valid = false
        }
      })

      if (this.valid) {
        this.update()
      } else {
        this.$toast.error("메뉴명을 필수로 입력해주세요")
        this.valid = true
      }
    },
    removeMenuConfirm(index) {
      // index가 0일 경우 v-if에서 false로 받아들임을 주의
      this.removeMenuIndex = index
      this.removeConfirmDialog = true
    },
    removeMenu(index) {
      this.form.splice(index, 1)
      // v-if 오류를 해결하기 위에 -1로 초기화
      this.removeMenuIndex = -1
      this.removeConfirmDialog = false
    },
    async addMenu() {
      // 메뉴 추가와 스크롤 다운이 동기로 진행되기 때문에 메뉴 추가를 비동기 처리하여
      // 처리 후의 scrollHeight를 잡아준다.
      await this.form.push({ name: "", price: "", describe: "" })

      var Hells = this.$refs.hell
      Hells.scrollTop = Hells.scrollHeight
    },
    async update() {
      let ref = this.$firebase
        .firestore()
        .collection("store")
        .doc("cafes")
      try {
        await ref
          .collection("cafe")
          .doc(this.store.storeId)
          .update({ menus: this.form })
      } finally {
        this.closeBtnClicked()
      }
    },
  },
}
</script>

<style></style>
