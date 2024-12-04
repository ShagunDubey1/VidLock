import crypto from "crypto";

function generateToken(videoId: string, expires: number, securityKey: string): string {
  const data = securityKey + videoId + expires.toString();  

  const hash = crypto.createHash("sha256");
  hash.update(data);

  return hash.digest("hex");
}

export function signStreamUrl(iframeURL: string, securityKey: string): string {
  const expiration = 36; 

  const parsedURL = new URL(iframeURL);
  const segments = parsedURL.pathname.split("/");
  const videoId = segments[3];

  console.log("Video ID:", videoId);

  const expires = Math.floor(Date.now() / 1000) + expiration; // Ensure expiration is in UNIX format

  const token = generateToken(videoId, expires, securityKey);

  parsedURL.searchParams.set("token", token);
  parsedURL.searchParams.set("expires", expires.toString());

  console.log("Generated URL:", parsedURL.toString());

  return parsedURL.toString();
}
