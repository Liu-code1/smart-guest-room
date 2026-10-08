import AbilityStage from '@ohos.app.ability.AbilityStage';

export default class MyAbilityStage extends AbilityStage {
  onAcceptWant(): string {
    return 'MyAbilityStage';
  }
}
