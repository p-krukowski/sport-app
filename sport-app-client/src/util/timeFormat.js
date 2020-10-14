const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export function dateTimeToWords(dateTime) {
  const date = new Date(dateTime);
  let now = new Date();
  let yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  let datesDifference = now - date;

  if (datesDifference > YEAR) {
    const years = Math.floor(datesDifference/YEAR);
    return yearsService(years);
  } else if (datesDifference > MONTH) {
    const months = Math.floor(datesDifference/MONTH);
    return monthsService(months);
  } else if (datesDifference > WEEK) {
    const weeks = Math.floor(datesDifference/WEEK);
    return weeksService(weeks);
  } else if (datesDifference > DAY) {
    const days = Math.floor(datesDifference/DAY);
    return daysService(days);
  } else if (yesterday.getDate() === date.getDate()) {
    return "wczoraj";
  } else if (datesDifference > HOUR) {
    const hours = Math.floor(datesDifference/HOUR);
    return hoursService(hours);
  } else if (datesDifference > MINUTE) {
    const minutes = Math.floor(datesDifference/MINUTE);
    return minutesService(minutes);
  } else if (datesDifference > SECOND) {
    const seconds = Math.floor(datesDifference/SECOND);
    return secondsService(seconds);
  }
  return "sekundę temu";
}

function yearsService(years) {
  if (years === 1) {
    return "ponad rok temu";
  } else if (years < 5) {
    return "ponad " + years + " lata temu";
  } else {
    return "ponad " + years + " lat temu";
  }
}

function monthsService(months) {
  if (months === 1) {
    return "ponad miesiąc temu";
  } else {
    return "ponad " + months + " mies. temu";
  }
}

function weeksService(weeks) {
  if (weeks === 1) {
    return "ponad tydzień temu";
  } else {
    return "ponad " + weeks + " tyg. temu";
  }
}

function daysService(days) {
  if (days === 1) {
    return "przedwczoraj";
  } else {
    return "ponad " + days + " dni temu";
  }
}

function hoursService(hours) {
  if (hours === 1) {
    return "ponad godzinę temu";
  } else {
    return "ponad " + hours + " godz. temu";
  }
}

function minutesService(minutes) {
  if (minutes === 1) {
    return "ponad minutę temu";
  } else {
    return "ponad " + minutes + " min. temu";
  }
}

function secondsService(seconds) {
  if (seconds === 1) {
    return "ponad sekundę temu";
  } else if (seconds < 5) {
    return "ponad " + seconds + " sekundy temu";
  } else {
    return "ponad " + seconds + " sekund temu";
  }
}