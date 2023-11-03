import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListComponent } from './plant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { Plant } from '../plant';
import { faker } from '@faker-js/faker';
import { By } from '@angular/platform-browser';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PlantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    for(let i = 0; i < 3; i++) {
      const plant = new Plant(
        faker.number.int(),
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
        faker.number.int(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
      );
      component.plants.push(plant);
      debug = fixture.debugElement;
    }


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 <th.id> elements', () => {
    expect(debug.queryAll(By.css('th.id'))).toHaveSize(3)
  });
  it('should have 3 <td.nombre-comun> elements', () => {
    expect(debug.queryAll(By.css('td.nombre-comun'))).toHaveSize(3)
  });
  it('should have 3 <td.tipo> elements', () => {
    expect(debug.queryAll(By.css('td.tipo'))).toHaveSize(3)
  });
  it('should have 3 <td.clima> elements', () => {
    expect(debug.queryAll(By.css('td.clima'))).toHaveSize(3)
  });
  it('should have 3 <tr.plant> elements', () => {
    expect(debug.queryAll(By.css('tr.plant'))).toHaveSize(3)
  });
  it('should have 1 <tr.plant-header> elements', () => {
    expect(debug.queryAll(By.css('tr.plant-header'))).toHaveSize(1)
  });
  it('should have td.nombre-comun tag with the plant.nombre-comun', () => {
    debug.queryAll(By.css('td.nombre-comun')).forEach((item, i)=>{
      expect(item.nativeElement.textContent).toContain(component.plants[i].nombre_comun)
    });
  });
  it('should have 2 <tr.plant> elements and the deleted plant should not exist', () => {
    const plant = component.plants.pop()!;
    fixture.detectChanges();
    expect(debug.queryAll(By.css('tr.plant'))).toHaveSize(2)
 
    debug.queryAll(By.css('tr.nombre-comun')).forEach((selector)=>{
      expect(selector.nativeElement.textContent).not.toContain(plant.nombre_comun);
    });
  });



});
