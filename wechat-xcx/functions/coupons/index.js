const cloud = require('wx-server-sdk');
cloud.init();

function randomNum(m,n){
  var num = Math.floor(Math.random()*(m - n) + n);
  return num;
};

const getCoupons = () => [
  {
    title: '饿了么餐饮红包',
    appId: 'wxece3a9a4c82f58c9',
    label: `今日仅剩${randomNum(1, 108)}张`,
    path: 'taoke/pages/shopping-guide/index?scene=QQEOVmu',
    money: '66',
    type: 'money',
    color: '#0099ff',
    logo: 'cloud://prod-3f3ad5.7072-prod-3f3ad5-1258496121/ele-logo.png',
  },
  {
    title: '饿了么大额满减券',
    appId: 'wxece3a9a4c82f58c9',
    label: `今日仅剩${randomNum(1, 108)}张`,
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
    logo: 'cloud://prod-3f3ad5.7072-prod-3f3ad5-1258496121/mt-logo.png'
  },
];

exports.main = async () => {
	return {
    coupons: getCoupons(),
	};
};
