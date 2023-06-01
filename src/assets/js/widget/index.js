import Agreement from './Agreement';
import Button from './Button';
import Form from './Form';
import Image from './Image';
import Marquee from './Marquee';
import Assist from './Assist';
import StaticText from './StaticText';
import Wechat from './Wechat';
import Video from './Video';
import Sms from './Sms';
import Tabs from './Tabs';
import CountDown from './CountDown';
import CustomWidget from './CustomWidget';

// 组件的type字段对应示意图片文件名 （大驼峰命名）

export default [
  {
    name: '表单',
    value: 'Form', // 对应同级组件文件夹名，下同。 （命名方式: 大驼峰命名）
    data: Form,
  },
  {
    name: '按钮',
    value: 'Button',
    data: Button,
  },
  {
    name: '图片',
    value: 'Image',
    data: Image,
  },
  {
    name: '视频',
    value: 'Video',
    data: Video,
  },
  {
    name: '文本',
    value: 'StaticText',
    data: StaticText,
  },
  {
    name: '短信',
    value: 'Sms',
    data: Sms,
  },
  {
    name: '微信',
    value: 'Wechat',
    data: Wechat,
  },
  {
    name: '用户协议',
    value: 'Agreement',
    data: Agreement,
  },
  {
    name: '跑马灯',
    value: 'Marquee',
    data: Marquee,
  },
  {
    name: 'Tabs标签',
    value: 'Tabs',
    data: Tabs,
  },
  {
    name: '倒计时',
    value: 'CountDown',
    data: CountDown,
  },
  {
    name: '辅助类',
    value: 'Assist',
    data: Assist,
  },
  {
    name: '自定义组件',
    value: 'CustomWidget',
    data: CustomWidget,
  },
];
