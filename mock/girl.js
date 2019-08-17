module.exports = {
  'GET /api/girls': (req, res) => {
    return res.json({
      code: 0,
      data: [
        {
          name: '贞德',
          BWH: '85 59 86'
        },
        {
          name: '阿斯托尔福',
          BWH: '71 59 73'
        }
      ],
      message: 'prpr'
    });
  },
}