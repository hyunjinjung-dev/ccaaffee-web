<template>
  <v-dialog v-model="dialog" persistent transition="scroll-x-transition" scrollable fullscreen>
    <!-- max-width="500px"
    :fullscreen="breakPointXs ? true : false"
    :hide-overlay="breakPointXs ? true : false" -->
    <v-card class="pa-2">
      <v-card-title class="font-weight-bold subheading mb-5">{{ title }} 수정</v-card-title>
      <v-card-text :class="breakPointXs ? 'pa-0' : ''" ref="wrapper">
        <v-row>
          <v-col cols="12" md="6" sm="12" xs="12">
            <draggable v-model="formLeft" :options="{ group: 'menus' }" style="min-height: 10px;">
              <template v-for="(item, index) in formLeft">
                <v-container :key="index">
                  <v-sheet v-if="item.name == '구분선'">
                    <v-row align="center">
                      <v-col cols="8" style="text-align:center;">
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="2">
                        <v-btn icon @click="removeMenuConfirm(index, 'left')">
                          <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="2">
                        <v-btn icon @click="removeMenu(index, column)">
                          <v-icon>mdi-unfold-more-horizontal</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>
                  <v-sheet v-else>
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
                        <v-btn icon @click="removeMenuConfirm(index, 'left')">
                          <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="10">
                        <v-text-field
                          hide-details
                          v-model="formLeft[index].describe"
                          :rules="menuDescribeRules"
                          label="메뉴설명"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2" align="center">
                        <v-btn icon @click="removeMenu(index, column)">
                          <v-icon>mdi-unfold-more-horizontal</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-container>
              </template>
            </draggable>
            <div style="margin: 10px 0px; text-align: center;">
              <v-btn class="mx-1" color="secondary" @click="addMenu('left')">메뉴 추가</v-btn>
              <v-btn class="mx-1" color="secondary" @click="addDivider('left')">구분선 추가</v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="6" sm="12" xs="12">
            <draggable v-model="formRight" :options="{ group: 'menus' }" style="min-height: 10px;">
              <template v-for="(item, index) in formRight">
                <v-container :key="index">
                  <v-sheet v-if="item.name == '구분선'">
                    <v-row align="center">
                      <v-col cols="8" style="text-align:center;">
                        <v-divider></v-divider>
                      </v-col>
                      <v-col cols="2">
                        <v-btn icon @click="removeMenuConfirm(index, 'right')">
                          <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="2">
                        <v-btn icon @click="removeMenu(index, column)">
                          <v-icon>mdi-unfold-more-horizontal</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>
                  <v-sheet v-else>
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
                        <v-btn icon @click="removeMenuConfirm(index, 'right')">
                          <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="10">
                        <v-text-field
                          hide-details
                          v-model="formRight[index].describe"
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
                  </v-sheet>
                </v-container>
              </template>
            </draggable>

            <div style="margin: 10px 0px; text-align: center;">
              <v-btn class="mx-1" color="secondary" @click="addMenu('right')">메뉴 추가</v-btn>
              <v-btn class="mx-1" color="secondary" @click="addDivider('right')">구분선 추가</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- <v-divider class="mx-8 my-4"></v-divider> -->
      <v-card-text
        :class="breakPointXs ? 'pa-0' : ''"
        id="container"
        ref="columnRight"
        style="max-height: 40%;"
      >
      </v-card-text>

      <v-card-actions class="mt-5">
        <v-btn text @click="closeBtnClicked">취소</v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn color="secondary" @click="addMenu()">메뉴추가</v-btn> -->
        <!-- <v-spacer></v-spacer> -->
        <v-btn color="primary" @click="updateBtnClicked">수정</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="removeConfirmDialog" max-width="290">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text v-if="removeMenuIndex >= 0">
          <!-- {{ this.form[removeMenuIndex].name }} -->
          메뉴를 삭제하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click=";[(removeConfirmDialog = false), (removeMenuIndex = -1)]">
            취소
          </v-btn>
          <v-btn color="error" text @click="removeMenu(removeMenuIndex, removeColumn)">
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
      removeColumn: "",
      removeMenuIndex: -1,
      valid: true,
      formLeft: [],
      formRight: [],
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
      if (this.store.menusLeft && this.store.menusLeft.length > 0) {
        this.formLeft = JSON.parse(JSON.stringify(this.store.menusLeft))
      } else {
        this.formLeft = [{ name: "", price: "", describe: "" }]
      }
      if (this.store.menusRight && this.store.menusRight.length > 0) {
        this.formRight = JSON.parse(JSON.stringify(this.store.menusRight))
      } else {
        this.formRight = [{ name: "", price: "", describe: "" }]
      }
    },
    async updateBtnClicked() {
      // v-for <> valicadte 호환문제로 이해하고 넘어감.
      // await this.$refs.form.validate()

      await this.formLeft.forEach((menu) => {
        if (menu.name == "") {
          this.valid = false
        }
      })
      await this.formRight.forEach((menu) => {
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
    removeMenuConfirm(index, column) {
      console.log("index", index)
      console.log("column", column)
      // index가 0일 경우 v-if에서 false로 받아들임을 주의
      this.removeColumn = column
      this.removeMenuIndex = index
      this.removeConfirmDialog = true
    },
    removeMenu(index, column) {
      console.log("column", column)
      if (column == "left") {
        this.formLeft.splice(index, 1)
        this.removeMenuIndex = -1 // v-if 오류를 해결하기 위에 -1로 초기화
      } else {
        this.formRight.splice(index, 1)
        this.removeMenuIndex = -1 // v-if 오류를 해결하기 위에 -1로 초기화
      }
      this.removeConfirmDialog = false
    },
    async addMenu(column) {
      if (column == "left") {
        this.formLeft.push({ name: "", price: "", describe: "" })
      } else {
        this.formRight.push({ name: "", price: "", describe: "" })
      }
      // 메뉴 추가와 스크롤 다운이 동기로 진행되기 때문에 메뉴 추가를 비동기 처리하여
      // 처리 후의 scrollHeight를 잡아준다.
      // var wrapper = this.$refs.wrapper
      // wrapper.scrollTop = wrapper.scrollHeight
    },
    async addDivider(column) {
      if (column == "left") {
        await this.formLeft.push({ name: "구분선", price: "", describe: "" })
        var columnLeft = this.$refs.columnLeft
        columnLeft.scrollTop = columnLeft.scrollHeight
      } else {
        await this.formRight.push({ name: "구분선", price: "", describe: "" })
        var columnRight = this.$refs.columnRight
        columnRight.scrollTop = columnRight.scrollHeight
      }
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
          .update({ menusLeft: this.formLeft, menusRight: this.formRight })
      } finally {
        this.closeBtnClicked()
      }
    },
  },
}
</script>

<style></style>
