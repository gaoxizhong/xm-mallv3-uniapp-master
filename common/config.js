import util from '@/common/we7_js/util.js'
module.exports = {
  getConf: function (t) {
    var e = uni.getStorageSync("appConfig");
    for (var o in e)
    {
     if (o == t) 
     { 
       return e[o];
     }
     }
  },
  init: function (e) {
    util.request({
      url: "entry/wxapp/config",
      success: function (t) {
        uni.setStorageSync("appConfig", t.data.data), "function" == typeof e && e();
      }
    });
  },
};