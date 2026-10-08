// 导入灯光信息模型
import { LightInfo } from '../model/LightModel';

/**
 * 房间状态信息类（V2响应式版本 - 内部类）
 *
 * 包含房间内所有灯光设备的列表
 * 使用@ObservedV2和@Trace实现响应式数据绑定
 */
@ObservedV2
class RoomStateInfo {
  @Trace lights: LightInfo[] = [];  // 灯光设备列表
}

/**
 * 灯光视图模型（V2响应式版本 - 单例模式）
 *
 * 负责管理所有灯光相关的业务逻辑和状态，包括：
 * - 单个灯光开关控制
 * - 灯光场景模式切换（明亮、柔和、阅读、温馨、睡眠）
 * - 总开关控制（一键开/关所有灯光）
 * - 晚安模式（睡眠模式特殊处理）
 *
 * 使用单例模式确保全局只有一个灯光控制实例
 * 使用@ObservedV2和@Trace实现响应式数据绑定，UI可自动更新
 *
 * @example
* ```ts
 * // 获取单例实例
 * const viewModel = LightViewModel.getInstance();
 *
 * // 控制单个灯光
 * viewModel.toggleLightByIndex(0);
 *
 * // 切换到明亮模式
 * viewModel.setLightMode(0);
 *
 * // 总开关
 * viewModel.toggleMainSwitch();
 * ```
 */
@ObservedV2
export class LightViewModel {
  // ==================== 单例模式 ====================
  private static instance: LightViewModel;  // 静态实例，存储唯一的LightViewModel对象

  /**
   * 获取LightViewModel单例实例
   * 使用懒加载方式，仅在首次调用时创建实例
   *
   * @returns {LightViewModel} 灯光视图模型的唯一实例
   */
  static getInstance(): LightViewModel {
    if (!LightViewModel.instance) {
      LightViewModel.instance = new LightViewModel();
    }
    return LightViewModel.instance;
  }

  // ==================== 响应式状态变量 ====================

  /**
   * 房间状态模型
   * 包含所有灯光设备的列表
   */
  @Trace roomState: RoomStateInfo = { lights: [] };

  /**
   * 当前选中的场景模式索引
   * -1: 未选中任何模式
   * 0: 明亮模式, 1: 柔和模式, 2: 阅读模式, 3: 温馨模式, 4: 睡眠模式
   */
  @Trace selectedModeIndex: number = -1;

  /**
   * 总开关状态
   * true: 总开关开启（所有灯光点亮）
   * false: 总开关关闭（所有灯光关闭）
   */
  @Trace mainSwitchOn: boolean = false;

  /**
   * 初始化标志
   * 防止重复初始化房间状态
   */
  private initialized: boolean = false;

  // ==================== 私有构造函数 ====================

  /**
   * 私有构造函数
   * 防止外部通过new创建多个实例，确保单例模式的有效性
   * 自动初始化房间状态
   */
  private constructor() {
    this.initRoomState();
  }

  // ==================== 常量定义 ====================

  /**
   * 索引到场景模式名称的映射表
   * 用于将索引转换为UI显示的模式名称
   */
  private indexToModeName: string[] = ['明亮模式', '柔和模式', '阅读模式', '温馨模式', '睡眠模式'];

  /**
   * 灯光顺序定义（索引映射）
   * 0: 洗漱间, 1: 衣柜灯, 2: 落地灯, 3: 吧灯,
   * 4: 书桌灯, 5: 右阅读灯, 6: 左阅读灯, 7: 排风扇, 8: 廊灯
   */

  /**
   * 预设场景模式的灯光状态矩阵
   * 行：场景模式（0-4）
   * 列：灯光设备（0-8）
   * true: 开启, false: 关闭
   */
  private modeLightStates: boolean[][] = [
    // 明亮模式：开启主要照明设备，关闭阅读灯
    [true,  true,  true,  true,  true,  false, false, false, true],
    // 柔和模式：开启基础照明，关闭辅助设备
    [true,  true,  true,  false, false, false, false, false, true],
    // 阅读模式：仅开启书桌灯和阅读灯，关闭其他
    [false, false, false, false, true,  true,  true,  false, true],
    // 温馨模式：开启氛围照明，关闭书桌灯和阅读灯
    [true,  true,  true,  true,  false, false, false, false, false],
    // 睡眠模式：仅开启排风扇（助眠通风），其他全部关闭
    [false, false, false, false, false, false, false, true,  false],
  ];

  // ==================== 初始化方法 ====================

