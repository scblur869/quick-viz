import { VisualizationComponent } from './visualization/visualization.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataViewComponent } from './data-view/data-view.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'app',
  component: MainComponent,
  children: [
    { path: 'single-data-view', component: DataViewComponent },
    { path: 'multi-data-view', component: VisualizationComponent }
  ]
},
{ path: '', redirectTo: 'app', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
