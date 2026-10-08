@ObservedV2
class ToastState {
  @Trace show: boolean = false;
  @Trace message: string = '';
  @Trace duration: number = 2000;
}

@ComponentV2
export struct Toast {
  @Local state: ToastState = new ToastState();

  showToast(message: string, duration: number = 2000): void {
    this.state.message = message;
    this.state.duration = duration;
    this.state.show = true;

    setTimeout(() => {
      this.state.show = false;
    }, duration);
  }

  build() {
    if (this.state.show) {
      Column() {
        Text(this.state.message)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .padding({ left: 24, right: 24, top: 12, bottom: 12 })
          .backgroundColor('rgba(0, 0, 0, 0.7)')
          .borderRadius(20)
      }
      .position({ left: '50%', top: '50%' })
      .translate({ x: -50, y: -50 })
      .zIndex(9999)
    }
  }
}