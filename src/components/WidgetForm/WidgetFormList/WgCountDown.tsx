import { defineComponent, reactive, ref, watch } from "vue";

import { CountDownTypes } from "@/assets/js/widget/CountDown/CountDown"
import { isNumeric } from "@/utils/validate/number";
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default defineComponent({
  name: "WgCountDown",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { item } = reactive(props)

    const isFinished = ref(true)
    const timer = ref<NodeJS.Timer | null>(null)

    const parseTime = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })

    watch(() => item.countDownType, nval => {
      if (nval) {
        if (timer.value) clearInterval(timer.value)
        initCountDown()
      }
    })

    watch(() => item.endTime, nTime => {
      if (nTime) {
        if (timer.value) clearInterval(timer.value)
        initCountDown()
      }
    })

    function getTime(time: number) {
      const days = Math.floor(time / DAY);
      const hours = Math.floor(time % DAY / HOUR);
      const minutes = Math.floor(time % HOUR / MINUTE);
      const seconds = Math.floor(time % MINUTE / SECOND);
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };
    }
    function initEndTimeCountDown() {
      if (!isNumeric(item.endTime)) return
      isFinished.value = item.endTime < Date.now()
      if (isFinished.value) return ``
      parseTime.value = getTime(item.endTime - Date.now())
      timer.value = setInterval(() => {
        isFinished.value = item.endTime < Date.now()
        parseTime.value = getTime(item.endTime - Date.now())
      }, 1000);
    }
    function initDayLoopCountDown() {
      isFinished.value = false
      const today = new Date().toLocaleDateString()
      const todayTimeStamp = new Date(today).getTime()
      const tomorrowTimeStamp = todayTimeStamp + 24 * 60 * 60 * 1000
      parseTime.value = getTime(tomorrowTimeStamp - Date.now())
      timer.value = setInterval(() => {
        parseTime.value = getTime(tomorrowTimeStamp - Date.now())
      }, 1000);
    }
    function initCountDown() {
      switch (item.countDownType) {
        case CountDownTypes.endTime:
          initEndTimeCountDown()
          break;
        case CountDownTypes.dayLoop:
          initDayLoopCountDown()
          break;
        default:
          initEndTimeCountDown()
          break;
      }
    }
    initCountDown()
    return () => (
      <div style={{ ...item.style, backgroundImage: `url(${item.style.backgroundImage})` }} class="wg-countdown">
        <p class="flex flex-center">
          <span class="countdown-title">{item.title}</span>
          {
            isFinished.value ?
              <span class="empty-time">请选择倒计时结束时间</span> :
              <div>
                {parseTime.value.days > 0 ? <span style={item.timeStyle} class="countdown-timeblock">{parseTime.value.days}</span> : null}
                {parseTime.value.days > 0 ? <span style={item.unitStyle} class="countdown-colon">天</span> : null}
                {
                  parseTime.value.days > 0 || parseTime.value.hours > 0 ? <span
                    style={item.timeStyle}
                    class="countdown-timeblock"
                  >{parseTime.value.hours > 9 ? parseTime.value.hours : '0' + parseTime.value.hours}</span> : null
                }
                {parseTime.value.days > 0 || parseTime.value.hours > 0 ? <span style={item.unitStyle} class="countdown-colon">时</span> : null}
                {
                  parseTime.value.days > 0 || parseTime.value.hours > 0 || parseTime.value.minutes > 0 ?
                    <span
                      style={item.timeStyle}
                      class="countdown-timeblock"
                    >{parseTime.value.minutes > 9 ? parseTime.value.minutes : '0' + parseTime.value.minutes}</span> : null
                }
                {
                  parseTime.value.days > 0 || parseTime.value.hours > 0 || parseTime.value.minutes > 0 ? <span
                    style={item.unitStyle}
                    class="countdown-colon"
                  >分</span> : null
                }
                <span
                  style={item.timeStyle}
                  class="countdown-timeblock"
                >{parseTime.value.seconds > 9 ? parseTime.value.seconds : '0' + parseTime.value.seconds}</span>
                <span style={item.unitStyle} class="countdown-colon">秒</span>
              </div>
          }
        </p>
      </div>
    )
  }
})
