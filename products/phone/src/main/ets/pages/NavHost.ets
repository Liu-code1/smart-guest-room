import { LoginPage } from '@hotel/login';
import { Index } from './Index';

@ObservedV2
class NavState {
  @Trace token: string = AppStorage.get<string>('token') ?? '';
}

@Entry
@ComponentV2
struct NavHost {
  navState: NavState = new NavState();

  build() {
    Stack() {
      Index()
        .width('100%')
        .height('100%')
        .visibility(this.navState.token !== undefined && this.navState.token !== '' ? Visibility.Visible : Visibility.Hidden)
      LoginPage({
        onLogin: (token: string) => {
          this.navState.token = token;
          AppStorage.setOrCreate('token', token);
        }
      })
        .width('100%')
        .height('100%')
        .visibility(this.navState.token !== undefined && this.navState.token !== '' ? Visibility.Hidden : Visibility.Visible)
    }
    .width('100%')
    .height('100%')
  }
}