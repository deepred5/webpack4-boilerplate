const shouldProxy = process.env.PROXY === 'true';

const proxy = {
  '/api': {
    target: 'https://anata.me', // 后端地址
    changeOrigin: true,
    secure: false,
  },
}

module.exports = (!shouldProxy ? {} : proxy);