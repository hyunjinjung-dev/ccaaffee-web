<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="350" transition="scroll-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="primary" v-bind="attrs" v-on="on">
          <v-progress-circular
            indeterminate
            v-if="loading"
            size="20"
            class="mr-2"
          ></v-progress-circular>
          <v-icon left v-else>mdi-account</v-icon>
          <span>로그인</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline mb-4">
          ccaaffee
        </v-card-title>

        <v-card-text>
          <v-btn color="primary" block @click="signInWithGoogle">
            <v-icon left>mdi-google</v-icon>
            <span>구글로 시작하기</span>
          </v-btn>
        </v-card-text>

        <v-card-text>
          <v-btn
            disabled
            outlined
            color="secondary"
            block
            @click="openEmailSignIn = !openEmailSignIn"
          >
            <v-icon left>mdi-email</v-icon>
            <span>이메일로 회원가입</span>
          </v-btn>
        </v-card-text>

        <v-slide-y-transition>
          <v-card-text v-if="openEmailSignIn">
            <v-form v-model="valid" lazy-validation ref="form">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="아이디(이메일)"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="form.pwd"
                :rules="pwdRules"
                label="비밀번호"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-slide-y-transition>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
          <v-scroll-x-transition>
            <v-btn v-if="openEmailSignIn" color="primary" text @click="signInBtnClicked">
              Login
            </v-btn>
          </v-scroll-x-transition>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      valid: false,
      dialog: false,
      openEmailSignIn: false,
      form: {
        email: "",
        pwd: "",
      },
      emailRules: [
        (v) => !!v || "아이디를 입력해주세요.",
        (v) => /.+@.+/.test(v) || "정확한 이메일을 입력해주세요.",
      ],
      pwdRules: [(v) => !!v || "비밀번호를 입력해주세요."],
    }
  },
  watch: {
    dialog(close) {
      if (close) {
        this.openEmailSignIn = false
      }
    },
  },
  methods: {
    async signInBtnClicked() {
      await this.$refs.form.validate()
      if (this.valid) {
        console.log("good")
        this.dialog = false
      } else {
        console.log("hell")
      }
    },
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().languageCode = "ko"
      this.loading = true
      try {
        await this.$firebase.auth().signInWithPopup(provider)
      } catch (e) {
        this.$toast.error(e.message)
        this.loading = false
      } finally {
        this.loading = false
        this.form.email = ""
        this.form.pwd = ""
        this.dialog = false
        this.$router.go()
      }
    },
  },
}
</script>

<style></style>
