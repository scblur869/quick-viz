import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { TabBarComponent } from './main/tab-bar/tab-bar.component';
import { DataViewComponent, QuickVisDialogComponent } from './data-view/data-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { VBarChartComponent } from './charts/v-bar-chart/v-bar-chart.component';
import { PiChartComponent } from './charts/pi-chart/pi-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { HBarChartComponent } from './charts/h-bar-chart/h-bar-chart.component';
import { PolarChartComponent } from './charts/polar-chart/polar-chart.component';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PickListModule } from 'primeng/picklist';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    TabBarComponent,
    DataViewComponent,
    PageNotFoundComponent,
    VisualizationComponent,
    VBarChartComponent,
    PiChartComponent,
    LineChartComponent,
    HBarChartComponent,
    PolarChartComponent,
    QuickVisDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CheckboxModule,
    HttpClientModule,
    ChartModule,
    DataViewModule,
    CardModule,
    TableModule,
    PaginatorModule,
    PickListModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    ProgressBarModule,
    AppRoutingModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    FileUploadModule,
    TabViewModule,
    TabMenuModule
  ],
  entryComponents: [QuickVisDialogComponent],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
