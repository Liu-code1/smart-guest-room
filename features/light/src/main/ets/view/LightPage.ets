// 导入灯光视图模型和灯光信息接口
import { LightViewModel } from '../viewmodel/LightViewModel';
import { LightInfo } from '../model/LightModel';
// 导入窗口模块，用于设置状态栏和导航栏样式
import window from '@ohos.window';

/**
 * 灯光控制页面（V2版本）
 *
 * 提供酒店房间灯光的完整控制功能：
 * - 总开关控制（一键开关所有灯光）
 * - 场景模式切换（明亮、柔和、阅读、温馨、睡眠）
 * - 独立灯光控制（每个灯光单独开关）
 *
 * 特点：
 * - 使用V2响应式语法（@ComponentV2、@Local）
 * - 通过定时器同步AppStorage中的场景模式和晚安模式状态
 * - 毛玻璃效果和渐变背景设计
 * - 独立的灯光控制子组件
 */
@ComponentV2
export struct LightPage {
  // ==================== 状态变量 ====================

  /**
   * 灯光视图模型实例（单例）
   * 管理所有灯光的业务逻辑和状态
   */
  @Local viewModel: LightViewModel = LightViewModel.getInstance();

  /**
   * 页面刷新键
   * 用于强制刷新UI（当前未使用，可扩展）
   */
  @Local pageKey: number = 0;

  /**
   * 状态同步定时器ID
   * 用于定期从AppStorage同步场景模式和晚安模式状态
   * 实现跨页面状态同步（与HomePage保持一致）
   */
  private syncTimer: number = -1;

  /**
   * 上次同步的场景模式名称
   * 用于避免重复执行相同的模式切换
   */
  private lastSyncedMode: string = '';

  // ==================== 生命周期方法 ====================

  /**
   * 组件即将出现时调用
   * 初始化灯光状态，启动状态同步定时器，设置窗口样式
   */
  aboutToAppear(): void {
    // 从 AppStorage 重新加载状态（退出登录后重新登录时）
    this.viewModel.reloadState();
    // 初始化房间状态（从Mock数据获取灯光列表）
    this.viewModel.initRoomState();

    // 首次同步场景模式状态
    this.syncSceneMode();

    // 启动定时器，每500ms同步一次全局状态
    // 确保HomePage的场景模式变更能够及时同步到灯光页面
    this.syncTimer = setInterval(() => {
      this.syncSceneMode();
    }, 500);

    // 设置窗口系统栏属性（状态栏透明，白色图标）
    window.getLastWindow(getContext()).then((win: window.Window) => {
      win.setWindowSystemBarProperties({
        statusBarColor: '#00000000',        // 状态栏背景透明
        navigationBarColor: '#00000000',    // 导航栏背景透明
        isStatusBarLightIcon: true,         // 状态栏图标亮色
        isNavigationBarLightIcon: true,     // 导航栏图标亮色
        statusBarContentColor: '#FFFFFF',   // 状态栏内容白色
      });
    });
  }

  /**
   * 组件即将销毁时调用
   * 清理定时器，防止内存泄漏
   */
  aboutToDisappear(): void {
    if (this.syncTimer >= 0) {
      clearInterval(this.syncTimer);
      this.syncTimer = -1;
    }
  }

  /**
   * 同步场景模式状态
   *
   * 功能：
   * - 从AppStorage读取当前的场景模式和晚安模式状态
   * - 如果晚安模式激活，强制切换到睡眠模式（索引4）
   * - 如果场景模式变化，切换到对应的灯光模式
   * - 如果没有场景模式且晚安模式未激活，取消所有模式
   *
   * 优先级：晚安模式 > 场景模式
   */
  syncSceneMode(): void {
    // 场景模式名称到索引的映射表
    const modeNameToIndexMap: Record<string, number> = {
      '明亮模式': 0,
      '柔和模式': 1,
      '阅读模式': 2,
      '温馨模式': 3,
      '睡眠模式': 4,
    };

    // 从全局存储获取当前状态
    const currentSceneMode = AppStorage.get<string>('currentSceneMode') || '';
    const nightModeActive = AppStorage.get<boolean>('nightModeActive') || false;

    // ========== 优先处理晚安模式 ==========
    if (nightModeActive) {
      // 如果晚安模式激活，确保灯光处于睡眠模式（索引4）
      if (this.viewModel.selectedModeIndex !== 4) {
        this.viewModel.setLightMode(4);
      }
      return;  // 晚安模式优先级最高，不再处理场景模式
    }

    // ========== 处理场景模式 ==========
    // 仅在场景模式发生变化时才执行切换，避免不必要的重复操作
    if (currentSceneMode !== this.lastSyncedMode) {
      this.lastSyncedMode = currentSceneMode;

      if (currentSceneMode) {
        // 有场景模式：切换到对应的灯光模式
        const modeIndex = modeNameToIndexMap[currentSceneMode];
        if (modeIndex !== undefined) {
          this.viewModel.setLightMode(modeIndex);
        }
      } else {
        // 无场景模式：取消所有激活的模式
        this.viewModel.deactivateMode();
      }
    }
  }

