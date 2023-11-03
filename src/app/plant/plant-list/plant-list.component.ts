import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Array<Plant> = [];
  
  plantasInterior: number = 0
  plantasExterior: number = 0

  constructor(private service: PlantService) { }

  ngOnInit(): void {
    this.getPlants()
  }

  getPlants(){
    this.service.getPlants().subscribe(data => {
      this.plantasInterior = data.filter(item => item.tipo == "Interior").length
      this.plantasExterior = data.filter(item => item.tipo == "Exterior").length
      this.plants = data
    })
  }

}
