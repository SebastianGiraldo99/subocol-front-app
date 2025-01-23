import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder,FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { IWeather } from '../../models/IWeather.interface';
import {MatTableModule} from '@angular/material/table';
import { WeatherService } from '../../services/weather.service';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { Weather } from '../store/weather.store';
import { WeatherModalComponent } from '../weather-modal/weather-modal.component';


@Component({
  selector: 'app-weather',
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})

export class WeatherComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  cities = new FormControl<string[]>([]);
  unitsFormCtrl = new FormControl('');
  
  disabledButton = true;
  defaultCities = ['Bogota','New York','Medellin','New Delhi', 'Berlin'];
  displayedColumns: string[] = ['name', 'country', 'lat', 'long', 'observation_time', 'temperature', 'actions'];
  units = [
    {name : 'Metrica', value: 'm'},
    {name : 'Cientifica', value: 's'},
    {name : 'Farhenheit', value: 'f'}
  ];

  get weather(){
    return Weather();
  }
  public weatherService = inject(WeatherService);
  constructor(private fb: FormBuilder , private dialog: MatDialog) {

    this.firstFormGroup = this.fb.group({
      firstCtrl: [''],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['']
    });

  }
  
  ngOnInit() {
    localStorage.setItem('access_key', 'a203f6de507167169b1d96c9314b5b58');
  }
  validate() {
    if(this.cities.value != null && this.cities.value.length>0 ){
      this.disabledButton = false;
    }
  }

  searchWeather() {
  const citiesToSearch : string[] = this.cities.value ?? [];
    const unit = this.unitsFormCtrl.value;
    this.weatherService.getWeatherForMultipleCities(citiesToSearch).subscribe({
      next: (responses)=>{
        Weather.set(responses);
      },
      error:(error)=>{
        console.error('Error al obtener el clima', error);
      }
    });
  }

  reset(){
    this.cities.reset();
    this.unitsFormCtrl.reset();
    location.reload();
  };

  removeItem(element:IWeather){
    let new_cities = Weather().filter(city => city.location.name != element.location.name);
    Weather.set(new_cities);
  };

  openModal(element:IWeather): void {
    const dialogRef = this.dialog.open(WeatherModalComponent, {
      width: '600px',
      data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

