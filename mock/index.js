const delay = require('mocker-api/utils/delay');
const girl = require('./girl');
const noNO_MOCK = process.env.NO_MOCK === 'true';

const proxy = {
  'GET /api/user': (req, res) => {
    return res.json({
      code: 0,
      data: {
        name: 'deepred5'
      },
      message: 'success'
    });
  },
  ...girl,
}

module.exports = (noNO_MOCK ? {} : delay(proxy, 1000));