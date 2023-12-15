function timeLog() {
  // สร้าง Date object
  const currentDate = new Date();

  // กำหนด timezone (เช่น 'Asia/Bangkok' หรือ 'America/New_York')
  const timeZone = 'Asia/Bangkok';

  // กำหนด options สำหรับการแสดงผลวันเวลา
  const options = {
    timeZone: timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // ให้แสดงรูปแบบ 24 ชั่วโมง
  };

  // ใช้ Intl.DateTimeFormat เพื่อจัดรูปแบบวันเวลา
  const formatter = new Intl.DateTimeFormat('en-GB', options);

  // แปลง Date object เป็น string ที่มีรูปแบบวันเวลาตามที่กำหนด
  const formattedDate = formatter.format(currentDate);

  // แสดงผลที่ console
  // console.log(`Current Date and Time: ${formattedDate}`);
  // return `Current Date and Time: ${formattedDate}`
  return `[${formattedDate}] `
}

module.exports = timeLog;