import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWeather, Location } from '../../models/IWeather.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Weather } from '../store/weather.store';

@Component({
  selector: 'app-weather-modal',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './weather-modal.component.html',
  styleUrl: './weather-modal.component.scss'
})
export class WeatherModalComponent implements OnInit {

  formLocation = new  FormGroup({
    name : new FormControl('', Validators.required),
    country : new FormControl('', Validators.required),
    region: new FormControl(''),
    lat: new FormControl(''),
    lon: new FormControl(''),
    timezone_id: new FormControl(''),
    localtime: new FormControl(''),
    localtime_epoch: new FormControl(0),
    utc_offset: new FormControl(''),
  });

  lastDataLocation! : Location ;
  completeData! : IWeather;

  get weather(){
    return Weather();
  }

  constructor(public dialogRef: MatDialogRef<WeatherModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.formLocation.patchValue(this.data.element.location);
    this.initializeLocation(this.data.element);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  initializeLocation(data:IWeather){
    this.completeData = data;
    this.lastDataLocation = data.location;
  }

  changeTheLocation(newLocation:Location){
    let newWeather = this.completeData.location = newLocation;
    let new_cities = Weather().filter(city => city.location.name != newLocation.name);
    Weather.set(new_cities);
    Weather().push(this.completeData);
    this.dialogRef.close();

  }

  onSubmit() {
    if (this.formLocation.valid) {
      const newLocation:Location = {
        name : this.formLocation.value.name ?? this.lastDataLocation.name ,
        country : this.formLocation.value.country?? this.lastDataLocation.country,
        region: this.formLocation.value.region ?? this.lastDataLocation.region,
        lat : this.formLocation.value.lat ?? this.lastDataLocation.lat,
        lon : this.formLocation.value.lon ?? this.lastDataLocation.lon,
        timezone_id : this.formLocation.value.timezone_id ?? this.lastDataLocation.timezone_id,
        localtime : this.formLocation.value.localtime ?? this.lastDataLocation.localtime,
        localtime_epoch : this.formLocation.value.localtime_epoch ?? this.lastDataLocation.localtime_epoch,
        utc_offset : this.formLocation.value.utc_offset ?? this.lastDataLocation.utc_offset
      }
      this.changeTheLocation(newLocation);
    }
    return
  }

}