  /**
   * 初始化房间状态
   * 创建9个默认灯光设备的Mock数据
   * 使用initialized标志确保只初始化一次
   */
  initRoomState(): void {
    if (this.initialized) {
      return;  // 已初始化，直接返回
    }

    // 创建灯光设备列表（Mock数据）
    this.roomState.lights = [
      new LightInfo(103125, '洗漱间', 'light_icon_washroom', true),           // 洗漱间灯（默认开启）
      new LightInfo(103128, '衣柜灯', 'light_icon_wardrobe', false),          // 衣柜灯（默认关闭）
      new LightInfo(103129, '落地灯', 'light_icon_bar_lamp', true),           // 落地灯（默认开启）
      new LightInfo(103130, '吧灯', 'light_icon_bar_lamp', false),            // 吧灯（默认关闭）
      new LightInfo(103131, '书桌灯', 'light_icon_right_left_desk_read', false), // 书桌灯（默认关闭）
      new LightInfo(103132, '右阅读灯', 'light_icon_right_left_desk_read', false), // 右阅读灯（默认关闭）
      new LightInfo(103133, '左阅读灯', 'light_icon_right_left_desk_read', false), // 左阅读灯（默认关闭）
      new LightInfo(103134, '排风扇', 'light_icon_exhaust_fan', false),       // 排风扇（默认关闭）
      new LightInfo(103135, '廊灯', 'light_icon_corrid_lights', true),        // 廊灯（默认开启）
    ];

    this.initialized = true;
  }

  // ==================== 单个灯光控制 ====================

  /**
   * 通过索引切换单个灯光的开关状态
   *
   * @param index - 灯光在lights数组中的索引
   *
   * @example
  * ```ts
   * viewModel.toggleLightByIndex(0); // 开关第一个灯（洗漱间）
   * ```
   */
  toggleLightByIndex(index: number): void {
    if (index >= 0 && index < this.roomState.lights.length) {
      this.roomState.lights[index].isOn = !this.roomState.lights[index].isOn;
    }
  }

  // ==================== 场景模式控制 ====================

  /**
   * 设置灯光场景模式
   *
   * 功能：
   * - 应用预设的场景灯光状态
   * - 关闭总开关（场景模式与总开关互斥）
   * - 保存选中的模式索引
   * - 同步场景模式状态到AppStorage
   *
   * @param modeIndex - 模式索引（0-4）
   *
   * @example
  * ```ts
   * viewModel.setLightMode(0); // 切换到明亮模式
   * viewModel.setLightMode(4); // 切换到睡眠模式
   * ```
   */
  setLightMode(modeIndex: number): void {
    // 验证模式索引有效性
    if (modeIndex < 0 || modeIndex >= this.modeLightStates.length) {
      return;
    }

    // 保存当前选中的模式索引
    this.selectedModeIndex = modeIndex;
    // 场景模式激活时，总开关应关闭
    this.mainSwitchOn = false;

    // 应用场景模式的灯光状态
    const states = this.modeLightStates[modeIndex];
    for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
      this.roomState.lights[i].isOn = states[i];
    }

