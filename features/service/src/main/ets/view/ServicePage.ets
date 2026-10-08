import { ServiceViewModel } from '../viewmodel/ServiceViewModel'; // 导入服务页面的视图模型
import window from '@ohos.window'; // 导入窗口管理模块
import router from '@ohos.router'; // 导入路由模块

/**
 * 服务页面组件
 * 提供请勿打扰、清理房间、SOS紧急呼叫和退出登录等功能
 */
@ComponentV2
export struct ServicePage {
  // ==================== 状态变量 ====================
  @Local viewModel: ServiceViewModel = new ServiceViewModel(); // 视图模型实例，管理业务逻辑
  @Local toastMessage: string = ''; // 提示消息内容
  @Local showToast: boolean = false; // 控制提示框显示/隐藏
  @Local showLogoutDialog: boolean = false; // 控制退出登录对话框显示/隐藏
  private syncTimer: number = -1; // 定时器ID，用于定期同步数据

  // ==================== 生命周期方法 ====================
  /**
   * 组件即将出现时调用
   * 启动定时器同步数据，并设置窗口状态栏样式
   */
  aboutToAppear(): void {
    // 从 AppStorage 重新加载状态（退出登录后重新登录时）
    this.viewModel.syncFromAppStorage();

    // 启动定时器，每500ms从AppStorage同步数据到ViewModel
    this.syncTimer = setInterval(() => {
      this.viewModel.syncFromAppStorage();
    }, 500);

    // 获取当前窗口并设置系统栏属性（状态栏和导航栏透明，图标白色）
    window.getLastWindow(getContext()).then((win: window.Window) => {
      win.setWindowSystemBarProperties({
        statusBarColor: '#00000000', // 状态栏透明
        navigationBarColor: '#00000000', // 导航栏透明
        isStatusBarLightIcon: true, // 状态栏图标亮色
        isNavigationBarLightIcon: true, // 导航栏图标亮色
        statusBarContentColor: '#FFFFFF', // 状态栏内容颜色白色
      });
    });
  }

  /**
   * 组件即将消失时调用
   * 清理定时器，防止内存泄漏
   */
  aboutToDisappear(): void {
    if (this.syncTimer !== -1) {
      clearInterval(this.syncTimer); // 清除定时器
      this.syncTimer = -1;
    }
  }

