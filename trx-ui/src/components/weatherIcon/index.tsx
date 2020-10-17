import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBolt,
  faCloud,
  faSun,
  faUmbrella,
  faRainbow,
  faCloudSunRain,
  faCloudSun,
  faCloudShowersHeavy,
  faCloudRain,
  faSnowflake,
  faCloudMeatball,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherIconProps } from '../../common/types';

function WeatherIcon({ wabbr }: WeatherIconProps): ReactElement {
  let selectedIcon = faRainbow;
  switch (wabbr) {
    case 'sn':
      selectedIcon = faSnowflake;
      break;
    case 'sl':
      selectedIcon = faUmbrella;
      break;
    case 'h':
      selectedIcon = faCloudMeatball;
      break;
    case 't':
      selectedIcon = faBolt;
      break;
    case 'hr':
      selectedIcon = faCloudShowersHeavy;
      break;
    case 'lr':
      selectedIcon = faCloudRain;
      break;
    case 's':
      selectedIcon = faCloudSunRain;
      break;
    case 'hc':
      selectedIcon = faCloud;
      break;
    case 'lc':
      selectedIcon = faCloudSun;
      break;
    case 'c':
      selectedIcon = faSun;
      break;
    default:
      selectedIcon = faRainbow;
  }

  return <FontAwesomeIcon icon={selectedIcon} className="Icon" />;
}

export default WeatherIcon;
