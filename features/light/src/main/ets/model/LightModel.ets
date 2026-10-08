/**
 * 灯光信息类（V2响应式版本）
 *
 * 描述单个灯光设备的信息和状态
 * 使用@ObservedV2和@Trace实现响应式数据绑定
 */
@ObservedV2
export class LightInfo {
  @Trace id: number = 0;       // 设备唯一标识ID
  @Trace name: string = '';    // 设备名称（如：洗漱间、衣柜灯等）
  @Trace iconKey: string = '';  // 图标资源Key，用于映射到具体图标
  @Trace isOn: boolean = false; // 开关状态：true-开启，false-关闭

  /**
   * 构造函数
   * @param id - 设备ID
   * @param name - 设备名称
   * @param iconKey - 图标资源Key
   * @param isOn - 开关状态
   */
  constructor(id: number, name: string, iconKey: string, isOn: boolean) {
    this.id = id;
    this.name = name;
    this.iconKey = iconKey;
    this.isOn = isOn;
  }
}

/**
 * 灯光模式模型
 */
export interface LightMode {
  id: string;
  name: string;
  icon: string;
  brightness: number;
  color: string;
}

/**
 * 灯光状态模型
 */
export interface LightState {
  mainSwitch: boolean;
  currentMode: string;
  lights: LightInfo[];
  modes: LightMode[];
}