    // 同步状态到全局存储（供首页显示和跨页面同步）
    if (modeIndex === 4) {
      // 睡眠模式特殊处理：同时激活晚安模式
      AppStorage.setOrCreate('nightModeActive', true);
      AppStorage.setOrCreate('currentSceneMode', '');
    } else {
      // 其他模式：关闭晚安模式，保存场景模式名称
      AppStorage.setOrCreate('nightModeActive', false);
      AppStorage.setOrCreate('currentSceneMode', this.indexToModeName[modeIndex]);
    }
  }

  /**
   * 设置晚安模式
   *
   * 晚安模式是睡眠模式的特殊版本，具有以下特点：
   * - 应用睡眠模式的灯光状态（仅排风扇开启）
   * - 如果空调开启，额外关闭排风扇（避免噪音影响睡眠）
   * - 关闭总开关状态标记
   * - 清空场景模式名称
   *
   * @param acOpen - 空调是否开启（如果开启，会关闭排风扇）
   *
   * @example
  * ```ts
   * // 空调开启时开启晚安模式（排风扇自动关闭）
   * viewModel.setNightMode(true);
   * ```
   */
  setNightMode(acOpen: boolean): void {
    // 设置模式索引为睡眠模式
    this.selectedModeIndex = 4;
    // 总开关标记为关闭
    this.mainSwitchOn = false;
    // 清空场景模式名称
    AppStorage.setOrCreate('currentSceneMode', '');

    // 应用睡眠模式的灯光状态
    const states = this.modeLightStates[4];
    for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
      this.roomState.lights[i].isOn = states[i];
    }

    // 如果空调已开启，额外关闭排风扇（空调已提供通风，避免噪音）
    if (acOpen && this.roomState.lights.length > 7) {
      this.roomState.lights[7].isOn = false;  // 关闭排风扇（索引7）
    }
  }

  /**
   * 取消当前激活的场景模式
   *
   * 功能：
   * - 清空选中的模式索引
   * - 关闭总开关
   * - 关闭所有灯光
   * - 清空全局场景模式名称
   *
   * @example
  * ```ts
   * viewModel.deactivateMode(); // 关闭所有灯光，取消场景模式
   * ```
   */
  deactivateMode(): void {
    this.selectedModeIndex = -1;  // 清空选中模式
    this.mainSwitchOn = false;     // 关闭总开关
    // 关闭所有灯光
    this.roomState.lights.forEach((light) => {
      light.isOn = false;
    });
    // 清空全局场景模式名称
    AppStorage.setOrCreate('currentSceneMode', '');
  }

  // ==================== 总开关控制 ====================

  /**
   * 切换总开关状态
   *
   * 逻辑：
   * - 开启总开关：清空场景模式，点亮所有灯光
   * - 关闭总开关：关闭所有灯光
   *
   * @example
  * ```ts
   * viewModel.toggleMainSwitch(); // 一键开启/关闭所有灯光
   * ```
   */
  toggleMainSwitch(): void {
    this.mainSwitchOn = !this.mainSwitchOn;

    if (this.mainSwitchOn) {
      // 总开关开启：清空场景模式，点亮所有灯光
      this.selectedModeIndex = -1;  // 清空场景模式
      this.roomState.lights.forEach((light) => {
        light.isOn = true;  // 所有灯光开启
      });
      // 清除全局状态
      AppStorage.setOrCreate('nightModeActive', false);
      AppStorage.setOrCreate('currentSceneMode', '');
    } else {
      // 总开关关闭：关闭所有灯光
      this.roomState.lights.forEach((light) => {
        light.isOn = false;
      });
    }
    // 同步到 AppStorage
    AppStorage.setOrCreate('mainLightSwitch', this.mainSwitchOn);
  }

  /**
   * 重新加载所有状态（退出登录后重新登录时调用）
   */
  reloadState(): void {
    this.mainSwitchOn = AppStorage.get<boolean>('mainLightSwitch') ?? false;
    this.roomState.lights.forEach((light) => {
      light.isOn = this.mainSwitchOn;
    });
    // 恢复场景模式
    const savedMode = AppStorage.get<string>('currentSceneMode') ?? '';
    if (savedMode === '') {
      this.selectedModeIndex = -1;
    }
  }

  // ==================== 辅助方法 ====================

  /**
   * 应用指定场景模式的灯光状态（内部方法）
   *
   * @param modeIndex - 场景模式索引
   * @private
   */
  private applyModeLightStates(modeIndex: number): void {
    if (modeIndex < 0 || modeIndex >= this.modeLightStates.length) {
      return;
    }
    const states = this.modeLightStates[modeIndex];
    for (let i = 0; i < this.roomState.lights.length && i < states.length; i++) {
      this.roomState.lights[i].isOn = states[i];
    }
  }

  /**
   * 根据灯光信息获取对应的图标资源
   *
   * 使用iconKey映射到具体的图标资源
   * 支持：洗漱间、衣柜、落地灯/吧灯、书桌/阅读灯、排风扇、廊灯等
   *
   * @param light - 灯光信息对象
   * @returns {Resource} 对应的图标资源ID
   *
   * @example
  * ```ts
   * const icon = viewModel.getLightIcon(someLight);
   * Image(icon) // 使用图标
   * ```
   */
  getLightIcon(light: LightInfo): Resource {
    // 图标资源映射表
    const iconMap: Record<string, Resource> = {
      'light_icon_washroom': $r('app.media.light_icon_washroom'),                     // 洗漱间图标
      'light_icon_wardrobe': $r('app.media.light_icon_wardrobe'),                    // 衣柜灯图标
      'light_icon_bar_lamp': $r('app.media.light_icon_bar_lamp'),                    // 落地灯/吧灯图标
      'light_icon_right_left_desk_read': $r('app.media.light_icon_right_left_desk_read'), // 书桌/阅读灯图标
      'light_icon_exhaust_fan': $r('app.media.light_icon_exhaust_fan'),              // 排风扇图标
      'light_icon_corrid_lights': $r('app.media.light_icon_corrid_lights'),          // 廊灯图标
    };

    // 返回映射的图标，如果找不到则返回默认图标
    return iconMap[light.iconKey] || $r('app.media.light_icon_bar_lamp');
  }

  /**
   * 从AppStorage同步场景模式（外部调用接口）
   *
   * 用于外部（如LightPage）根据AppStorage中的场景模式名称
   * 同步设置灯光模式
   *
   * @param sceneMode - 场景模式名称（'明亮模式', '柔和模式'等）
   *
   * @example
  * ```ts
   * viewModel.syncFromAppStorage('明亮模式');
   * ```
   */
  syncFromAppStorage(sceneMode: string): void {
    // 场景模式名称到索引的映射表
    const modeNameToIndexMap: Record<string, number> = {
      '明亮模式': 0,
      '柔和模式': 1,
      '阅读模式': 2,
      '温馨模式': 3,
      '睡眠模式': 4,
    };

    const modeIndex = modeNameToIndexMap[sceneMode];
    if (modeIndex !== undefined) {
      this.setLightMode(modeIndex);
    }
  }
}