const fs = require("fs");
const axios = require("axios");
const ical = require("node-ical");

const DAY_LENGTH = 1000 * 60 * 60 * 24;

function get_calender_url() {
  const current_year = new Date().getFullYear();

  return `https://www.scasd.org/site/UserControls/Calendar/EventExport.aspx?ModuleInstanceID=4058&StartDate=${
    current_year - 1
  }-08-01&EndDate=${current_year}-06-30`;
}

// https://www.scasd.org/districtcalendar#calendar4058/20220409/month
const CALENDER_URL = get_calender_url();

(async function () {
  const response = axios.get(CALENDER_URL);
  const data_str = (await response).data;

  const events = ical.sync.parseICS(data_str);

  let simplified_data = {
    first_day: undefined,
    last_day: undefined,
    no_school: [],
  };
  for (const pid in events) {
    const { summary, start, end } = events[pid];

    if (!start || !end || typeof summary.val != "string") {
      continue;
    }

    if (summary.val == "First Day of School") {
      simplified_data.first_day = start.getMonth() + ";" + start.getDate();
      continue;
    }

    if (summary.val == "Last Day of School") {
      simplified_data.last_day = start.getMonth() + ";" + start.getDate();
      continue;
    }

    if (summary.val.includes("No School")) {
      const start_date = Date.parse(start),
        end_date = Date.parse(end);

      for (
        let curr_date = start_date;
        curr_date < end_date;
        curr_date += DAY_LENGTH
      ) {
        const date = new Date(curr_date);
        // console.log(summary.val, curr_date, date);

        simplified_data.no_school.push(date.getMonth() + ";" + date.getDate());
      }
    }
  }

  if (!simplified_data.first_day || !simplified_data.last_day) {
    throw new Error("Unable to find the First/Last days");
  }

  fs.writeFileSync(
    "src/calender.json",
    JSON.stringify(simplified_data, null, 4)
  );
  console.log("Saved", simplified_data.no_school.length, "events");
})();
