@ObservedV2
class LoadingState {
  @Trace isLoading: boolean = false;
  @Trace message: string = '加载中...';
}

@ComponentV2
export struct LoadingOverlay {
  @Local state: LoadingState = new LoadingState();

  show(message: string = '加载中...'): void {
    this.state.message = message;
    this.state.isLoading = true;
  }

  hide(): void {
    this.state.isLoading = false;
  }

  build() {
    if (this.state.isLoading) {
      Stack({ alignContent: Alignment.Center }) {
        Column({ space: 12 }) {
          LoadingProgress()
            .width(40)
            .height(40)
            .color('#D4A574')
          Text(this.state.message)
            .fontSize(14)
            .fontColor('#FFFFFF')
        }
        .backgroundColor('rgba(0, 0, 0, 0.6)')
        .padding({ left: 32, right: 32, top: 24, bottom: 24 })
        .borderRadius(16)
      }
      .width('100%')
      .height('100%')
      .position({ left: 0, top: 0 })
      .zIndex(9998)
    }
  }
}