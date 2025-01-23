import { signal } from "@angular/core";
import { IWeather } from "../../models/IWeather.interface";

export const  Weather = signal<IWeather[]>([]);