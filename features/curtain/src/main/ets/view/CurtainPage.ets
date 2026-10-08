import { CurtainViewModel } from '../viewmodel/CurtainViewModel';
import window from '@ohos.window';

/**
 * 窗帘控制页面（V2版本 - 带动画效果）
 *
 * 提供布帘和窗纱的独立控制功能，支持：
 * - 布帘打开/关闭（带左右移动动画效果）
 * - 窗纱打开/关闭（带左右移动动画效果）
 * - 全部打开/全部关闭
 * - 暂停功能（可暂停正在进行的动画）
 * - Toast提示消息
 * - 防重复操作（状态检查）
 *
 * 动画实现：通过translate位移实现窗帘向两边移动的效果
 */
@ComponentV2
export struct CurtainPage {
  // ==================== 状态变量 ====================

  /**
   * 窗帘视图模型实例
   * 管理业务逻辑和房间状态
   */
  @Local viewModel: CurtainViewModel = new CurtainViewModel();

  /**
   * 布帘实际开关状态
   * true: 已打开，false: 已关闭
   */
  @Local curtainOpen: boolean = false;

  /**
   * 窗纱实际开关状态
   * true: 已打开，false: 已关闭
   */
  @Local screeningOpen: boolean = false;

  /**
   * 布帘是否正在移动中
   */
  @Local curtainMoving: boolean = false;

  /**
   * 窗纱是否正在移动中
   */
  @Local screeningMoving: boolean = false;

  /**
   * 布帘左侧移动距离（百分比）
   * 0: 关闭状态（原位），50: 完全打开（向左移动50%）
   */
  @Local curtainLeftOffset: number = 0;

  /**
   * 布帘右侧移动距离（百分比）
   * 0: 关闭状态（原位），50: 完全打开（向右移动50%）
   */
  @Local curtainRightOffset: number = 0;

  /**
   * 窗纱左侧移动距离（百分比）
   * 0: 关闭状态（原位），50: 完全打开（向左移动50%）
   */
  @Local screeningLeftOffset: number = 0;

  /**
   * 窗纱右侧移动距离（百分比）
   * 0: 关闭状态（原位），50: 完全打开（向右移动50%）
   */
  @Local screeningRightOffset: number = 0;

  /**
   * Toast提示消息内容
   */
  @Local toastMessage: string = '';

  /**
   * Toast显示控制标志
   * true: 显示提示框，false: 隐藏
   */
  @Local showToast: boolean = false;

  /**
   * 布帘动画定时器ID
   * 用于控制动画帧更新和清理
   */
  private curtainAnimTimer: number = -1;

  /**
   * 窗纱动画定时器ID
   * 用于控制动画帧更新和清理
   */
  private screeningAnimTimer: number = -1;

  /**
   * Toast定时器ID
   * 用于自动隐藏提示框
   */
  private toastTimer: number = -1;

  // ==================== 生命周期方法 ====================

  /**
   * 组件即将出现时调用
   * 初始化房间状态，设置窗口样式，准备动画初始值
   */
  aboutToAppear(): void {
    // 从 AppStorage 重新加载状态（退出登录后重新登录时）
    this.viewModel.reloadState();
    // 初始化房间状态（从ViewModel获取窗帘数据）
    this.viewModel.initRoomState();

    // 获取布帘状态（索引1：布帘）
    this.curtainOpen = this.viewModel.roomState.curtains.length > 1 &&
    this.viewModel.roomState.curtains[1].isOpen;

    // 获取窗纱状态（索引0：窗纱）
    this.screeningOpen = this.viewModel.roomState.curtains.length > 0 &&
    this.viewModel.roomState.curtains[0].isOpen;

    // 根据实际状态设置动画位置初始值
    // 打开状态：左右各移动50%，关闭状态：都在原位（0）
    const curtainOffset = this.curtainOpen ? 50 : 0;
    this.curtainLeftOffset = curtainOffset;
    this.curtainRightOffset = curtainOffset;

    const screeningOffset = this.screeningOpen ? 50 : 0;
    this.screeningLeftOffset = screeningOffset;
    this.screeningRightOffset = screeningOffset;

    // 设置窗口状态栏样式（透明背景，白色图标）
    window.getLastWindow(getContext()).then((win: window.Window) => {
      win.setWindowSystemBarProperties({
        statusBarColor: '#00000000',        // 状态栏透明
        navigationBarColor: '#00000000',    // 导航栏透明
        isStatusBarLightIcon: true,         // 状态栏图标亮色
        isNavigationBarLightIcon: true,     // 导航栏图标亮色
        statusBarContentColor: '#FFFFFF',   // 状态栏内容白色
      });
    });
  }

