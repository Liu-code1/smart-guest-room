// 导入首页视图模型，处理页面业务逻辑
import { HomeViewModel } from '../viewmodel/HomeViewModel';
// 导入鸿蒙系统窗口模块，用于设置系统状态栏、导航栏样式
import window from '@ohos.window';

/**
 * 首页组件（V2版本）
 *
 * 提供酒店房间智能控制的主要功能：
 * - 空调控制（开关、温度调节）
 * - 场景模式切换（明亮、柔和、阅读、温馨模式）
 * - 快捷服务控制（请勿打扰、清理房间）
 * - 晚安模式（一键关闭所有灯光）
 *
 * 特点：
 * - 使用V2响应式语法（@ComponentV2、@Local）
 * - 通过定时器同步AppStorage中的全局状态
 * - 毛玻璃效果和渐变背景设计
 */
@ComponentV2
export struct HomePage {
  // ==================== 状态变量 ====================

  /**
   * 首页视图模型实例
   * 管理空调控制、场景切换等业务逻辑
   */
  @Local viewModel: HomeViewModel = new HomeViewModel();

  /**
   * 请勿打扰服务激活状态（本地缓存）
   * 用于UI显示，通过定时器与AppStorage同步
   */
  @Local doNotDisturbActive: boolean = false;

  /**
   * 清理房间服务激活状态（本地缓存）
   * 用于UI显示，通过定时器与AppStorage同步
   */
  @Local cleanRoomActive: boolean = false;

  /**
   * 当前选中的场景模式名称
   * 用于UI高亮显示当前激活的场景模式
   */
  @Local currentSceneMode: string = '';

  /**
   * 状态同步定时器ID
   * 用于定期从AppStorage同步服务状态和场景模式
   * 实现跨页面状态同步（与ServicePage和LightPage保持数据一致）
   */
  private syncTimer: number = -1;

  // ==================== 生命周期方法 ====================

