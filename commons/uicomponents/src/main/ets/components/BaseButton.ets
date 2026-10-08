@ComponentV2
export struct BaseButton {
  @Param btnLabel: string = '';
  @Param btnFontSize: number = 16;
  @Param btnHeight: number = 48;
  @Param btnWidth: string | number = '100%';
  @Param btnBackgroundColor: ResourceColor = '#D4A574';
  @Param btnTextColor: ResourceColor = '#5D4037';
  @Param btnBorderRadius: number = 24;
  @Param btnClick: () => void = () => {};
  @Param btnEnabled: boolean = true;

  build() {
    Button(this.btnLabel)
      .width(this.btnWidth)
      .height(this.btnHeight)
      .fontSize(this.btnFontSize)
      .fontWeight(FontWeight.Medium)
      .fontColor(this.btnTextColor)
      .backgroundColor(this.btnBackgroundColor)
      .borderRadius(this.btnBorderRadius)
      .enabled(this.btnEnabled)
      .onClick(this.btnClick)
  }
}