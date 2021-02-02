// 判断当前是哪个环境
export const currentEnv = process.env.FIG_ENV;
const ctext = currentEnv !== "prod" ? `开课吧${currentEnv}` : "开课吧";
console.log(currentEnv, 999);
// 不要删除，用来识别当前项目环境
console.log(
  `\n %c ${ctext} %c https://kaikeba.com \n`,
  "color: #fff; background: #03a8e8; padding:5px 0; font-size:12px;font-weight: bold;",
  "background: #03a8e8; padding:5px 0; font-size:12px;"
);

export const isDevEnv = currentEnv === "dev";
export const isPreEnv = currentEnv === "pre";
export const isTestEnv = currentEnv === "test";
export const isProdEnv = currentEnv === "prod";
export const SENTRY_DSN = `https://b230aa0f62684661963e5cc267184dcd@am.kaikeba.com/48`;
export const getApiTestfix = `https://${
  currentEnv === "dev" ? "test" : ""
}marvel-api-console.kaikeba.cn/admin`;
export const apiBaseUrl = `${getApiTestfix}`;
export const ddhttpurl = `https://kmos-api${
  currentEnv === "dev" ? "-test" : ""
}.kaikeba.com`;
