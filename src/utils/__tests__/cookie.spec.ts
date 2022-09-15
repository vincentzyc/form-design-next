import { later } from "@/test";
import { setCookie, getCookie, delCookie } from "../cookie";

test("setCookie getCookie", () => {
  const mockId = "cookie";
  const mockData = "cookie data";
  setCookie(mockId, mockData, 2);
  expect(getCookie(mockId)).toEqual(mockData);
});

test("delCookie", async () => {
  const mockId = "cookie";
  const mockData = "cookie data";
  setCookie(mockId, mockData, 1);
  await later()
  delCookie(mockId)
  expect(getCookie(mockId)).toEqual('');
});