"use client";

export const setCookie = (name: string, value: string) => {
  // For client-side cookie setting
  document.cookie = `${name}=${value}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
