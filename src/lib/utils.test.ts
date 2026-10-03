import { expect, test } from "vite-plus/test";
import { cn, hostname, initials } from "./utils";

test("cn merges tailwind classes correctly", () => {
  expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");
  expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  expect(cn("bg-white", { "bg-black": true })).toBe("bg-black");
  expect(cn("bg-white", { "bg-black": false })).toBe("bg-white");
});

test("initials builds a two-letter monogram from the brand name", () => {
  expect(initials("Aditya Mer")).toBe("AM");
  expect(initials("  studio ")).toBe("S");
  expect(initials("Northwind Data Labs")).toBe("ND");
});

test("hostname strips protocol, www and trailing slash", () => {
  expect(hostname("https://www.youniqueindia.co.in/")).toBe("youniqueindia.co.in");
  expect(hostname("https://iascc.in")).toBe("iascc.in");
});