  /**
   * 显示提示消息
   * @param message - 要显示的消息文本
   */
  showToastMessage(message: string): void {
    this.toastMessage = message; // 设置消息内容
    this.showToast = true; // 显示提示框
    // 2秒后自动隐藏
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  // ==================== UI 构建方法 ====================
  build() {
    // 使用Stack堆叠布局，内容从左上角开始对齐
    Stack({ alignContent: Alignment.TopStart }) {
      // ---------- 主要内容区域（垂直布局）----------
      Column({ space: 0 }) {
        // 页面标题
        Text('服务控制')
          .fontSize(19)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Bold)
          .margin({ top: 60 })
          .width('100%')
          .textAlign(TextAlign.Center);

        // 功能开关卡片区域（水平布局，支持换行）
        Flex({ justifyContent: FlexAlign.SpaceAround, wrap: FlexWrap.Wrap }) {
          // 请勿打扰开关卡片
          ServiceSwitchCard({
            icon: $r('app.media.service_icon_do_not_disturb'),
            label: '请勿打扰',
            isOn: this.viewModel.doNotDisturb,
            onToggle: () => {
              this.viewModel.toggleDoNotDisturb(); // 切换请勿打扰状态
              this.showToastMessage(this.viewModel.doNotDisturb ? '已开启请勿打扰' : '已关闭请勿打扰');
            }
          })
            .width('calc(50% - 30px)');

          // 清理房间开关卡片
          ServiceSwitchCard({
            icon: $r('app.media.service_icon_clean_room'),
            label: '清理房间',
            isOn: this.viewModel.cleanRoom,
            onToggle: () => {
              this.viewModel.toggleCleanRoom(); // 切换清理房间状态
              this.showToastMessage(this.viewModel.cleanRoom ? '已提交清理请求' : '已取消清理请求');
            }
          })
            .width('calc(50% - 30px)');
        }
        .width('100%')
        .padding({ left: 24, right: 24, top: 40 });

        // SOS紧急呼叫按钮
        Button() {
          Text('SOS')
            .fontSize(36)
            .fontColor('#000000')
            .fontWeight(FontWeight.Bold)
        }
        .width('calc(100% - 48px)')
        .height(88)
        .backgroundColor('#D4A574') // 驼色背景
        .borderRadius(16)
        .margin({ left: 24, right: 24, top: 30 })
        .onClick(() => {
          this.viewModel.triggerSOS(); // 触发SOS紧急呼叫
          this.showToastMessage('SOS紧急呼叫已发送');
        });

        // 弹性空白区域，将退出登录按钮推到底部
        Blank()
          .flexGrow(1);

        // 退出登录按钮
        Button() {
          Text('退出登录')
            .fontSize(18)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Medium)
        }
        .width('calc(100% - 48px)')
        .height(56)
        .backgroundColor('#B53F3F') // 红色背景
        .borderRadius(28)
        .margin({ left: 24, right: 24, bottom: 30 })
        .onClick(() => {
          this.showLogoutDialog = true; // 显示退出登录确认对话框
        });
      }
      .width('100%')
      .height('100%');

      // ---------- Toast 提示框（浮层）----------
      if (this.showToast) {
        Text(this.toastMessage)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .backgroundColor('rgba(0, 0, 0, 0.7)') // 半透明黑色背景
          .padding({ left: 20, right: 20, top: 12, bottom: 12 })
          .borderRadius(30)
          .position({ left: '50%', top: '85%' }) // 定位在屏幕底部偏上位置
          .translate({ x: '-50%' }); // 水平居中
      }

      // ---------- 退出登录确认对话框（模态框）----------
      if (this.showLogoutDialog) {
        // 半透明遮罩层
        Stack({ alignContent: Alignment.Center }) {
          // 遮罩背景，点击关闭对话框
          Column() {
          }
          .width('100%')
          .height('100%')
          .backgroundColor('rgba(0, 0, 0, 0.5)')
          .onClick(() => {
            this.showLogoutDialog = false; // 点击遮罩关闭对话框
          });

          // 对话框内容卡片
          Column({ space: 32 }) {
            // 提示文本
            Text('是否退出登录？')
              .fontSize(18)
              .fontColor('#333333')
              .fontWeight(FontWeight.Medium)
              .width('100%')
              .textAlign(TextAlign.Center);

            // 按钮区域
            Row({ space: 0 }) {
              // 取消按钮
              Button('取消')
                .width('45%')
                .height(44)
                .backgroundColor('#F5F5F5')
                .fontSize(16)
                .fontColor('#666666')
                .borderRadius(22)
                .onClick(() => {
                  this.showLogoutDialog = false; // 关闭对话框，不执行退出
                });

              Blank()
                .width('10%');

              // 确定按钮
              Button('确定')
                .width('45%')
                .height(44)
                .backgroundColor('#B53F3F')
                .fontSize(16)
                .fontColor('#FFFFFF')
                .borderRadius(22)
                .onClick(() => {
                  this.viewModel.logout(); // 调用ViewModel的登出方法
                  this.showLogoutDialog = false; // 关闭对话框
                  // 使用replaceUrl替换当前页面，而不是pushUrl压入栈
                  router.replaceUrl({ url: 'pages/NavHost' }).catch((err: Error) => {
                    console.error('Navigation error:', err);
                  });
                });
            }
            .width('100%');
          }
          .width(300)
          .padding({ top: 36, bottom: 28, left: 36, right: 36 })
          .backgroundColor('#FFFFFF')
          .borderRadius(16);
        }
      }
    }
    .width('100%')
    .height('100%');
  }
}

/**
 * 服务开关卡片组件
 * 用于展示带图标、文字和开关状态的功能卡片
 */
@ComponentV2
struct ServiceSwitchCard {
  // ==================== 组件参数（必须传入）====================
  @Require @Param icon: Resource; // 图标资源
  @Require @Param label: string; // 标签文本
  @Require @Param isOn: boolean; // 开关状态（true-开启，false-关闭）
  @Param onToggle: () => void = () => {}; // 切换回调函数（可选，默认为空函数）

  // ==================== UI 构建 ====================
  build() {
    // 使用Stack堆叠布局，内容居中
    Stack({ alignContent: Alignment.Center }) {
      // 卡片背景图片：开启和关闭状态使用相同的背景
      Image($r('app.media.service_toggle_bg'))
        .width('100%')
        .height(120)
        .borderRadius(16); // 移除透明度差异，确保两个卡片背景一致

      // 卡片内容（垂直排列）
      Column({ space: 12 }) {
        // 功能图标
        Image(this.icon)
          .width(40)
          .height(40)
          .fillColor('#FFFFFF'); // 图标填充白色

        // 功能标签文本
        Text(this.label)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Normal);

        // 开关状态图标（根据isOn显示开启或关闭图标）
        Image(this.isOn ? $r('app.media.service_toggle_on') : $r('app.media.service_toggle_off'))
          .width(44)
          .height(22);
      }
    }
    .onClick(() => {
      this.onToggle(); // 点击卡片时触发切换回调
    });
  }
}