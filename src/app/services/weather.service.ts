import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { IWeather } from "../models/IWeather.interface";

@Injectable({
    providedIn : 'root'
})
export class WeatherService{
    private baseUrl : string = 'https://api.weatherstack.com/current';
    private access_key = localStorage.getItem('access_key');

    constructor(private http: HttpClient){ }

    getWeather(city:string):Observable<IWeather>{
        return this.http.get<IWeather>(`${this.baseUrl}?access_key=${this.access_key}&query=${city}`);
    };

    getWeatherForMultipleCities(cities:string[]):Observable<IWeather[]>{
        const requests = cities.map(city=> this.getWeather(city));
        return forkJoin(requests);
    }
}