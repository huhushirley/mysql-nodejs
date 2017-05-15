import config from 'config';
import rp from 'request-promise';
import log from 'log';

// 根据code获取openid
export async function getOpenid(code) {
  const options = {
    uri: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    qs: {
      appid: config.wechat.appId,
      secret: config.wechat.secret,
      code,
      grant_type: 'authorization_code',
    },
    json: true,
  };
  try {
    const result = await rp(options);
    if (result.errcode) {
      throw new Error(result.errmsg);
    }
    return result.openid;
  } catch (err) {
    log.error(err);
    throw err;
  }
}
