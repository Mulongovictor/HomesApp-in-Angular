import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city"  #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <!-- <app-housing-location [housingLocation]="housingLocation"></app-housing-location> -->
    <app-housing-location *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation"></app-housing-location>
  </section>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
//   readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

//   housingLocation:HousingLocation = {
//     id: 0,
//     name: 'Acme Fresh Start Housing',
//     city: 'Chicago',
//     state: 'IL',
//     photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
//     // photo: "assets/house.jpg",
//     availableUnits: 4,
//    wifi: true,
//    laundry: false,
//  }
    // housingLocation: HousingLocation;
    filteredLocationList: HousingLocation [] = [];
    housingLocationList: HousingLocation []= [];
    housingService: HousingService = inject(HousingService);

    constructor(){
      // this.housingLocation = this.housingLocation;
    
      // this.housingLocationList = this.housingService.getAllHousingLocations();
      
      // this.filteredLocationList = this.housingLocationList;

      this.housingService.getAllHousingLocations().then((housingLocationList:
        HousingLocation[]) => {
          this.housingLocationList = housingLocationList;
          this.filteredLocationList = housingLocationList;
        });
    }

    filterResults(text: string) {
      if (!text){
        this.filteredLocationList = this.housingLocationList;
        return;
      }

      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
}
}