import { LoginViewModel } from '../viewmodel/LoginViewModel';
import window from '@ohos.window';

@ComponentV2
export struct LoginPage {
  @Local viewModel: LoginViewModel = new LoginViewModel();
  @Local isChecked: boolean = false;
  @Consumer() navPathStack: NavPathStack = new NavPathStack();
  
  @Param onLogin: (token: string) => void = () => {};

  aboutToAppear(): void {
    window.getLastWindow(getContext()).then((win: window.Window) => {
      win.setWindowSystemBarProperties({
        statusBarColor: '#00000000',
        navigationBarColor: '#00000000',
        isStatusBarLightIcon: true,
        isNavigationBarLightIcon: true,
        statusBarContentColor: '#FFFFFF',
      });
    });
    
    // 初始化记住我状态
    this.isChecked = this.viewModel.rememberMe;
  }

  build() {
    Stack() {
      Image($r('app.media.bg_hotel_full'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])

      Column() {
        Column({ space: 12 }) {
          Text('广科·未来酒店')
            .margin({ top: 90 })
            .fontSize(36)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')

          Text('华为ICT学院专属智臻旅居体验')
            .fontSize(14)
            .fontColor('#E0E0E0')
        }
        .margin({ top: 60 })
        .alignItems(HorizontalAlign.Center)

        Column({ space: 20 }) {
          Row({ space: 14 }) {
            Image($r('app.media.icon_input_room'))
              .width(22)
              .height(22)
            TextInput({ placeholder: '请输入4位房间号', text: this.viewModel.roomNo })
              .placeholderColor('#999999')
              .fontSize(16)
              .layoutWeight(1)
              .backgroundColor(Color.Transparent)
              .border({
                width: 0,
                color: Color.Transparent
              })
              .type(InputType.Number)
              .maxLength(4)
              .onChange((value: string) => {
                this.viewModel.roomNo = value;
              })
          }
          .padding({ left: 20, right: 20, top: 18, bottom: 18 })
          .backgroundColor('rgba(255, 248, 235, 0.35)')
          .borderRadius(30)
          .border({ width: 1, color: 'rgba(200, 168, 130, 0.3)' })

          Row({ space: 14 }) {
            Image($r('app.media.icon_input_user'))
              .width(22)
              .height(22)
            TextInput({ placeholder: '请输入用户名', text: this.viewModel.userName })
              .placeholderColor('#999999')
              .fontSize(16)
              .layoutWeight(1)
              .backgroundColor(Color.Transparent)
              .border({
                width: 0,
                color: Color.Transparent
              })
              .onChange((value: string) => {
                this.viewModel.userName = value;
              })
          }
          .padding({ left: 20, right: 20, top: 18, bottom: 18 })
          .backgroundColor('rgba(255, 248, 235, 0.35)')
          .borderRadius(30)
          .border({ width: 1, color: 'rgba(200, 168, 130, 0.3)' })

          Row({ space: 10 }) {
            Image(this.isChecked ? $r('app.media.icon_input_checked') : $r('app.media.icon_input_unchecked'))
              .width(18)
              .height(18)
              .onClick(() => {
                this.isChecked = !this.isChecked;
              })
            Text('记住我的信息')
              .fontSize(13)
              .fontColor('#FFFFFF')
          }
          .alignItems(VerticalAlign.Center)
          .margin({ left: 8 })

          if (this.viewModel.errorMsg !== '') {
            Text(this.viewModel.errorMsg)
              .fontSize(13)
              .fontColor('#FF6B6B')
              .margin({ top: 4 })
          }

          Button('立即入住')
            .width('100%')
            .height(52)
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor('#5D4037')
            .backgroundColor('#D4A574')
            .borderRadius(26)
            .margin({ top: 12 })
            .shadow({ radius: 12, color: 'rgba(220, 175, 110, 0.35)', offsetX: 0, offsetY: 2 })
            .enabled(!this.viewModel.isLoading)
            .onClick(async () => {
              const success = await this.viewModel.login(this.isChecked);
              if (success) {
                const token = AppStorage.get<string>('token') ?? '';
                this.onLogin(token);
              }
            })

          if (this.viewModel.isLoading) {
            LoadingProgress()
              .width(28)
              .height(28)
              .color('#D4A574')
              .margin({ top: 16 })
          }
        }
        .width('85%')
        .padding({ top: 40, bottom: 32, left: 24, right: 24 })
        .margin({ top: 60 })
        .linearGradient({
          angle: 135,
          colors: [['rgba(180, 140, 80, 0.25)', 0], ['rgba(120, 80, 40, 0.35)', 1]]
        })
        .border({ width: 1, color: 'rgba(200, 168, 130, 0.25)' })
        .borderRadius(24)
        .backdropBlur(12)

        Column({ space: 6 }) {
          Text('愿乘：重整智慧旅居体验，让科技赋能每一次下榻。')
            .fontSize(11)
            .fontColor('rgba(255, 255, 255, 0.75)')
          Text('欢迎回家，尽享未来舒适之旅。')
            .fontSize(11)
            .fontColor('rgba(255, 255, 255, 0.75)')
        }
        .alignItems(HorizontalAlign.Center)
        .margin({ top: 30 })

        Blank()
          .layoutWeight(1)
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}