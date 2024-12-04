import crypto from "crypto";

function generateToken(videoId: string, expires: number, securityKey: string) {
  const data = videoId + expires.toString() + securityKey;

  const hash = crypto.createHash("sha256");
  hash.update(data);

  return hash.digest("hex");
}

export function signStreamUrl(iframeURL: string, securityKey: string) {
  const expiration = 36;

  const parsedURL = new URL(iframeURL);
  const segments = parsedURL.pathname.split("/");
  const videoId = segments[3];

  const expires = Math.floor(Date.now() / 1000) + expiration;

  const token = generateToken(videoId, expires, securityKey);

  parsedURL.searchParams.set("token", token);
  parsedURL.searchParams.set("expires", expires.toString());

  return parsedURL.toString();
}