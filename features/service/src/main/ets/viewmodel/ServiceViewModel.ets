/**
 * 服务页面视图模型（V2响应式版本）
 *
 * 负责管理服务页面的业务逻辑和状态，包括：
 * - 请勿打扰状态管理
 * - 清理房间状态管理
 * - SOS紧急呼叫
 * - 退出登录
 */
@ObservedV2
export class ServiceViewModel {
  @Trace doNotDisturb: boolean = false;
  @Trace cleanRoom: boolean = false;

  constructor() {
    this.syncFromAppStorage();
  }

  /**
   * 从AppStorage同步状态
   */
  syncFromAppStorage(): void {
    this.doNotDisturb = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
    this.cleanRoom = AppStorage.get<boolean>('cleanRoomActive') ?? false;
  }

  /**
   * 切换请勿打扰状态
   */
  toggleDoNotDisturb(): void {
    this.doNotDisturb = !this.doNotDisturb;
    AppStorage.setOrCreate('doNotDisturbActive', this.doNotDisturb);
  }

  /**
   * 切换清理房间状态
   */
  toggleCleanRoom(): void {
    this.cleanRoom = !this.cleanRoom;
    AppStorage.setOrCreate('cleanRoomActive', this.cleanRoom);
  }

  /**
   * 触发SOS紧急呼叫
   */
  triggerSOS(): void {
    console.log('SOS紧急呼叫已触发');
  }

  /**
   * 退出登录
   * 重置所有应用状态到初始值
   */
  logout(): void {
    // 清除登录凭证
    AppStorage.setOrCreate('token', '');
    AppStorage.setOrCreate('isLoggedIn', false);

    // 重置导航状态
    AppStorage.setOrCreate('currentTabIndex', 0);

    // 重置服务页面状态
    AppStorage.setOrCreate('doNotDisturbActive', false);
    AppStorage.setOrCreate('cleanRoomActive', false);
    this.doNotDisturb = false;
    this.cleanRoom = false;

    // 重置首页状态（空调、灯光、场景模式等）
    AppStorage.setOrCreate('airConditionerOn', false);
    AppStorage.setOrCreate('airConditionerTemp', 22);
    AppStorage.setOrCreate('currentSceneMode', '');

    // 重置灯光页面状态
    AppStorage.setOrCreate('mainLightSwitch', false);
    AppStorage.setOrCreate('currentLightMode', '');

    // 重置窗帘页面状态
    AppStorage.setOrCreate('curtainLeftState', 'closed');
    AppStorage.setOrCreate('curtainRightState', 'closed');
    AppStorage.setOrCreate('windowScreeningLeftState', 'closed');
    AppStorage.setOrCreate('windowScreeningRightState', 'closed');

    // 处理记住我信息
    const isRememberMe = AppStorage.get<boolean>('rememberMe') ?? false;
    if (!isRememberMe) {
      AppStorage.setOrCreate('rememberedRoomNo', '');
      AppStorage.setOrCreate('rememberedUserName', '');
      AppStorage.setOrCreate('rememberMe', false);
    }
  }
}