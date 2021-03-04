<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      width="350"
      transition="scroll-x-transition"
      :fullscreen="breakPointXs ? true : false"
      :hide-overlay="breakPointXs ? true : false"
    >
      <v-card>
        <v-card-title class="headline mb-4">
          회원정보 입력
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid" lazy-validation ref="form">
            <v-text-field
              v-model="form.lastName"
              :rules="lastNameRules"
              label="성(Last Name)"
              hint="한글로 입력해주세요 ex) 홍"
            ></v-text-field>
            <v-text-field
              v-model="form.firstName"
              :rules="firstNameRules"
              label="이름(First Name)"
              hint="한글로 입력해주세요 ex) 길동"
            ></v-text-field>
            <v-text-field
              v-model="form.birth"
              :rules="birthRules"
              label="생년월일(Birth)"
              type="Number"
              hint="숫자만 입력해주세요 ex) 19450815"
            ></v-text-field>
            <v-radio-group v-model="form.sex" row>
              <v-radio label="남(Man)" value="1"></v-radio>
              <v-radio label="여(Woman)" value="2"></v-radio>
            </v-radio-group>
            <v-checkbox
              v-model="checkbox1"
              :rules="[(v) => !!v || '이용약관에 동의해주세요']"
              label="ccaaffee의 이용약관에 동의합니다."
            ></v-checkbox>
            <v-checkbox
              v-model="checkbox2"
              :rules="[(v) => !!v || '개인정보처리방침에 동의해주세요']"
              label="ccaaffee의 개인정보처리방침에 동의합니다."
            ></v-checkbox>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="save" block>
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        sex: "",
        birth: "",
      },
      checkbox1: false,
      checkbox2: false,

      lastNameRules: [(v) => v.length <= 20 || "카페명(영문)은 20자 이하로 입력 가능해요"],
      firstNameRules: [(v) => v.length <= 20 || "카페명(영문)은 20자 이하로 입력 가능해요"],
      birthRules: [(v) => v.length <= 20 || "카페명(영문)은 20자 이하로 입력 가능해요"],
    }
  },
  computed: {
    breakPointXs() {
      return this.$vuetify.breakpoint.xs ? true : false
    },
  },
  methods: {
    save() {
      console.log("save")
    },
  },
}
</script>

<style></style>
