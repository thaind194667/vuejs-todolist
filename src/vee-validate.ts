import { defineRule, configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: true,
});
import {
  required,
  email,
  min,
  regex,
  max,
  confirmed,
  numeric,
  is,
  url,
  max_value,
  min_value
} from "@vee-validate/rules";
import moment from 'moment'
// import _ from "lodash";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("min_value", min_value);
defineRule("regex", regex);
defineRule("confirmed", confirmed);
defineRule("is", is);
defineRule("numeric", numeric);
defineRule("max_value", max_value);
defineRule("url", url);

// defineRule("max_value", (value: any, [value2]: any)  => {
//   let num = value;
//   if (value && _.isString(value) && value.indexOf(',') > -1) {
//     num = Number((value as any).replace(/\D/g, ""))
//   }
//   if (num > value2) {
//     return "価格は"+ value2 +"以下でなければなりません"
//   }
//   return true;
// });

defineRule("minDate", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "当落発表の終了日が不正です。";
  }
  return true;
});

defineRule("minDate", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "当落発表の終了日が不正です。";
  }
  return true;
});

defineRule("maxDate", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') >= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "当落発表の終了日が不正です。";
  }
  return true;
});

defineRule("minTime", (value: any, value2: any) => {
  if (moment(value).isBefore(moment(value2[0]).add(1, 'minutes'))) {
    return "公開期間の開始日が不正です。";
  }
  return true;
});

defineRule("minTimeOpenEnd", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "公開期間の終了日が不正です。";
  }
  return true;
});

defineRule("minTimeApplyStart", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "申し込み期間の開始日が不正です。";
  }
  return true;
});

defineRule("maxTimeApplyEnd", (value: any, [value2]: any) => {
if (moment(value).format('YYYY-MM-DD HH:mm') >= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "申し込み期間の終了日が不正です。";
  }
  return true;
});

defineRule("maxTimeApplyStart", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "申し込み期間の開始日が不正です。";
  }
  return true;
});

defineRule("minTimeApplyEnd", (value: any, [value2]: any) => {
  if (moment(value).format('YYYY-MM-DD HH:mm') <= moment(value2).format('YYYY-MM-DD HH:mm')) {
    return "申し込み期間の終了日が不正です。";
  }
  return true;
});

defineRule("hasNumber", (value: any) => {
  if(/\d/.test(value))  {
		return "Title cannot have numbers!"
	}

  return true;
});