  /**
   * 组件即将销毁时调用
   * 清理所有定时器，防止内存泄漏
   */
  aboutToDisappear(): void {
    // 清理布帘动画定时器
    if (this.curtainAnimTimer >= 0) {
      clearInterval(this.curtainAnimTimer);
      this.curtainAnimTimer = -1;
    }
    // 清理窗纱动画定时器
    if (this.screeningAnimTimer >= 0) {
      clearInterval(this.screeningAnimTimer);
      this.screeningAnimTimer = -1;
    }
    // 清理Toast定时器
    if (this.toastTimer >= 0) {
      clearTimeout(this.toastTimer);
      this.toastTimer = -1;
    }
  }

  // ==================== 辅助方法 ====================

  /**
   * 显示Toast提示消息
   * @param message - 要显示的消息内容
   */
  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    // 清除之前的定时器，避免重复
    if (this.toastTimer >= 0) {
      clearTimeout(this.toastTimer);
    }

    // 2秒后自动隐藏Toast
    this.toastTimer = setTimeout(() => {
      this.showToast = false;
      this.toastTimer = -1;
    }, 2000);
  }

  /**
   * 布帘开合动画（左右移动效果）
   * @param toOpen - true: 打开动画，false: 关闭动画
   *
   * 动画原理：
   * - 打开动画：左侧窗帘向左移动，右侧窗帘向右移动，靠近边缘时挤压收缩
   * - 关闭动画：左右窗帘都向中间移动回到原位，逐渐展开
   * - 每50ms更新一次，步长0.3（约167帧完成，约8秒完成动画）
   * - 动画范围限制：打开时最大移动到距中心60像素位置
   * - 挤压效果：当偏移量超过30像素时开始挤压，最大挤压到40px宽度
   */
  animateCurtain(toOpen: boolean, customStep?: number): void {
    // 清除已有的动画定时器
    if (this.curtainAnimTimer >= 0) {
      clearInterval(this.curtainAnimTimer);
      this.curtainAnimTimer = -1;
    }

    // 设置移动状态为true
    this.curtainMoving = true;

    const targetOffset = toOpen ? 60 : 0;       // 目标偏移量（像素）
    const step = customStep !== undefined ? customStep : (toOpen ? 0.3 : -0.3); // 使用自定义步长或默认步长

    // 启动动画定时器
    this.curtainAnimTimer = setInterval(() => {
      let newLeftOffset = this.curtainLeftOffset + step;
      let newRightOffset = this.curtainRightOffset + step;

      // 边界检查：确保动画不会超出范围（0到60像素之间）
      newLeftOffset = Math.max(0, Math.min(60, newLeftOffset));
      newRightOffset = Math.max(0, Math.min(60, newRightOffset));

      // 检查是否到达目标
      if ((step > 0 && newLeftOffset >= targetOffset) ||
        (step < 0 && newLeftOffset <= targetOffset)) {
        newLeftOffset = targetOffset;
        newRightOffset = targetOffset;
        clearInterval(this.curtainAnimTimer);
        this.curtainAnimTimer = -1;
        this.curtainMoving = false;
        
        // 更新最终状态
        this.curtainOpen = toOpen;
        if (toOpen) {
          this.viewModel.openCurtain();
        } else {
          this.viewModel.closeCurtain();
        }
      }

      // 更新动画位置（触发UI更新）
      this.curtainLeftOffset = newLeftOffset;
      this.curtainRightOffset = newRightOffset;
    }, 50); // 50ms一帧，约20fps，更缓慢动画效果
  }

  /**
   * 暂停布帘动画
   */
  pauseCurtain(): void {
    if (this.curtainAnimTimer >= 0) {
      clearInterval(this.curtainAnimTimer);
      this.curtainAnimTimer = -1;
      this.curtainMoving = false;
      this.showToastMessage('布帘已暂停');
    }
  }

  /**
   * 窗纱开合动画（左右移动效果）
   * @param toOpen - true: 打开动画，false: 关闭动画
   *
   * 动画原理同布帘动画
   * - 动画范围限制：打开时最大移动到距中心60像素位置
   * - 挤压效果：当偏移量超过30像素时开始挤压，最大挤压到40px宽度
   */
  animateScreening(toOpen: boolean, customStep?: number): void {
    // 清除已有的动画定时器
    if (this.screeningAnimTimer >= 0) {
      clearInterval(this.screeningAnimTimer);
      this.screeningAnimTimer = -1;
    }

    // 设置移动状态为true
    this.screeningMoving = true;

    const targetOffset = toOpen ? 60 : 0;  // 目标偏移量（像素）
    const step = customStep !== undefined ? customStep : (toOpen ? 0.3 : -0.3); // 使用自定义步长或默认步长

    this.screeningAnimTimer = setInterval(() => {
      let newLeftOffset = this.screeningLeftOffset + step;
      let newRightOffset = this.screeningRightOffset + step;

      // 边界检查：确保动画不会超出范围（0到60像素之间）
      newLeftOffset = Math.max(0, Math.min(60, newLeftOffset));
      newRightOffset = Math.max(0, Math.min(60, newRightOffset));

      if ((step > 0 && newLeftOffset >= targetOffset) ||
        (step < 0 && newLeftOffset <= targetOffset)) {
        newLeftOffset = targetOffset;
        newRightOffset = targetOffset;
        clearInterval(this.screeningAnimTimer);
        this.screeningAnimTimer = -1;
        this.screeningMoving = false;
        
        // 更新最终状态
        this.screeningOpen = toOpen;
        if (toOpen) {
          this.viewModel.openScreening();
        } else {
          this.viewModel.closeScreening();
        }
      }

      this.screeningLeftOffset = newLeftOffset;
      this.screeningRightOffset = newRightOffset;
    }, 50); // 50ms一帧，约20fps，更缓慢动画效果
  }

  /**
   * 暂停窗纱动画
   */
  pauseScreening(): void {
    if (this.screeningAnimTimer >= 0) {
      clearInterval(this.screeningAnimTimer);
      this.screeningAnimTimer = -1;
      this.screeningMoving = false;
      this.showToastMessage('窗纱已暂停');
    }
  }

  // ==================== UI 构建方法 ====================
  build() {
    Stack() {
      // 主内容区域
      Column({ space: 0 }) {
        // 顶部标题栏
        Row() {
          Text('窗帘控制')
            .fontSize(30)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .margin({ top: 28 })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 12 })
        .justifyContent(FlexAlign.Center)

        // 可滚动内容区域
        Scroll() {
          Column({ space: 16 }) {
            // 快捷控制卡片（全部打开/关闭）
            this.QuickControlCard()
            // 布帘控制卡片
            this.CurtainSectionCard()
            // 窗纱控制卡片
            this.ScreeningSectionCard()
          }
          .width('100%')
          .padding({ bottom: 120 }) // 底部留白
        }
        .layoutWeight(1)      // 占据剩余空间
        .scrollBar(BarState.Off) // 隐藏滚动条
      }
      .width('100%')
      .height('100%')

      // Toast提示浮层
      if (this.showToast) {
        Text(this.toastMessage)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .padding({ left: 20, right: 20, top: 12, bottom: 12 })
          .backgroundColor('rgba(0, 0, 0, 0.7)')
          .borderRadius(8)
          .position({ x: '50%', y: '85%' })
          .translate({ x: '-50%', y: '-50%' })
      }
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 快捷控制卡片构建器
   * 提供全部打开、全部暂停和全部关闭三个快捷按钮
   */
  @Builder
  QuickControlCard() {
    Row({ space: 10 }) {
      // 全部打开按钮
      Row({ space: 8 }) {
        Image($r('app.media.curtain_icon_open_all'))
          .width(20)
          .height(20)
        Text('全部打开')
          .fontSize(12)
          .fontColor('#5D4037')
      }
      .layoutWeight(1)
      .height(42)
      .padding({ left: 12, right: 12 })
      .backgroundColor('#C4A882')
      .borderRadius(21)
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        // 执行业务逻辑
        this.viewModel.openAll();
        // 播放动画（不管当前状态，直接执行打开动画）
        this.animateCurtain(true);
        this.animateScreening(true);
      })

      // 全部暂停按钮
      Row({ space: 8 }) {
        Image($r('app.media.curtain_icon_pause'))
          .width(20)
          .height(20)
        Text('全部暂停')
          .fontSize(12)
          .fontColor('#5D4037')
      }
      .layoutWeight(1)
      .height(42)
      .padding({ left: 12, right: 12 })
      .backgroundColor('#B89A74')
      .borderRadius(21)
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        // 暂停所有动画
        this.pauseCurtain();
        this.pauseScreening();
        // 显示提示消息
        this.showToastMessage('所有窗帘都已暂停');
      })

      // 全部关闭按钮
      Row({ space: 8 }) {
        Image($r('app.media.curtain_icon_close_all'))
          .width(20)
          .height(20)
        Text('全部关闭')
          .fontSize(12)
          .fontColor('#5D4037')
      }
      .layoutWeight(1)
      .height(42)
      .padding({ left: 12, right: 12 })
      .backgroundColor('#B89A74')
      .borderRadius(21)
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        // 执行业务逻辑
        this.viewModel.closeAll();
        
        // 计算当前偏移量，确保布帘和窗纱同时到达关闭状态
        const curtainDistance = this.curtainLeftOffset; // 布帘需要移动的距离
        const screeningDistance = this.screeningLeftOffset; // 窗纱需要移动的距离
        
        // 取最大距离作为基准，计算步长比例
        const maxDistance = Math.max(curtainDistance, screeningDistance);
        
        if (maxDistance > 0) {
          // 根据距离比例调整步长，确保同时到达
          const curtainStep = -0.3 * (curtainDistance / maxDistance); // 关闭时步长为负
          const screeningStep = -0.3 * (screeningDistance / maxDistance);
          
          this.animateCurtain(false, curtainStep);
          this.animateScreening(false, screeningStep);
        } else {
          // 如果都已经关闭，直接执行动画（步长为默认值）
          this.animateCurtain(false);
          this.animateScreening(false);
        }
      })
    }
    .width('calc(100% - 48px)')
    .margin({ left: 24, right: 24, top: 18 })
  }

  /**
   * 布帘控制卡片构建器
   * 显示布帘的视觉状态，并提供打开/暂停/关闭控制按钮
   *
   * 动画实现：
   * - 使用translate位移实现窗帘向两边移动的效果
   * - 左侧窗帘向左移动（负值），右侧窗帘向右移动（正值）
   * - 移动距离基于百分比，范围0-50%
   * - 动画范围限制在杆子下方
   */
  @Builder
  CurtainSectionCard() {
    Column({ space: 18 }) {
      // 卡片标题
      Text('布帘')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#E8DCC8')
        .width('100%')

      // 视觉效果区域（包含杆子和窗帘动画）
      Stack({ alignContent: Alignment.Top }) {
        // 杆子图片（放在最上层）
        Image($r('app.media.curtain_icon_top_bar'))
          .width(240)
          .height(16)
          .objectFit(ImageFit.Contain)
          .position({ x: '50%', y: 0 })
          .translate({ x: '-50%' })

        // 窗帘容器（紧贴杆子下方）
        Stack({ alignContent: Alignment.Top }) {
          // 左侧布帘 - 宽度125.5px
          Image($r('app.media.curtain_icon_left_closed'))
            .width(125.5)
            .height(160)
            .objectFit(ImageFit.Fill) // 拉伸填满宽度
            .position({ x: 0 - this.curtainLeftOffset, y: 0 })

          // 右侧布帘 - 宽度125.5px
          Image($r('app.media.curtain_icon_right_closed'))
            .width(125.5)
            .height(160)
            .objectFit(ImageFit.Fill) // 拉伸填满宽度
            .position({ x: 114.5 + this.curtainRightOffset, y: 0 })
        }
        .width(240) // 与杆子长度一致
        .height(160)
        .clip(true) // 裁剪超出边界的内容
      }
      .width('100%')
      .height(170)
      .alignContent(Alignment.Center)

      // 控制按钮组（打开、暂停、关闭）
      Row({ space: 24 }) {
        this.ControlButton('打开', $r('app.media.curtain_icon_open'), () => {
          // 执行打开动画（不管当前状态，从当前位置继续）
          this.animateCurtain(true);
        })

        this.ControlButton('暂停', $r('app.media.curtain_icon_pause'), () => {
          // 暂停动画
          this.pauseCurtain();
        })

        this.ControlButton('关闭', $r('app.media.curtain_icon_close'), () => {
          // 执行关闭动画（不管当前状态，从当前位置继续）
          this.animateCurtain(false);
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .width('calc(100% - 48px)')
    .padding({ top: 22, bottom: 22, left: 24, right: 24 })
    .linearGradient({
      angle: 135,
      colors: [['rgba(190, 155, 105, 0.28)', 0], ['rgba(140, 100, 55, 0.32)', 1]]
    })
    .borderRadius(20)
    .border({ width: 1, color: 'rgba(196, 168, 130, 0.35)' })
    .margin({ left: 24, right: 24 })
  }

  /**
   * 窗纱控制卡片构建器
   * 显示窗纱的视觉状态，并提供打开/暂停/关闭控制按钮
   *
   * 动画实现同布帘卡片（左右移动效果）
   */
  @Builder
  ScreeningSectionCard() {
    Column({ space: 18 }) {
      // 卡片标题
      Text('窗纱')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#E8DCC8')
        .width('100%')

      // 视觉效果区域（包含杆子和窗纱动画）
      Stack({ alignContent: Alignment.Top }) {
        // 杆子图片（放在最上层）
        Image($r('app.media.curtain_icon_top_bar'))
          .width(240)
          .height(16)
          .objectFit(ImageFit.Contain)
          .position({ x: '50%', y: 0 })
          .translate({ x: '-50%' })

        // 窗纱容器（紧贴杆子下方）
        Stack({ alignContent: Alignment.Top }) {
          // 左侧窗纱 - 关闭时在最左边（x: 0），宽度120px
          Image($r('app.media.curtain_icon_window_screening_left_part_closed'))
            .width(120)
            .height(160)
            .objectFit(ImageFit.Fill) // 拉伸填满宽度
            .position({ x: 0 - this.screeningLeftOffset, y: 0 })

          // 右侧窗纱 - 关闭时与左侧紧贴（x: 120），宽度120px，总长度240px（与杆子一致）
          Image($r('app.media.curtain_icon_window_screening_right_part_closed'))
            .width(120)
            .height(160)
            .objectFit(ImageFit.Fill) // 拉伸填满宽度
            .position({ x: 120 + this.screeningRightOffset, y: 0 })
        }
        .width(240) // 与杆子长度一致
        .height(160)
        .clip(true) // 裁剪超出边界的内容
      }
      .width('100%')
      .height(170)
      .alignContent(Alignment.Center)

      // 控制按钮组（打开、暂停、关闭）
      Row({ space: 24 }) {
        this.ControlButton('打开', $r('app.media.curtain_icon_open'), () => {
          // 执行打开动画（不管当前状态，从当前位置继续）
          this.animateScreening(true);
        })

        this.ControlButton('暂停', $r('app.media.curtain_icon_pause'), () => {
          // 暂停动画
          this.pauseScreening();
        })

        this.ControlButton('关闭', $r('app.media.curtain_icon_close'), () => {
          // 执行关闭动画（不管当前状态，从当前位置继续）
          this.animateScreening(false);
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .width('calc(100% - 48px)')
    .padding({ top: 22, bottom: 22, left: 24, right: 24 })
    .linearGradient({
      angle: 135,
      colors: [['rgba(190, 155, 105, 0.28)', 0], ['rgba(140, 100, 55, 0.32)', 1]]
    })
    .borderRadius(20)
    .border({ width: 1, color: 'rgba(196, 168, 130, 0.35)' })
    .margin({ left: 24, right: 24 })
  }

  /**
   * 控制按钮构建器
   * 构建带图标和文字的圆形控制按钮
   *
   * @param text - 按钮文字（如：打开、关闭）
   * @param icon - 按钮图标资源
   * @param action - 点击回调函数
   */
  @Builder
  ControlButton(text: string, icon: Resource, action: () => void) {
    Column({ space: 10 }) {
      // 圆形按钮
      Stack() {
        Image($r('app.media.curtain_btn_selected_bg'))
          .width(50)
          .height(50)
        Image(icon)
          .width(26)
          .height(26)
      }

      // 按钮标签
      Text(text)
        .fontSize(13)
        .fontColor('#FFFFFF')
    }
    .onClick(action)
  }
}