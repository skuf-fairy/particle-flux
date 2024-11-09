// https://easings.net/ru
// https://github.com/ai/easings.net/blob/master/src/easings/easingsFunctions.ts

export type EasingFunction = (progress: number) => number;

export enum EasingName {
  linear = 'linear',
  easeInQuad = 'easeInQuad',
  easeOutQuad = 'easeOutQuad',
  easeInOutQuad = 'easeInOutQuad',
  easeInCubic = 'easeInCubic',
  easeOutCubic = 'easeOutCubic',
  easeInOutCubic = 'easeInOutCubic',
  easeInQuart = 'easeInQuart',
  easeOutQuart = 'easeOutQuart',
  easeInOutQuart = 'easeInOutQuart',
  easeInQuint = 'easeInQuint',
  easeOutQuint = 'easeOutQuint',
  easeInOutQuint = 'easeInOutQuint',
  easeInSine = 'easeInSine',
  easeOutSine = 'easeOutSine',
  easeInOutSine = 'easeInOutSine',
  easeInExpo = 'easeInExpo',
  easeOutExpo = 'easeOutExpo',
  easeInOutExpo = 'easeInOutExpo',
  easeInCirc = 'easeInCirc',
  easeOutCirc = 'easeOutCirc',
  easeInOutCirc = 'easeInOutCirc',
  easeInBack = 'easeInBack',
  easeOutBack = 'easeOutBack',
  easeInOutBack = 'easeInOutBack',
  easeInElastic = 'easeInElastic',
  easeOutElastic = 'easeOutElastic',
  easeInOutElastic = 'easeInOutElastic',
  easeInBounce = 'easeInBounce',
  easeOutBounce = 'easeOutBounce',
  easeInOutBounce = 'easeInOutBounce',
}

export type EasingDictionary = Record<EasingName, EasingFunction>;
