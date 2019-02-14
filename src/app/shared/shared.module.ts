import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule { }
