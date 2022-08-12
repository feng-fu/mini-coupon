
//app.js
import env from "./env";
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true,
      });
    }
    const info = wx.getSystemInfoSync();
    const buttonInfo = wx.getMenuButtonBoundingClientRect();

    const navbarHeight = (buttonInfo.top - info.statusBarHeight) * 2 + buttonInfo.height + info.statusBarHeight;
    const menuBotton = buttonInfo.top - info.statusBarHeight;
    const menuHeight = buttonInfo.height;
    this.globalData.navbarHeight = navbarHeight;
    this.globalData.menuBotton = menuBotton;
    this.globalData.menuHeight = menuHeight;
  },
  globalData: {
    navbarHeight: 0,
    menuBotton: 0,
    menuHeight: 0,
  },
})