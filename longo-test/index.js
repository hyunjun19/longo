'use strict';

const _     = require('lodash');
const rp    = require('request-promise');
const async = require('async');

const loopCnt = 1000;
let startTime = new Date();

_.times(loopCnt, (idx) => {
    rp({
        uri   : 'http://localhost:3001/logger/user-request-log',
        method: 'POST',
        data  : 'host=localhost&uri=/deals/924&method=GET&queryParameter=utm_source=sns&utm_medium=naverpost&utm_campaign=0623_924&status=200&os=Android 5.x&device=Mobile&browser=Chrome Mobile&browserVersion=44.0.2403.133&headerMap={x-real-ip=14.63.233.27, x-scheme=https, cookie=_gat=1; g_f_l_n_p="https://www.thegajago.com/?utm_source=sa&utm_medium=naver&utm_campaign=M_brand_maintitle"; s_s_r_m=Mzc2MjQ5OjE0NzA2NDM2MDAwMTU6ZjVkZDgxZGRjNjk0ZGE2ZjFkN2VmZTI0N2E4ZGE3NDQ; SESSION=347aa8e3-b35b-463a-94b4-7aa3cdab14a6; utm_campaign_param=%3Futm_source%3Dsa%26utm_medium%3Dnaver%26utm_campaign%3DM_brand_maintitle; _ga=GA1.2.1056230286.1462630223; s_u_k=4b82327f-0a04-4806-9c54-671f4c8b2066; wcs_bt=s_150c88dccf1d:1467965261; last-deal-view=/deals/7530, x-forwarded-proto=https, x-forwarded-host=www.thegajago.com, x-forwarded-server=www.thegajago.com, x-forwarded-ssl=on, host=www.thegajago.com, connection=close, accept=*/*, x-requested-with=XMLHttpRequest, user-agent=Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-N916L Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36, content-type=application/json, referer=https://www.thegajago.com/deals/7530, accept-encoding=gzip, deflate, sdch, accept-language=ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4}&parameterMap={foo=1}&userId=-1&requestElapsedTime=220&requestDateTime=20160708170739&sessionKey=4b82327f-0a04-4806-9c54-671f4c8b2066&referer=https://www.thegajago.com/deals/7530'
    })
    .then(()=>{
        if (loopCnt == (idx + 1)) {
            let finishTime = new Date();
            let ellapsedTime = finishTime - startTime;
            console.log(`${loopCnt} Ellapsed time: ${ellapsedTime}ms`);
        }
    })
    .catch((err) => {
        console.error(`[${idx}] `, err);
    });
});
