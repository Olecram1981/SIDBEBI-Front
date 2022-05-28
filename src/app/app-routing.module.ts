import { AgendamentoListComponent } from './components/agendamento/agendamento-list/agendamento-list.component';
import { VendaReadComponent } from './components/venda/venda-read/venda-read.component';
import { VendaDeleteComponent } from './components/venda/venda-delete/venda-delete.component';
import { VendaCreateComponent } from './components/venda/venda-create/venda-create.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
import { SenhaDeleteComponent } from './components/senha/senha-delete/senha-delete.component';
import { SenhaCreateComponent } from './components/senha/senha-create/senha-create.component';
import { SenhaMenuComponent } from './components/senha/senha-menu/senha-menu.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ItemReadComponent } from './components/item/item-read/item-read.component';
import { ItemDeleteComponent } from './components/item/item-delete/item-delete.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
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
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },
      { path: 'clientes/read/:id', component: ClienteReadComponent },

      { path: 'produtos', component: ProdutoListComponent },
      { path: 'produtos/create', component: ProdutoCreateComponent },
      { path: 'produtos/update/:id', component: ProdutoUpdateComponent },
      { path: 'produtos/delete/:id', component: ProdutoDeleteComponent },
      { path: 'produtos/read/:id', component: ProdutoReadComponent },

      { path: 'fornecedores', component: FornecedorListComponent },
      { path: 'fornecedores/create', component: FornecedorCreateComponent },
      { path: 'fornecedores/update/:id', component: FornecedorUpdateComponent },
      { path: 'fornecedores/delete/:id', component: FornecedorDeleteComponent },
      { path: 'fornecedores/read/:id', component: FornecedorReadComponent },

      { path: 'itensprodutos', component: ItemListComponent },
      { path: 'itensprodutos/create', component: ItemCreateComponent },
      { path: 'itensprodutos/delete/:codBarra', component: ItemDeleteComponent },
      { path: 'itensprodutos/read/:codBarra', component: ItemReadComponent },

      { path: 'vendas', component: VendaListComponent },
      { path: 'vendas/create', component: VendaCreateComponent },
      { path: 'vendas/delete/:id', component: VendaDeleteComponent },
      { path: 'vendas/read/:id', component: VendaReadComponent },

      { path: 'agendamentos', component: AgendamentoListComponent },

      { path: 'senhas', component: SenhaMenuComponent },
      { path: 'senhas/create', component: SenhaCreateComponent },
      { path: 'senhas/delete/:id', component: SenhaDeleteComponent },
      
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
