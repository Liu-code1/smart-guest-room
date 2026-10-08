import { HomePage } from '@hotel/home';
import { LightPage } from '@hotel/light';
import { CurtainPage } from '@hotel/curtain';
import { ServicePage } from '@hotel/service';
import window from '@ohos.window';

@ObservedV2
class PageState {
  @Trace currentTabIndex: number = AppStorage.get<number>('currentTabIndex') ?? 0;
  @Trace lightPageKey: number = 0;
  @Trace servicePageKey: number = 0;
}


@Entry
@ComponentV2
export struct Index {
  pageState: PageState = new PageState();
  @Local navPathStack: NavPathStack = new NavPathStack();

  tabTexts: string[] = ['首页', '灯光', '窗帘', '服务'];
  selectedIcons: Resource[] = [
    $r('app.media.tabs_icon_home_select'),
    $r('app.media.tabs_icon_light_select'),
    $r('app.media.tabs_icon_curtain_select'),
    $r('app.media.tabs_icon_service_select')
  ];
  unselectedIcons: Resource[] = [
    $r('app.media.tabs_icon_home_unselect'),
    $r('app.media.tabs_icon_light_unselect'),
    $r('app.media.tabs_icon_curtain_unselect'),
    $r('app.media.tabs_icon_service_unselect')
  ];

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
  }

  @Builder
  PageMap(name: string) {
    if (name === 'HomePage') {
      HomePage()
    } else if (name === 'LightPage') {
      LightPage()
    } else if (name === 'CurtainPage') {
      CurtainPage()
    } else if (name === 'ServicePage') {
      ServicePage()
    }
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Image($r('app.media.curtain_bg'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])

      Row()
        .width('100%')
        .height(72)
        .backgroundImage($r('app.media.tabs_bg'), ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM])
        .hitTestBehavior(HitTestMode.None)

      Column() {
        Navigation(this.navPathStack) {
          Stack() {
            HomePage()
              .width('100%')
              .height('100%')
              .visibility(this.pageState.currentTabIndex === 0 ? Visibility.Visible : Visibility.Hidden)
            LightPage()
              .width('100%')
              .height('100%')
              .visibility(this.pageState.currentTabIndex === 1 ? Visibility.Visible : Visibility.Hidden)
            CurtainPage()
              .width('100%')
              .height('100%')
              .visibility(this.pageState.currentTabIndex === 2 ? Visibility.Visible : Visibility.Hidden)
            ServicePage()
              .width('100%')
              .height('100%')
              .visibility(this.pageState.currentTabIndex === 3 ? Visibility.Visible : Visibility.Hidden)
          }
          .width('100%')
          .height('100%')
        }
        .mode(NavigationMode.Auto)
        .navBarWidth('100%')
        .width('100%')
        .layoutWeight(1)
        .hideTitleBar(true)
        .hideToolBar(true)
        .backgroundColor(Color.Transparent)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP])

        Row() {
          ForEach(this.tabTexts, (item: string, index: number) => {
            this.TabBarBuilder(index)
          })
        }
        .width('100%')
        .height(72)
        .justifyContent(FlexAlign.SpaceAround)
        .alignItems(VerticalAlign.Center)
        .backgroundImage($r('app.media.tabs_bg'), ImageRepeat.NoRepeat)
        .backgroundImageSize(ImageSize.Cover)
        .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM])
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  TabBarBuilder(index: number) {
    Column({ space: 4 }) {
      Image(this.pageState.currentTabIndex === index ? this.selectedIcons[index] : this.unselectedIcons[index])
        .width(this.pageState.currentTabIndex === index ? 30 : 26)
        .height(this.pageState.currentTabIndex === index ? 30 : 26)
        .opacity(this.pageState.currentTabIndex === index ? 1.0 : 0.6)
      Text(this.tabTexts[index])
        .fontSize(11)
        .fontWeight(this.pageState.currentTabIndex === index ? FontWeight.Medium : FontWeight.Normal)
        .fontColor(this.pageState.currentTabIndex === index ? '#FFD700' : '#8A7A6A')
    }
    .width(60)
    .height(50)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.pageState.currentTabIndex = index;
      AppStorage.setOrCreate('currentTabIndex', index);
      if (index === 1) {
        this.pageState.lightPageKey++;
      }
      if (index === 3) {
        this.pageState.servicePageKey++;
      }
    })
  }
}