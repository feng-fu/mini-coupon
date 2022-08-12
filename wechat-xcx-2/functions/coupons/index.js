const cloud = require('wx-server-sdk');
cloud.init();

const coupons = [
  {
    title: '饿了么餐饮红包',
    appId: 'wxece3a9a4c82f58c9',
    label: '今日仅剩108张',
    path: 'taoke/pages/shopping-guide/index?scene=QQEOVmu',
    money: '66',
    type: 'money',
    color: '#0099ff',
    logo: 'cloud://online-8a94o.6f6e-online-8a94o-1301922245/ele-logo.png',
  },
  {
    title: '饿了么大额满减券',
    appId: 'wxece3a9a4c82f58c9',
    label: '今日仅剩66张',
		path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/TB70oYu',
    money: '31',
    color: '#0099ff',
    type: 'money',
  },
  {
    title: '美团外卖券',
    appId: 'wxde8ac0a21135c07d',
    label: '先领券再下单',
    money: '66',
    color: '#fa0018',
    type: 'money',
    logo: 'cloud://online-8a94o.6f6e-online-8a94o-1301922245/mt-logo.png'
  },
];

exports.main = async () => {
	return {
    coupons,
	};
};
