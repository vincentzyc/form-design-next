import FormList from "./FormList"
import Phone from "./Phone"
import Input from "./Input"
import Checkbox from "./Checkbox"
import DatePicker from "./DatePicker"
import Select from "./Select"
import Switch from "./Switch"
import RandomCode from "./RandomCode"
import HPicker from "./HPicker"

export default [{
  name: "表单内容区",
  value: "FormList",
  dragOnce: true,
  data: FormList
}, {
  name: "手机",
  value: "phone",
  data: Phone
}, {
  name: "输入框",
  value: "Input",
  data: Input
}, {
  name: "随机码",
  value: "randomCode",
  data: RandomCode
}, {
  name: "选择框",
  value: "Checkbox",
  data: Checkbox
}, {
  name: "日期选择器",
  value: "DatePicker",
  data: DatePicker
}, {
  name: "横向滑动单选",
  value: "HPicker",
  data: HPicker
}, {
  name: "下拉选择框",
  value: "Select",
  data: Select
}, {
  name: "开关",
  value: "Switch",
  data: Switch
}]