import type { LoginResponse } from '../model/LoginModel';

/**
 * 登录视图模型（V2响应式版本）
 *
 * 负责处理登录页面的业务逻辑和状态管理，包括：
 * - 房间号和用户名的输入验证
 * - 登录请求的发送和处理
 * - 登录状态的管理（加载中、成功、失败）
 * - 登录成功后保存用户凭证（token和房间号）
 */
@ObservedV2
export class LoginViewModel {
  @Trace roomNo: string = '';
  @Trace userName: string = '';
  @Trace isLoading: boolean = false;
  @Trace errorMsg: string = '';
  @Trace isLoginSuccess: boolean = false;
  @Trace rememberMe: boolean = false;

  constructor() {
    this.initDefaultValues();
  }

  private initDefaultValues(): void {
    this.roomNo = this.getDefaultRoomNo();
    this.userName = this.getDefaultUserName();
    this.rememberMe = this.checkRememberMe();
  }

  private getDefaultRoomNo(): string {
    const rememberedRoomNo = AppStorage.get<string>('rememberedRoomNo') ?? '';
    return rememberedRoomNo !== '' ? rememberedRoomNo : '';
  }

  private getDefaultUserName(): string {
    const rememberedUserName = AppStorage.get<string>('rememberedUserName') ?? '';
    return rememberedUserName !== '' ? rememberedUserName : '';
  }

  private checkRememberMe(): boolean {
    const value = AppStorage.get<boolean>('rememberMe');
    return value !== undefined && value !== null ? value : false;
  }

  private validateInput(roomNo: string, userName: string): boolean {
    return roomNo.trim() !== '' && userName.trim() !== '';
  }

  private validateRoomNo(roomNo: string): boolean {
    const regex = /^\d{4}$/;
    return regex.test(roomNo);
  }

  private saveCredentials(token: string, roomNo: string): void {
    AppStorage.setOrCreate('token', token);
    AppStorage.setOrCreate('roomNo', roomNo);
    AppStorage.setOrCreate('isLoggedIn', true);
    AppStorage.setOrCreate('currentTabIndex', 0);
  }

  private saveRememberedInfo(roomNo: string, userName: string): void {
    AppStorage.setOrCreate('rememberedRoomNo', roomNo);
    AppStorage.setOrCreate('rememberedUserName', userName);
    AppStorage.setOrCreate('rememberMe', true);
  }

  private clearRememberedInfo(): void {
    AppStorage.setOrCreate('rememberedRoomNo', '');
    AppStorage.setOrCreate('rememberedUserName', '');
    AppStorage.setOrCreate('rememberMe', false);
  }

  async login(isChecked: boolean): Promise<boolean> {
    if (!this.validateInput(this.roomNo, this.userName)) {
      this.errorMsg = '请输入房间号和用户名';
      return false;
    }

    if (!this.validateRoomNo(this.roomNo)) {
      this.errorMsg = '房间号必须为4位数字';
      return false;
    }

    this.isLoading = true;
    this.errorMsg = '';

    try {
      // Mock登录请求
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      
      const token: string = 'mock_token_' + Date.now();
      this.isLoginSuccess = true;
      this.saveCredentials(token, this.roomNo);
      
      // 处理记住我的逻辑
      if (isChecked) {
        this.saveRememberedInfo(this.roomNo, this.userName);
      } else {
        this.clearRememberedInfo();
      }
      
      return true;
    } catch (e) {
      console.error('登录异常:', e);
      this.errorMsg = '登录失败，请重试';
      return false;
    } finally {
      this.isLoading = false;
    }
  }
}