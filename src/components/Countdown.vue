<template>
  <div class="container">
    <div :class="counting_down ? 'digit-container' : 'digit-container-large'">
      <div :class="counting_down ? 'digit' : 'digit-large'">{{ days }}</div>
      <div class="label">{{ days == 1 ? "Day" : "Days" }}</div>
    </div>
    <div class="digit-container" v-if="counting_down">
      <div class="digit">{{ hours }}</div>
      <div class="label">Hours</div>
    </div>
    <div class="digit-container" v-if="counting_down">
      <div class="digit">{{ minutes }}</div>
      <div class="label">Minutes</div>
    </div>
    <div class="digit-container" v-if="counting_down">
      <div class="digit">{{ seconds }}</div>
      <div class="label">Seconds</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import calender from "@/calender.json";
const { first_day, last_day, no_school } = calender;

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SCHOOL_YEAR_START = new Date(
  2021,
  parseInt(first_day.split(";")[0]),
  parseInt(first_day.split(";")[1]),
  8,
  40
);
const SCHOOL_YEAR_END = new Date(
  2022,
  parseInt(last_day.split(";")[0]),
  parseInt(last_day.split(";")[1]),
  11,
  40
);

// NOTE: The years are automatically updated to be curr-1 and curr respectively

function during_school_year(current: Date): boolean {
  SCHOOL_YEAR_START.setFullYear(current.getFullYear() - 1);
  SCHOOL_YEAR_END.setFullYear(current.getFullYear());

  return (
    SCHOOL_YEAR_START.getTime() <= current.getTime() &&
    current.getTime() <= SCHOOL_YEAR_END.getTime()
  );
}

function during_school_day(current: Date): boolean {
  if (!is_school_day(current)) {
    return false;
  }

  if (
    SCHOOL_YEAR_START.getHours() > current.getHours() ||
    current.getHours() > SCHOOL_YEAR_END.getHours()
  ) {
    return false;
  }

  if (SCHOOL_YEAR_START.getHours() == current.getHours()) {
    if (current.getMinutes() < SCHOOL_YEAR_START.getMinutes()) {
      return false;
    }
  }
  if (SCHOOL_YEAR_END.getHours() == current.getHours()) {
    if (current.getMinutes() >= SCHOOL_YEAR_END.getMinutes()) {
      return false;
    }
  }

  return true;
}

function is_school_day(current: Date): boolean {
  const test_str = current.getMonth() + ";" + current.getDate();
  return (
    current.getDay() != 0 &&
    current.getDay() != 6 &&
    !no_school.includes(test_str)
  );
}

function time_until_end_of_day(
  remaining: TimeRemaining,
  current: Date,
  end_of_day: Date
) {
  if (during_school_day(current)) {
    let difference = Math.floor(
      (end_of_day.getTime() - current.getTime()) / 1000
    );

    remaining.hours += Math.floor(difference / (60 * 60));
    difference -= remaining.hours * 60 * 60;

    remaining.minutes += Math.floor(difference / 60);
    difference -= remaining.minutes * 60;

    remaining.seconds += difference;
  }
}

function time_remaining(current: Date): TimeRemaining {
  if (!during_school_year(current)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let remaining: TimeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const start_of_day = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      SCHOOL_YEAR_START.getHours(),
      SCHOOL_YEAR_START.getMinutes(),
      SCHOOL_YEAR_START.getSeconds()
    ),
    end_of_day = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      SCHOOL_YEAR_END.getHours(),
      SCHOOL_YEAR_END.getMinutes(),
      SCHOOL_YEAR_END.getSeconds()
    );

  if (is_school_day(current)) {
    time_until_end_of_day(remaining, current, end_of_day);
  }

  const days_until_school_end = Math.ceil(
    (SCHOOL_YEAR_END.getTime() - end_of_day.getTime()) / (1000 * 60 * 60 * 24)
  );

  for (let i = 1; i <= days_until_school_end; i++) {
    const check_date = new Date(current.getTime() + i * (1000 * 60 * 60 * 24));
    if (is_school_day(check_date)) {
      remaining.days++;
    }
  }

  if (start_of_day.getTime() > current.getTime()) {
    remaining.days++;
  }

  return remaining;
}

@Component
export default class Countdown extends Vue {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  counting_down = true;

  interval = 0;

  mounted() {
    this.days = time_remaining(new Date()).days;
    this.update_time();
    this.interval = window.setInterval(this.update_time, 1000);
  }

  destroyed() {
    window.clearInterval(this.interval);
  }

  update_time() {
    const current_date = new Date();
    this.counting_down = during_school_day(current_date);

    ({
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    } = time_remaining(current_date));
  }
}
</script>

<style scoped>
.container {
  display: flex;

  text-align: center;

  width: 80%;
  min-width: 300px;
}

.digit-container {
  border-style: solid;
  padding: 10px;
  width: 25%;
}

.digit-container-large {
  margin: auto;

  border-style: solid;
  padding: 10px;
}

.digit {
  font-weight: 300;
  font-size: 7vw;
}

.digit-large {
  font-weight: 300;
  font-size: 28vw;
}
</style>
