import { isWeex } from 'universal-env';

// The 2018 and 2019 iPhone models has removed the home button and replaced it with a "home indicator" at the bottom.
// These iPhone models should adapt bottom "Home Indicator".

/**
 * Get the safe area inset bottom
 * @return {number} bottom in rpx
 */
const getSafeAreaInsetBottom = () => {
  try {
    let screenHeight = window.screen.height;
    if (isWeex) {
      // W3C: window.screen.height return the height in CSS pixels
      // WEEX: window.screen.height return the height in device independent pixels
      screenHeight = window.screen.height / window.devicePixelRatio;
    }

    // 2018 iPhoneX: 812 × 375, iPhoneXS: 812 × 375, iPhone XS Max: 896 × 414, iPhone XR: 896 × 414
    // 2019 iPhone11: 896 x 414, iPhone11 Pro: 812 × 375, iPhone11 Pro Max: 896 × 414
    // Is iPhone and points min-height is 812 can be identified as the 2018 and 2019 iPhone models.
    if (/iphone/gi.test(window.navigator.userAgent) && screenHeight >= 812) {
      // Adapt bottom "Home Indicator".
      return 34;
    } else {
      return 0;
    }
  } catch (e) {
    return 0;
  }
};

export default getSafeAreaInsetBottom;
