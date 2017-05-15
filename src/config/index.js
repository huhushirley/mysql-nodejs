import configJS from './config.js';
const env = process.env.NODE_ENV;
const common = {
  port: 3010,
  wechat: {
    appId: 'wx788ec61e576ff25b',
    secret: 'f2c97259acac7232e8c5d19d4dc0cda2',
  },
};
// other configjs
const config = {
  development: { baseUrl: 'http://localhost:3010' },
  production: {baseUrl: 'http://139.224.16.98:3006', port: 3006},
  test: {}
};
console.log(config);
// db config
config[env].mysql = configJS[env];
export default Object.assign(common, config[env]);
