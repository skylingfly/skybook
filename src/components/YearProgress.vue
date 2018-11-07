<template>
  <div class="progressbar">
    <progress :percent="percent"  activeColor = '#EA5A49' backgroundColor='#59a45f'/>
    <p>{{year}}已经过去{{days}}天/{{percent}}%</p>
  </div>
</template>
<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start为今年的第一天
      let offset = new Date().getTime() - start.getTime()
      // 现在的时间戳
      return parseInt(offset / 1000 / 3600 / 24) + 1
    },
    percent () {
      const data = (this.days * 100 / this.getDayofYead()).toFixed(2)
      return data
    }
  },
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayofYead () {
      return this.isLeapYear() ? 366 : 365
    }

  }

}
</script>
<style scoped lang='scss'>
  p{
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    color: #959595;
    font-weight: 600;
  }
  .progressbar{
    width: 100%;
    margin: 20px 0;
    box-sizing: border-box;
    padding: 0 10px;
    progress {
      margin-bottom: 10px;
    }
  }
</style>

