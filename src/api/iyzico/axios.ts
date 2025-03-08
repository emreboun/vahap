import axios, { AxiosInstance } from "axios";
import crypto from "crypto";
import { encode } from "base-64";
import { iyzicoConfig } from "@/config";

const { url, secretKey, apiKey } = iyzicoConfig;

export function generateAuthorizationString(
  uriPath: string,
  requestData: any = ""
): string {
  const randomKey = Date.now().toString();
  const payload = `${randomKey}${uriPath}${JSON.stringify(requestData)}`;
  const encryptedData = crypto
    .createHmac("sha256", secretKey)
    .update(payload)
    .digest("hex");

  const authorizationString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${encryptedData}`;
  const base64EncodedAuthorization = encode(authorizationString);

  return `IYZWSv2 ${base64EncodedAuthorization}`;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const uriPath = config.url || "";
  const requestData = config.data || "";
  config.headers["Authorization"] = generateAuthorizationString(
    uriPath,
    requestData
  );
  config.headers["x-iyzi-rnd"] = Date.now().toString();
  return config;
});

export default apiClient;