  /**
   * 组件即将出现时调用
   * 初始化页面状态，启动状态同步定时器，设置窗口样式
   */
  aboutToAppear(): void {
    // 从 AppStorage 重新加载状态（退出登录后重新登录时）
    this.viewModel.reloadState();
    this.doNotDisturbActive = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
    this.cleanRoomActive = AppStorage.get<boolean>('cleanRoomActive') ?? false;
    // 初始化房间状态（从Mock数据获取空调、灯光等配置）
    this.viewModel.initRoomState();

    // 从全局存储中恢复服务状态和场景模式
    this.doNotDisturbActive = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
    this.cleanRoomActive = AppStorage.get<boolean>('cleanRoomActive') ?? false;
    this.currentSceneMode = AppStorage.get<string>('currentSceneMode') ?? '';
    this.viewModel.nightModeActive = AppStorage.get<boolean>('nightModeActive') ?? false;

    // 启动定时器，每500ms同步一次全局状态
    // 确保其他页面（如ServicePage）的状态变更能够及时反映到首页
    this.syncTimer = setInterval(() => {
      this.currentSceneMode = AppStorage.get<string>('currentSceneMode') ?? '';
      this.viewModel.nightModeActive = AppStorage.get<boolean>('nightModeActive') ?? false;
      this.doNotDisturbActive = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
      this.cleanRoomActive = AppStorage.get<boolean>('cleanRoomActive') ?? false;
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

  // ==================== UI 构建方法 ====================
  build() {
    Stack() {
      // 主内容区域
      Column({ space: 0 }) {
        // ---------- 顶部标题栏 ----------
        Row() {
          // 智慧客房Logo图片
          Image($r('app.media.home_text_smart_guest_room'))
            .width(120)
            .height(30)
            .margin({ top: 28 })

          // 注：原Text组件已注释，改用图片Logo
          // Text('智慧客房')
          //   .fontSize(32)
          //   .fontWeight(FontWeight.Bold)
          //   .fontColor('#FFFFFF')
          //   .margin({ top: 28 })

          Blank() // 弹性空白，将酒店名称推到右侧

          // 酒店名称显示
          Text(this.viewModel.roomState.hotel_name)
            .fontSize(14)
            .fontColor('#C8A882')
        }
        .width('100%')
        .padding({ left: 24, right: 24, top: 12 })

        // ---------- 欢迎语 ----------
        Text('欢迎回家，房号 ' + this.viewModel.roomState.room_number)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .width('100%')
          .padding({ left: 24 })
          .margin({ top: 2 })

        // ---------- 可滚动内容区域 ----------
        Scroll() {
          Column({ space: 12 }) {
            // 空调控制卡片
            this.AirConditionerCard()
            // 场景模式卡片
            this.SceneModeCard()
            // 快捷服务卡片
            this.QuickServiceCard()
            // 晚安模式卡片
            this.NightModeCard()
          }
          .width('100%')
          .padding({ bottom: 16 })
        }
        .layoutWeight(1)              // 占据剩余空间
        .scrollBar(BarState.Off)      // 隐藏滚动条
        .edgeEffect(EdgeEffect.None)  // 禁用边缘效果
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 空调控制卡片构建器
   *
   * 功能：
   * - 显示空调开关状态
   * - 显示当前温度和设定温度
   * - 提供温度加减按钮
   * - 提供空调开关切换按钮
   */
  @Builder
  AirConditionerCard() {
    Column({ space: 18 }) {
      // 空调标题行
      Row({ space: 12 }) {
        // 空调图标
        Image($r('app.media.home_icon_airconditioner'))
          .width(40)
          .height(40)

        // 空调状态文字
        Column({ space: 4 }) {
          Text('空调')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
          Text(this.viewModel.acOpen ? '运行中' : '已关闭')
            .fontSize(12)
            .fontColor('#FFFFFF')
        }

        Blank() // 弹性空白

        // 空调开关按钮
        Image($r('app.media.home_icon_close'))
          .width(56)
          .height(56)
          .opacity(this.viewModel.acOpen ? 1 : 0.4) // 关闭状态半透明
          .onClick(() => {
            this.viewModel.toggleAirConditioner();
          })
      }
      .width('100%')

      // 温度调节区域
      Row() {
        Column({ space: 12 }) {
          // 温度标签行
          Row() {
            Text('当前温度')
              .fontSize(12)
              .fontColor('#FFFFFF')

            Blank()

            Text('设定温度')
              .fontSize(12)
              .fontColor('#FFFFFF')

            Blank()

            // 空调关闭时显示 "--"，否则显示当前温度
            Text(this.viewModel.acOpen ? this.viewModel.currentTemp + '°C' : '--')
              .fontSize(14)
              .fontColor('#D4A574')
          }
          .width('100%')

          // 温度调节按钮组
          Row({ space: 24 }) {
            // 温度减按钮
            Image($r('app.media.home_btn_sub'))
              .width(44)
              .height(44)
              .onClick(() => {
                this.viewModel.adjustTemp(-1);
              })

            // 目标温度显示
            Text(this.viewModel.acOpen ? this.viewModel.targetTemp + '°C' : '--')
              .fontSize(40)
              .fontWeight(FontWeight.Bold)
              .fontColor('#D4A574')

            // 温度加按钮
            Image($r('app.media.home_btn_add'))
              .width(44)
              .height(44)
              .onClick(() => {
                this.viewModel.adjustTemp(1);
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
        }
        .layoutWeight(1)
      }
      .width('100%')
    }
    .width('calc(100% - 48px)')   // 左右各留24px边距
    .padding({ top: 24, bottom: 24, left: 24, right: 24 })
    .linearGradient({              // 渐变背景
      angle: 135,
      colors: [['rgba(180, 140, 80, 0.35)', 0], ['rgba(120, 80, 40, 0.45)', 1]]
    })
    .borderRadius(20)
    .border({ width: 1, color: 'rgba(200, 168, 130, 0.3)' })
    .margin({ left: 24, right: 24, top: 8 })
    .backdropBlur(12)             // 毛玻璃效果
  }

  /**
   * 场景模式卡片构建器
   *
   * 提供4种预设场景模式：
   * - 明亮模式：全亮照明
   * - 柔和模式：舒适柔光
   * - 阅读模式：适合阅读的灯光
   * - 温馨模式：暖色调氛围光
   */
  @Builder
  SceneModeCard() {
    Column({ space: 14 }) {
      Text('场景模式')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')

      // 使用Flex布局实现响应式换行
      Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceBetween }) {
        this.ModeItem('明亮模式', $r('app.media.home_icon_bright'))
        this.ModeItem('柔和模式', $r('app.media.home_icon_soft'))
        this.ModeItem('阅读模式', $r('app.media.home_icon_read'))
        this.ModeItem('温馨模式', $r('app.media.home_icon_warm'))
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
    .backdropBlur(10)
  }

  /**
   * 场景模式选项构建器
   *
   * @param text - 模式名称
   * @param icon - 模式图标资源
   *
   * 特点：
   * - 选中状态有白色边框和阴影效果
   * - 未选中状态为半透明边框
   */
  @Builder
  ModeItem(text: string, icon: Resource) {
    Row({ space: 12 }) {
      Image(icon)
        .width(28)
        .height(28)
        .colorFilter(this.currentSceneMode === text ? '#5D4037' : '#5D4037')
      Text(text)
        .fontSize(14)
        .fontWeight(this.currentSceneMode === text ? FontWeight.Medium : FontWeight.Normal)
        .fontColor(this.currentSceneMode === text ? '#5D4037' : '#5D4037')
    }
    .width('calc(50% - 8px)')  // 两列布局，中间有8px间距
    .height(60)
    .padding({ left: 18, right: 18 })
    .margin({ bottom: 6 })
    .backgroundImage($r('app.media.home_layer_scenemode'), ImageRepeat.NoRepeat)
    .backgroundImageSize(ImageSize.Cover)
    .borderRadius(14)
    .border({
      width: this.currentSceneMode === text ? 4 : 0.5,
      color: this.currentSceneMode === text ? '#FFFFFF' : 'rgba(160, 125, 75, 0.25)'
    })
    .shadow(this.currentSceneMode === text
      ? { radius: 18, color: 'rgba(255, 190, 120, 0.6)', offsetX: 0, offsetY: 4 }
      : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
    .justifyContent(FlexAlign.Start)
    .alignItems(VerticalAlign.Center)
    .backdropBlur(8)
    .onClick(() => {
      this.viewModel.switchSceneMode(text);
      // 点击后立即更新本地状态，无需等待定时器
      this.currentSceneMode = AppStorage.get<string>('currentSceneMode') ?? text;
    })
  }

  /**
   * 快捷服务卡片构建器
   *
   * 提供两个快捷服务：
   * - 请勿打扰：开启后避免打扰
   * - 清理房间：请求保洁服务
   *
   * 注意：服务状态通过AppStorage与ServicePage同步
   */
  @Builder
  QuickServiceCard() {
    Column({ space: 14 }) {
      Text('快捷服务')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#FFFFFF')
        .width('100%')

      Row({ space: 14 }) {
        // 请勿打扰服务按钮
        Row({ space: 12 }) {
          Image($r('app.media.service_icon_do_not_disturb'))
            .width(26)
            .height(26)
            .colorFilter(this.doNotDisturbActive ? '#5D4037' : '#5D4037')

          Text('请勿打扰')
            .fontSize(14)
            .fontWeight(this.doNotDisturbActive ? FontWeight.Medium : FontWeight.Normal)
            .fontColor(this.doNotDisturbActive ? '#5D4037' : '#5D4037')
        }
        .layoutWeight(1)
        .height(54)
        .padding({ left: 18, right: 18 })
        .backgroundImage($r('app.media.home_layer_scenemode'), ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)
        .borderRadius(14)
        .border({
          width: this.doNotDisturbActive ? 4 : 1,
          color: this.doNotDisturbActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.3)'
        })
        .shadow(this.doNotDisturbActive
          ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 }
          : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
        .justifyContent(FlexAlign.Start)
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          this.viewModel.toggleService('请勿打扰');
          // 立即同步状态
          this.doNotDisturbActive = AppStorage.get<boolean>('doNotDisturbActive') ?? false;
        })

        // 清理房间服务按钮
        Row({ space: 12 }) {
          Image($r('app.media.service_icon_clean_room'))
            .width(26)
            .height(26)
            .colorFilter(this.cleanRoomActive ? '#FFFFFF' : '#5D4037')

          Text('清理房间')
            .fontSize(14)
            .fontWeight(this.cleanRoomActive ? FontWeight.Medium : FontWeight.Normal)
            .fontColor(this.cleanRoomActive ? '#5D4037' : '#5D4037')
        }
        .layoutWeight(1)
        .height(54)
        .padding({ left: 18, right: 18 })
        .backgroundImage($r('app.media.home_layer_scenemode'), ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)
        .borderRadius(14)
        .border({
          width: this.cleanRoomActive ? 4 : 1,
          color: this.cleanRoomActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.3)'
        })
        .shadow(this.cleanRoomActive
          ? { radius: 16, color: 'rgba(220, 175, 110, 0.45)', offsetX: 0, offsetY: 3 }
          : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 })
        .justifyContent(FlexAlign.Start)
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          this.viewModel.toggleService('清理房间');
          // 立即同步状态
          this.cleanRoomActive = AppStorage.get<boolean>('cleanRoomActive') ?? false;
        })
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

  /**
   * 晚安模式卡片构建器
   *
   * 功能：
   * - 一键关闭所有灯光
   * - 可选择是否关闭空调
   * - 与场景模式互斥（开启晚安模式会关闭场景模式）
   *
   * 视觉特点：
   * - 选中时有金色发光阴影效果
   * - 选中时边框变粗变亮
   */
  @Builder
  NightModeCard() {
    Row({ space: 14 }) {
      // 左侧图标
      Image($r('app.media.home_icon_night_left'))
        .width(40)
        .height(40)
        .colorFilter(this.viewModel.nightModeActive ? '#FFFFFF' : '#E0E0E0')

      // 文字信息
      Column({ space: 4 }) {
        Text('晚安模式')
          .fontSize(17)
          .fontWeight(this.viewModel.nightModeActive ? FontWeight.Bold : FontWeight.Medium)
          .fontColor(this.viewModel.nightModeActive ? '#5D4037' : '#5D4037')
        Text('一键关闭所有灯光')
          .fontSize(12)
          .fontColor(this.viewModel.nightModeActive ? '#5D4037' : '#5D4037')
      }
      .alignItems(HorizontalAlign.Start)

      Blank()

      // 右侧图标
      Image($r('app.media.home_icon_night_right'))
        .width(28)
        .height(28)
        .colorFilter(this.viewModel.nightModeActive ? '#FFFFFF' : '#E0E0E0')
    }
    .width('calc(100% - 48px)')
    .padding({ left: 30, right: 30, top: 20, bottom: 20 })
    .backgroundImage($r('app.media.home_layer_night'), ImageRepeat.NoRepeat)
    .backgroundImageSize(ImageSize.Cover)
    .borderRadius(20)
    .border({
      width: this.viewModel.nightModeActive ? 4 : 1,
      color: this.viewModel.nightModeActive ? '#FFFFFF' : 'rgba(200, 168, 130, 0.4)'
    })
    .shadow(this.viewModel.nightModeActive
      ? { radius: 24, color: 'rgba(255, 215, 0, 0.7)', offsetX: 0, offsetY: 4 }
      : { radius: 0, color: 'transparent', offsetX: 0, offsetY: 0 }
    )
    .margin({ left: 30, right: 24 })
    .backdropBlur(12)
    .onClick(() => {
      this.viewModel.toggleNightMode();
      // 切换后同步场景模式状态
      this.currentSceneMode = AppStorage.get<string>('currentSceneMode') ?? '';
    })
  }
}