Page({
    data: {
        coupons: [],
        backgroundColor: '#ea5133'
    },
    getAllCoupons: function() {
        wx.showLoading({
          title: '加载中...',
        })
        wx.cloud.callFunction({
            name: 'coupons',
        })
            .then(({ result }) => {
                wx.hideLoading();
                this.setData({
                    coupons: result.coupons || [],
                    backgroundColor: result.backgroundColor || this.data.backgroundColor,
                })
            })
            .catch(ex => {
                wx.hideLoading();
            })
    },
    handleJump: function(e) {
        const index =  e.currentTarget.dataset.index;
        const current = this.data.coupons[index];
        wx.navigateToMiniProgram({
          appId: current.appId,
          path: current.path,
        });
    },
    onShareAppMessage: function() {
        return {
            title: '先领红包，再点外卖',
            imageUrl: 'cloud://prod-3f3ad5.7072-prod-3f3ad5-1258496121/share.jpg',
        }
    },
    onShareMessageToFriend: function() {

    },
    onLoad() {
        this.getAllCoupons();
    },
});