import { FornecedorService } from './../../../services/fornecedor.service';
import { ProdutoService } from './../../../services/produto.service';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  item: Item = {
    id: '',
    produto: '',
    fornecedor: '',
    codBarra: '',
    nomeFornecedor:'',
    nomeProduto: ''
  }

  produtos: Produto[] = []
  fornecedores: Fornecedor[] = []

  contador: number = 0

  produto: FormControl = new FormControl(null, Validators.required);
  fornecedor: FormControl = new FormControl(null, Validators.required);
  codBarra: FormControl = new FormControl(null, Validators.required);
  
  constructor(
    private itemService: ItemService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.findAllProdutos();
    this.findAllFornecedores();
  }

  create(): void {
    this.itemService.create(this.item).subscribe(() => {
      this.contador = this.contador + 1;
      this.codBarra.reset();
    }, ex => {      
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastService.error(element.message);
        });
      } else {
        this.toastService.error(ex.error.message);
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
    return this.produto.valid && this.fornecedor.valid && this.codBarra.valid 
  }

}
