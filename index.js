const fetch = require('node-fetch'); // ใช้ fetch สำหรับส่งต่อข้อมูล

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbzwlRW4Wi8vz5_3hg15OKixe_erIQB20cjS86QC-uPywDWAcUOB5sPzgQ-8pKEygyc6Lw/exec';

      // ส่งข้อมูล POST ต่อไปที่ Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();

      res.status(200).send(text); // ตอบกลับ LINE ทันทีแบบ 200
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
