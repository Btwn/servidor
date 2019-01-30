using System.Collections.Generic;
using GestionIntelisis.Models;

namespace GestionIntelisis.Providers
{
    public interface IWeatherProvider
    {
        List<WeatherForecast> GetForecasts();
    }
}
