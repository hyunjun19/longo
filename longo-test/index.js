'use strict';

const _     = require('lodash');
const rp    = require('request-promise');
const async = require('async');

const loopCnt = 100;

setInterval(()=>{
    let startTime = new Date();
    _.times(loopCnt, (idx) => {
        rp({
            uri   : 'http://220.70.71.58:10390/logger/user-request-log',
            // uri   : 'http://localhost:10390/logger/user-request-log',
            header: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            json  : {
                "host": "asp-dev.thegajago.com:3036",
                "uri": "/api/v1/js/categories/deal",
                "method": "GET",
                "queryParameter": null,
                "status": "200",
                "os": "Mac OS X",
                "device": "Computer",
                "browser": "Chrome",
                "browserVersion": "52.0.2743.116",
                "headerMap": {
                    "cookie": "_hjIncludedInSample=1; utm_campaign_param=%3Futm%3Dranking%26loc%3D1; g_f_a_p=\"Hf8Qi172YNvYMOaFnfABM68V2sHXdrDc9hZIUfh08RcUTno1YniPNfzLOrP895LzNu9m7p0FFitqqfc1eIfWFw==\"; g_f_l_n_p=\"http://asp-dev.thegajago.com:3036/deals/301\"; s_s_r_m=Mzg1MzA4OjE0NzQ3NzEzMjU4Njc6YTNkYjIzNzljZTBlNzI4NjU0NDg2MGVmNzM0YTgxNzg; SESSION=d3eb91f9-c65c-4fc7-821f-5e01303b3080; last-deal-view=/deals/301; _ga=GA1.2.519828443.1464314154; wcs_bt=s_150c88dccf1d:1472129707; s_u_k=38f35d3e-be60-4f66-9d08-755379e6448a",
                    "accept-language": "ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4",
                    "accept-encoding": "gzip, deflate, sdch",
                    "referer": "http://asp-dev.thegajago.com:3036/order/1000387/new",
                    "dnt": "1",
                    "accept": "*/*",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36",
                    "connection": "keep-alive",
                    "host": "asp-dev.thegajago.com:3036"
                },
                "parameterMap": null,
                "userId": 385308,
                "referer": "http://asp-dev.thegajago.com:3036/order/1000387/new",
                "requestElapsedTime": null,
                "requestDateTime": "20160825215511",
                "sessionKey": "38f35d3e-be60-4f66-9d08-755379e6448a"
            }
        })
        .then(()=>{
            if (loopCnt == (idx + 1)) {
                let finishTime = new Date();
                let elapsedTime = finishTime - startTime;
                console.log(`loopCount: ${loopCnt}\nElapsed time: ${elapsedTime / loopCnt}ms per request`);
            }
        })
        .catch((err) => {
            console.error(`[${idx}] `, err);
        });
    });
}, 1000);