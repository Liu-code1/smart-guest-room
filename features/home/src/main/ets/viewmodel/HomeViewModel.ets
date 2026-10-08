import type { RoomStateInfo, AirConditionerInfo } from '../model/HomeModel';

/**
 * 首页视图模型（V2响应式版本）
 *
 * 负责管理首页的业务逻辑和状态，包括：
 * - 空调控制（开关、温度调节、模式切换、风速调节）
 * - 场景模式切换（通过AppStorage与LightViewModel协作）
 * - 快捷服务控制（请勿打扰、清理房间）
 * - 晚安模式（一键关闭所有灯光）
 */
@ObservedV2
export class HomeViewModel {
  // ==================== 响应式状态变量 ====================

  /**
   * 房间状态模型
   * 包含房间号、酒店名称和空调设备信息
   */
  @Trace roomState: RoomStateInfo = {
    room_number: '',
    hotel_name: '',
    airConditioners: []
  };

  /**
   * 当前环境温度（摄氏度）
   */
  @Trace currentTemp: number = 22;

  /**
   * 目标设定温度（摄氏度）
   */
  @Trace targetTemp: number = 22;

  /**
   * 空调开关状态
   */
  @Trace acOpen: boolean = false;

  /**
   * 空调工作模式
   * 0: 制热, 1: 制冷, 2: 送风, 3: 除湿
   */
  @Trace acMode: number = 1;

  /**
   * 空调风速档位
   * 0: 自动, 1: 低风, 2: 中风, 3: 高风
   */
  @Trace acSpeed: number = 1;

  /**
   * 晚安模式激活状态
   */
  @Trace nightModeActive: boolean = false;

  /**
   * 进入晚安模式前保存的场景模式
   */
  private previousSceneMode: string = '';

  // ==================== 初始化方法 ====================

  /**
   * 初始化房间状态
   */
  initRoomState(): void {
    // Mock数据
    const mockData: RoomStateInfo = {
      room_number: '8801',
      hotel_name: '广科未来酒店',
      airConditioners: [
        {
          currentTemp: 22,
          settingTemp: 22,
          open: 1,
          mode: 1,
          speed: 1
        }
      ]
    };

    this.roomState.room_number = mockData.room_number;

    if (mockData.airConditioners.length > 0) {
      const ac = mockData.airConditioners[0];
      this.currentTemp = ac.currentTemp;
      this.targetTemp = ac.settingTemp;
      this.acOpen = ac.open === 1;
      this.acMode = ac.mode;
      this.acSpeed = ac.speed;
    }

    const loginRoomNoVal = AppStorage.get<string>('roomNo') ?? '';
    if (loginRoomNoVal !== undefined && loginRoomNoVal !== '') {
      this.roomState.room_number = loginRoomNoVal;
    }
  }

  // ==================== 空调控制方法 ====================

  setAirConditionerTemp(temp: number): void {
    this.targetTemp = temp;
  }

  toggleAirConditioner(): void {
    this.acOpen = !this.acOpen;
    // 如果是从关闭状态打开，重置温度为22℃
    if (this.acOpen) {
      this.targetTemp = 22;
      this.currentTemp = 22;
    }
    // 同步到 AppStorage
    AppStorage.setOrCreate('airConditionerOn', this.acOpen);
    AppStorage.setOrCreate('airConditionerTemp', this.targetTemp);
  }

  /**
   * 重新加载所有状态（退出登录后重新登录时调用）
   */
  reloadState(): void {
    this.acOpen = AppStorage.get<boolean>('airConditionerOn') ?? false;
    const savedTemp = AppStorage.get<number>('airConditionerTemp') ?? 22;
    this.targetTemp = savedTemp;
    this.currentTemp = savedTemp;
    this.nightModeActive = AppStorage.get<boolean>('nightModeActive') ?? false;
  }

  setAirConditionerMode(mode: number): void {
    this.acMode = mode;
  }

  setAirConditionerSpeed(speed: number): void {
    this.acSpeed = speed;
  }

  adjustTemp(delta: number): void {
    const newTemp = this.targetTemp + delta;
    if (newTemp >= 16 && newTemp <= 30) {
      this.setAirConditionerTemp(newTemp);
    }
  }

  // ==================== 场景模式控制 ====================

  switchSceneMode(mode: string): void {
    if (this.nightModeActive) {
      this.nightModeActive = false;
      AppStorage.setOrCreate('nightModeActive', false);
    }
    AppStorage.setOrCreate('currentSceneMode', mode);
  }

  // ==================== 快捷服务控制 ====================

  toggleService(service: string): void {
    if (service === '请勿打扰') {
      const current = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
      AppStorage.setOrCreate('doNotDisturbActive', !current);
    } else if (service === '清理房间') {
      const current = AppStorage.get<boolean>('cleanRoomActive') ?? false;
      AppStorage.setOrCreate('cleanRoomActive', !current);
    }
  }

  // ==================== 晚安模式控制 ====================

  toggleNightMode(): void {
    this.nightModeActive = !this.nightModeActive;

    if (this.nightModeActive) {
      this.previousSceneMode = AppStorage.get<string>('currentSceneMode') ?? '';
      AppStorage.setOrCreate('currentSceneMode', '');
      AppStorage.setOrCreate('nightModeActive', true);
    } else {
      AppStorage.setOrCreate('currentSceneMode', this.previousSceneMode);
      AppStorage.setOrCreate('nightModeActive', false);
    }
  }
}