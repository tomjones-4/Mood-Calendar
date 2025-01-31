export interface WeatherData {
  description: string;
  temperature: number;
  conditions: string;
}
export const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=968da6633244470194ab1d2e6fd1e4c3
`
    );
    const data = await response.json();

    return {
      description: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      conditions: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      description: "Unknown",
      temperature: 0,
      conditions: "Unknown",
    };
  }
};
