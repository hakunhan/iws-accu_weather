import Image from "next/image"

type WeatherIconProps = {
  iconId: string | undefined;
}

export default function WeatherIcon(props: WeatherIconProps) {
  const createIconPath = (iconSvg: string) => `/assets/animated-icon/${iconSvg}`;
  let icon = '/public/assets';

  switch (props.iconId) {
    case "01d":
      icon = createIconPath('day.svg')
      break;
    case "01n":
      icon = createIconPath('night.svg')
      break;
    case "02d":
      icon = createIconPath('cloudy-day-1.svg')
      break;
    case "02n":
      icon = createIconPath('cloudy-night-1.svg')
      break;
    case "03d":
      icon = createIconPath('cloudy-day-3.svg')
      break;
    case "03n":
      icon = createIconPath('cloudy-night-3.svg')
      break;
    case "04d":
      icon = createIconPath('cloudy.svg')
      break;
    case "04n":
      icon = createIconPath('cloudy.svg')
      break;
    case "09d":
      icon = createIconPath('rainy-3.svg')
      break;
    case "09n":
      icon = createIconPath('rainy-6.svg')
      break;
    case "10d":
      icon = createIconPath('rainy-2.svg')
      break;
    case "10n":
      icon = createIconPath('rainy-5.svg')
      break;
    case "11d":
      icon = createIconPath('thunder.svg')
      break;
    case "11n":
      icon = createIconPath('thunder.svg')
      break;
    case "13d":
      icon = createIconPath('snowy-3.svg')
      break;
    case "13n":
      icon = createIconPath('snowy-6.svg')
      break;
    case "50d":
      icon = createIconPath('mist.svg')
      break;
    case "50n":
      icon = createIconPath('mist.svg')
      break; 
    default:
      break;
  }

  return (
    <>
      <Image 
        src={icon}
        alt={"Weather icon"}
        width={112}
        height={112}></Image>
    </>
  )
}