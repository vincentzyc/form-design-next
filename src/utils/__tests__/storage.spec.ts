import { setLocalStorage, getLocalStorage,setSessionStorage,getSessionStorage } from "../storage";

test("data is added into local storage", () => {
  const mockId = "local";
  const mockJson = { data: "local json data" };
  setLocalStorage(mockId, mockJson);
  expect(getLocalStorage(mockId)).toEqual(mockJson);
});

test("data is added into local storage", () => {
  const mockId = "session";
  const mockJson = { data: "session json data" };
  setSessionStorage(mockId, mockJson);
  expect(getSessionStorage(mockId)).toEqual(mockJson);
});