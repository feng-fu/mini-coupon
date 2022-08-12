Page({
    data: {
        coupons: [],
        backgroundColor: '#ea5133'
    },
    getAllCoupons: function() {
        wx.showLoading({
          title: '加载中...',
        });
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
            imageUrl: 'cloud://online-8a94o.6f6e-online-8a94o-1301922245/share.jpg',
        }
    },
    onShareMessageToFriend: function() {

    },
    onLoad() {
        this.getAllCoupons();
    },
});