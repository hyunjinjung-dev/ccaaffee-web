<template>
  <div class="operating-time-outer" v-if="operatingTime">
    <div v-if="isOpen"><span>영업중</span> · 영업종료시간 : {{ stringfyTime(noticeTime) }}</div>
    <div v-else>
      <span class="text-red">영업종료</span>
      <span> · 영업시작시간 : </span>
      <span v-if="noticeDay">{{ noticeDay }}요일 </span>
      <span>{{ stringfyTime(noticeTime) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["operatingTime"],
  data() {
    return {
      dayLabels: ["일", "월", "화", "수", "목", "금", "토"],

      nowDay: new Date().getDay(),
      nowHours: new Date().getHours(),
      nowMinutes: new Date().getMinutes(),
      isOpen: false,

      noticeDay: null, // 영업중 + 영업종료 시간 : / 영업종료 + 영업시작 시간 :
      noticeTime: null, // 영업종료 시간 or 영업시작 시간
    }
  },
  watch: {
    operatingTime: {
      deep: true,
      handler() {
        this.calc()
      },
    },
  },
  computed: {
    calcNowTime() {
      let nowMinutesWithZero = String(this.nowMinutes)
      if (this.nowMinutes < 10) {
        nowMinutesWithZero = "0" + nowMinutesWithZero
      }
      let nowTime = Number(String(this.nowHours) + nowMinutesWithZero)
      return nowTime
    },
  },
  mounted() {
    this.calc()
  },
  methods: {
    calc() {
      let today = this.operatingTime[this.nowDay]
      this.noticeDay = null
      if (today.open) {
        if (this.calcNowTime < today.openTime) {
          this.isOpen = false
          this.noticeDay = ""
          this.noticeTime = today.openTime
          return
        } else if (today.openTime <= this.calcNowTime && this.calcNowTime < today.closeTime) {
          this.isOpen = true
          this.noticeDay = ""
          this.noticeTime = today.closeTime
          return
        } else if (this.calcNowTime >= today.closeTime) {
          this.isOpen = false
          for (let i = this.nowDay + 1; i < 7; i++) {
            if (this.noticeDay === null && this.operatingTime[i].open) {
              this.noticeDay = this.dayLabels[i]
              this.noticeTime = this.operatingTime[i].openTime
              return
            }
          }
          for (let i = 0; i <= this.nowDay; i++) {
            if (this.noticeDay === null && this.operatingTime[i].open) {
              this.noticeDay = this.dayLabels[i]
              this.noticeTime = this.operatingTime[i].openTime
              return
            }
          }
        }
      } else {
        this.isOpen = false
        for (let i = this.nowDay + 1; i < 7; i++) {
          if (this.noticeDay === null && this.operatingTime[i].open) {
            this.noticeDay = this.dayLabels[i]
            this.noticeTime = this.operatingTime[i].openTime
            return
          }
        }
        for (let i = 0; i <= this.nowDay; i++) {
          if (this.noticeDay === null && this.operatingTime[i].open) {
            this.noticeDay = this.dayLabels[i]
            this.noticeTime = this.operatingTime[i].openTime
            return
          }
        }
      }
    },
    stringfyTime(time) {
      let hours = ""
      let minutes = ""
      if (time ?? false) {
        hours = time.slice(0, 2)
        minutes = time.slice(2)
        return hours + ":" + minutes
      } else {
        return "휴무"
      }
    },
  },
}
</script>

<style>
.text-green {
  color: green;
  font-weight: 700;
}
.text-red {
  color: red;
  font-weight: 700;
}
</style>
