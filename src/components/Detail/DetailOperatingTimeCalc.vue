<template>
  <div class="operating-time-outer">
    <div v-if="isOpen">
      <span class="text-green">영업중</span> · 영업종료시간 : {{ stringfyTime(noticeTime) }}
    </div>
    <div v-else>
      <span class="text-red">영업종료</span> · 영업시작시간 : {{ noticeDay }}요일
      {{ stringfyTime(noticeTime) }}
    </div>
    <!-- <div>
      {{ calcNowTime }}
    </div> -->

    <!-- {{ operatingTime }} -->

    <!-- 0~6 오늘의 요일 받고
    operatingTime을 받고

    operatingTime이 없으면
    정보없음으로 return
    
    operatingTime이 있으면
    해당 인덱스로 가서 영업시간 확인하고
    영업중 >>  종료시간
    영업종료 >> 다음 영업시작 시간 확인 -->
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
