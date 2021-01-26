/**
 * 默认配置
 */
export interface DefaultConfig {
  appName: string;
  enableVConsole: boolean;
  authorityKey: string;
  enableSentry: boolean;
}

const appConfig: DefaultConfig = {
  appName: '', // 项目title
  enableVConsole: true, // 开启vconsole
  authorityKey: '',
  enableSentry: true,
};

export default appConfig;
