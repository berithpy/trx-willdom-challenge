import React from 'react';
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
interface weatherIcon {
  wabbr: string;
}
function WeatherIcon({ wabbr }: weatherIcon) {
  switch (wabbr) {
    case 'sn':
      return <FontAwesomeIcon icon={faSnowflake} className="Icon" />;
    case 'sl':
      return <FontAwesomeIcon icon={faUmbrella} className="Icon" />;
    case 'h':
      return <FontAwesomeIcon icon={faCloudMeatball} className="Icon" />;
    case 't':
      return <FontAwesomeIcon icon={faBolt} className="Icon" />;
    case 'hr':
      return <FontAwesomeIcon icon={faCloudShowersHeavy} className="Icon" />;
    case 'lr':
      return <FontAwesomeIcon icon={faCloudRain} className="Icon" />;
    case 's':
      return <FontAwesomeIcon icon={faCloudSunRain} className="Icon" />;
    case 'hc':
      return <FontAwesomeIcon icon={faCloud} className="Icon" />;
    case 'lc':
      return <FontAwesomeIcon icon={faCloudSun} className="Icon" />;
    case 'c':
      return <FontAwesomeIcon icon={faSun} className="Icon" />;
    default:
      return <FontAwesomeIcon icon={faRainbow} className="Icon" />;
  }
}

export default WeatherIcon;
