@ComponentV2
export struct BaseTextInput {
  @Param placeholder: string = '';
  @Param text: string = '';
  @Param inputType: InputType = InputType.Normal;
  @Param maxLength: number = 100;
  @Param onChange: (value: string) => void = () => {};

  build() {
    TextInput({ placeholder: this.placeholder, text: this.text })
      .placeholderColor('#999999')
      .fontSize(16)
      .backgroundColor(Color.Transparent)
      .border({ width: 0 })
      .type(this.inputType)
      .maxLength(this.maxLength)
      .onChange(this.onChange)
  }
}