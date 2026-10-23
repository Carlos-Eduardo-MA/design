export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PUBLIC_URL = process.env.PUBLIC_URL || "";

export const getProjectImageUrl = (imageUrl) =>
  imageUrl.startsWith("/") && !imageUrl.startsWith("//")
    ? `${PUBLIC_URL}${imageUrl}`
    : imageUrl;

export const ADMIN_TOKEN_KEY = "bia_admin_token";

export const WHATSAPP_URL =
  "https://wa.me/5524999998186?text=" +
  encodeURIComponent(
    "Olá, Bia! Vim pelo seu site e gostaria de conversar sobre um projeto de branding."
  );
