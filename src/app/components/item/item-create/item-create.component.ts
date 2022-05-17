import { FornecedorService } from './../../../services/fornecedor.service';
import { ItemService } from 'src/app/services/item.service';
import { Fornecedor } from './../../../models/fornecedor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/produto';
import { Item } from './../../../models/item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  item: Item = {
    id: '',
    nomeProduto:'',
    nomeFornecedor:'',
    produto: '',
    fornecedor: '',
    codBarra: ''
  }

  produtos: Produto[] = []
  fornecedores: Fornecedor[] = []

  nomeProduto: FormControl = new FormControl(null, [Validators.required]);
  nomeFornecedor: FormControl = new FormControl(null, [Validators.required]);
  codBarra: FormControl = new FormControl(null, [Validators.required]);

  contador: number = 0

  constructor(
    private itemService: ItemService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.findAllProdutos();
    this.findAllFornecedores();
  }

  create(): void {
    this.itemService.create(this.item).subscribe(() => {
      this.toast.success('Item adcionado com sucesso', 'Cadastro');
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  findAllProdutos(): void {
    this.produtoService.findAll().subscribe(resposta => {
      this.produtos = resposta;
    })
  }

  findAllFornecedores(): void {
    this.fornecedorService.findAll().subscribe(resposta => {
      this.fornecedores = resposta;
    })
  }

  validaCampos(): boolean {
    return this.nomeProduto.valid && this.nomeFornecedor.valid && this.codBarra.valid 
  }

}