  // ==================== UI 构建方法 ====================
  build() {
    Stack() {
      // 主内容区域
      Column({ space: 0 }) {
        // ---------- 顶部标题栏 ----------
        Row() {
          Text('灯光控制')
            .fontSize(30)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .margin({ top: 28 })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 12 })
        .justifyContent(FlexAlign.Center)

        // ---------- 可滚动内容区域 ----------
        Scroll() {
          Column({ space: 16 }) {
            // 总开关卡片
            this.MainSwitchCard()
            // 场景模式卡片
            this.SceneModeCard()
            // 独立灯光控制卡片
            this.LightListCard()
          }
          .width('100%')
          .padding({ bottom: 120 })  // 底部留白
        }
        .layoutWeight(1)              // 占据剩余空间
        .scrollBar(BarState.Off)      // 隐藏滚动条
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 总开关卡片构建器
   *
   * 功能：
   * - 显示总开关状态（开启/关闭）
   * - 点击切换所有灯光的开关状态
   *
   * 视觉特点：
   * - 开启状态有金色边框和发光阴影效果
   * - 关闭状态半透明显示
   */
  @Builder
  MainSwitchCard() {
    Column({ space: 16 }) {
      // 总开关图标
      Image($r('app.media.light_btn_main_switch'))
        .width(100)
        .height(100)
        .opacity(this.viewModel.mainSwitchOn ? 1 : 0.6)  // 关闭状态半透明

      // 状态文字
      Text(this.viewModel.mainSwitchOn ? '总开关 - 开启' : '总开关 - 关闭')
        .fontSize(15)
        .fontWeight(this.viewModel.mainSwitchOn ? FontWeight.Medium : FontWeight.Normal)
        .fontColor(this.viewModel.mainSwitchOn ? '#FFFFFF' : '#E0E0E0')
    }
    .width('calc(100% - 48px)')
    .padding({ top: 32, bottom: 24, left: 24, right: 24 })
    .borderRadius(20)
    .border({
      width: this.viewModel.mainSwitchOn ? 2 : 0,
      color: this.viewModel.mainSwitchOn ? 'rgba(255, 220, 160, 0.8)' : 'transparent'
    })
    .shadow(this.viewModel.mainSwitchOn
      ? { radius: 30, color: 'rgba(255, 200, 120, 0.6)', offsetX: 0, offsetY: 0 }
      : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
    .margin({ left: 24, right: 24, top: 20 })
    .alignItems(HorizontalAlign.Center)
    .backdropBlur(12)  // 毛玻璃效果
    .onClick(() => {
      this.viewModel.toggleMainSwitch();
    })
  }

  /**
   * 场景模式卡片构建器
   *
   * 提供5种预设场景模式：
   * - 明亮模式：全亮照明
   * - 柔和模式：舒适柔光
   * - 阅读模式：适合阅读的灯光
   * - 温馨模式：暖色调氛围光
   * - 睡眠模式：低亮度助眠光
   */
  @Builder
  SceneModeCard() {
    Column({ space: 14 }) {
      Text('场景模式')
        .fontSize(18)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')

      // 使用Flex布局实现响应式换行
      Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
        this.ModeItem('明亮模式', $r('app.media.light_icon_bright_mode'), 0)
        this.ModeItem('柔和模式', $r('app.media.light_icon_soft'), 1)
        this.ModeItem('阅读模式', $r('app.media.light_icon_read_mode'), 2)
        this.ModeItem('温馨模式', $r('app.media.light_icon_warm_mode'), 3)
        this.ModeItem('睡眠模式', $r('app.media.light_icon_sleep_mode'), 4)
      }
      .width('100%')
    }
    .width('calc(100% - 48px)')
    .padding({ top: 20, bottom: 20, left: 20, right: 20 })
    .linearGradient({
      angle: 135,
      colors: [['rgba(180, 140, 80, 0)', 0], ['rgba(120, 80, 40, 0', 1]]
    })
    .borderRadius(20)
    .border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' })
    .margin({ left: 24, right: 24 })
    .backdropBlur(12)
  }

  /**
   * 场景模式选项构建器
   *
   * @param text - 模式名称
   * @param icon - 模式图标资源
   * @param index - 模式索引（0-4）
   *
   * 特点：
   * - 睡眠模式独占一行（width: '100%'）
   * - 其他模式两列布局（width: 'calc(50% - 6px)'）
   * - 选中状态有高亮边框和阴影效果
   */
  @Builder
  ModeItem(text: string, icon: Resource, index: number) {
    Row({ space: 10 }) {
      Image(icon)
        .width(22)
        .height(22)
        .colorFilter(this.viewModel.selectedModeIndex === index ? '#f0d184' : '#b99d6e')
      Text(text)
        .fontSize(17)
        .fontColor(this.viewModel.selectedModeIndex === index ? '#FFFFFF' : '#FFFFFF')
    }
    .width(index === 4 ? '100%' : 'calc(50% - 6px)')  // 睡眠模式独占一行
    .height(48)
    .padding({ left: 16, right: 16 })
    .margin({ bottom: index < 4 ? 6 : 0 })
    .backgroundImage(
      this.viewModel.selectedModeIndex === index
        ? $r('app.media.light_layer_scenemode')      // 选中状态背景
        : $r('app.media.light_btn_mode_bg'),         // 未选中状态背景
      ImageRepeat.NoRepeat
    )
    .backgroundImageSize(ImageSize.Cover)
    .borderRadius(12)
    .border({
      width: this.viewModel.selectedModeIndex === index ? 1.5 : 0.5,
      color: this.viewModel.selectedModeIndex === index ? 'rgba(240, 200, 140, 0.9)' : 'rgba(160, 125, 75, 0.25)'
    })
    .shadow(this.viewModel.selectedModeIndex === index
      ? { radius: 12, color: 'rgba(220, 175, 110, 0.35)', offsetX: 0, offsetY: 2 }
      : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
    .justifyContent(FlexAlign.Start)
    .alignItems(VerticalAlign.Center)
    .backdropBlur(8)
    .onClick(() => {
      // 点击时设置灯光模式
      this.viewModel.setLightMode(index);
    })
  }

  /**
   * 独立灯光控制卡片构建器
   *
   * 功能：
   * - 显示所有灯光设备的列表
   * - 每个灯光可独立控制开关
   * - 使用ForEach遍历生成灯光控制项
   */
  @Builder
  LightListCard() {
    Column({ space: 14 }) {
      Text('独立控制')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')

      // 使用Flex布局实现响应式网格（每行两列）
      Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
        ForEach(
          this.viewModel.roomState.lights,
          (light: LightInfo, index: number) => {
            LightControlItemComponent({
              light: light,
              onToggle: () => {
                this.viewModel.toggleLightByIndex(index);
              }
            })
          },
          (light: LightInfo) => light.id.toString()  // 使用ID作为唯一标识
        )
      }
      .width('100%')
    }
    .width('calc(100% - 48px)')
    .padding({ top: 20, bottom: 20, left: 20, right: 20 })
    .linearGradient({
      angle: 135,
      colors: [['rgba(180, 140, 80, 0.25)', 0], ['rgba(120, 80, 40, 0.35)', 1]]
    })
    .borderRadius(20)
    .border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' })
    .margin({ left: 24, right: 24 })
    .backdropBlur(12)
  }
}

/**
 * 灯光控制项组件
 *
 * 单个灯光设备的控制组件，显示：
 * - 灯光图标
 * - 灯光名称
 * - 开关状态（开/关图标）
 *
 * 特点：
 * - 独立封装的子组件，支持参数传递
 * - 选中状态有边框高亮和阴影效果
 */
@ComponentV2
struct LightControlItemComponent {
  // ==================== 组件参数 ====================

  /**
   * 灯光信息（必需参数）
   * 包含灯光的ID、名称、开关状态等
   */
  @Require @Param light: LightInfo;

  /**
   * 切换回调函数
   * 点击组件时触发，用于切换灯光的开关状态
   */
  @Param onToggle: () => void = () => {};

  // ==================== UI 构建 ====================
  build() {
    Row({ space: 10 }) {
      // 灯光图标
      Image(LightViewModel.getInstance().getLightIcon(this.light))
        .width(24)
        .height(24)
        .colorFilter(this.light.isOn ? '#FFFFFF' : '#E0E0E0')  // 开启时白色，关闭时灰色

      // 灯光名称
      Text(this.light.name)
        .fontSize(14)
        .fontWeight(this.light.isOn ? FontWeight.Medium : FontWeight.Normal)
        .fontColor(this.light.isOn ? '#FFFFFF' : '#E0E0E0')
        .maxLines(1)          // 最多一行，超出省略
        .layoutWeight(1)      // 占据剩余空间

      // 开关状态图标
      if (this.light.isOn) {
        Image($r('app.media.light_toggle_on'))
          .width(44)
          .height(22)
      } else {
        Image($r('app.media.light_toggle_off'))
          .width(44)
          .height(22)
      }
    }
    .width('calc(50% - 5px)')  // 两列布局，中间间距5px
    .padding({ left: 14, right: 12, top: 12, bottom: 12 })
    .margin({ bottom: 5 })
    .borderRadius(12)
    .border({
      width: this.light.isOn ? 1 : 0.5,
      color: this.light.isOn ? 'rgba(240, 200, 140, 0.8)' : 'rgba(120, 90, 60, 0.25)'
    })
    .shadow(this.light.isOn
      ? { radius: 8, color: 'rgba(220, 175, 110, 0.25)', offsetX: 0, offsetY: 2 }
      : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
    .backdropBlur(6)  // 轻微毛玻璃效果
    .onClick(() => {
      this.onToggle();  // 触发切换回调
    })
  }
}