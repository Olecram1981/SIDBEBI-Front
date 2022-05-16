import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children: [
      { path: 'home', component: HomeComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },
      { path: 'clientes/read/:id', component: ClienteReadComponent },

      { path: 'produtos', component: ProdutoListComponent },
      { path: 'produtos/create', component: ProdutoCreateComponent },
      { path: 'produtos/update/:id', component: ProdutoUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
