/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 */
// This file is based on  https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/prepareURLs.js
// It's been rewrite to ts and ICE specific logic

import address from 'address';
import type { Urls } from '../types/plugin.js';

export default function prepareUrls(
  protocol: string,
  host: string,
  port: number,
  pathname: string,
  enabledHashRouter: boolean,
): Urls {
  const formatUrl = (hostname: string): string => {
    const url = new URL(`${protocol}://${hostname}:${port}`);
    url.pathname = enabledHashRouter ? '' : pathname;
    url.hash = enabledHashRouter ? `${pathname || '/'}` : '';
    return url.href;
  };
  const prettyPrintUrl = (hostname: string): string => {
    const url = new URL(`${protocol}://${hostname}:${port}`);
    url.pathname = enabledHashRouter ? '' : pathname;
    url.hash = enabledHashRouter ? `${pathname || '/'}` : '';
    return url.href;
  };

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost: string;
  let lanUrlForConfig: any;
  let lanUrlForTerminal: string;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
  } else {
    prettyHost = host;
  }

  try {
    // This can only return an IPv4 address
    lanUrlForConfig = address.ip();
    if (lanUrlForConfig) {
      // Check if the address is a private ip
      // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
      if (
        /^10[.]|^30[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
          lanUrlForConfig,
        ) ||
        process.env.USE_PUBLIC_IP
      ) {
        // Address is private, format it for later use
        lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
      } else {
        // Address is not private, so we will discard it
        lanUrlForConfig = undefined;
      }
    }
  } catch (_e) {
    // ignored
  }

  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);

  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
  };
}
