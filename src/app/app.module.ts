import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';



// Componentes do projeto
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { ItemDeleteComponent } from './components/item/item-delete/item-delete.component';
import { ItemReadComponent } from './components/item/item-read/item-read.component';
import { LoginComponent } from './components/login/login.component';
import { SenhaMenuComponent } from './components/senha/senha-menu/senha-menu.component';
import { SenhaCreateComponent } from './components/senha/senha-create/senha-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteListComponent,
    ClienteReadComponent,
    ClienteUpdateComponent,
    ProdutoListComponent,
    ProdutoCreateComponent,
    ProdutoUpdateComponent,
    ProdutoDeleteComponent,
    ProdutoReadComponent,
    FornecedorCreateComponent,
    FornecedorListComponent,
    FornecedorUpdateComponent,
    FornecedorDeleteComponent,
    FornecedorReadComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemDeleteComponent,
    ItemReadComponent,
    LoginComponent,
    SenhaMenuComponent,
    SenhaCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,   
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot(),
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
