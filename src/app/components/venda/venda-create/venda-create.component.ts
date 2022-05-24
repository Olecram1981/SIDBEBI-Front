import { Produto } from './../../../models/produto';
import { Item } from './../../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { ItensVendaService } from './../../../services/itens-venda.service';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  elementos: Item[] = [];

  displayedColumns: string[] = ['id', 'produto', 'valorUnitario', 'acoes'];

  venda: Venda = {
    id: '',
    dataHora: '',
    itens: [],
    itensVenda: [],
    cliente: '',
    qtdItens: 0,
    valorTotal: 0,
    pagamento: '',    
  }

  clientes: Cliente[] = []

  codBarra: string
  i: number = 0

  cliente: FormControl = new FormControl(null, Validators.required);
  pagamento: FormControl = new FormControl(null, Validators.required);
  codBarraT: FormControl = new FormControl(null, Validators.required);
  qtdItens: FormControl = new FormControl(null);
  valorTotal: FormControl = new FormControl(null);
  
  
  constructor(
    private vendaService: VendaService,
    private itemService: ItemService,
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.qtdItens.disable();
    this.valorTotal.disable();
  }

  itemTambela(): void {
    this.venda.itens.push(this.codBarra)
    this.itemService.findByCodBarra(this.codBarra).subscribe(resposta => {      
      this.elementos.push(resposta);
      this.venda.qtdItens = this.venda.qtdItens + 1;
      this.qtdItens.setValue(this.venda.qtdItens);      
      this.venda.valorTotal = this.venda.valorTotal + this.elementos[this.i].produto.valorUnit;
      this.i = this.i + 1;
      this.valorTotal.setValue(this.venda.valorTotal);
    }, ex => { 
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
    this.codBarraT.reset(); 
  }

  create(): void {
    this.vendaService.create(this.venda).subscribe(() => {
      this.toast.success('Venda efetuada com sucesso', 'Cadastro');
      this.router.navigate(['vendas']);
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

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  validaCampos(): boolean {
    return this.cliente.valid && this.pagamento.valid
  }

}
