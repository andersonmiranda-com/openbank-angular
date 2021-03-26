import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StepperComponent,
    WizardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
