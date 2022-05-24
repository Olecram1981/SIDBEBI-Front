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

  ELEMENT_DATA: Item[] = [];

  displayedColumns: string[] = ['id', 'produto', 'valorUnitario', 'acoes'];
  dataSource = new MatTableDataSource<Item>(this.ELEMENT_DATA);

  venda: Venda = {
    id: '',
    dataHora: '',
    itens: [],
    itensVenda: [],
    cliente: '',
    qtdItens: 0,
    valorTotal: 0,
    pagamento: '',
    codBarra: ''  
  }

  clientes: Cliente[] = []

  cliente: FormControl = new FormControl(null, Validators.required);
  pagamento: FormControl = new FormControl(null, Validators.required);
  codBarra: FormControl = new FormControl(null, Validators.required);
  
  constructor(
    private vendaService: VendaService,
    private itemService: ItemService,
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
  } 

  itemTambela(): void {
    this.venda.itens.push(this.venda.codBarra);       
    this.itemService.findByCodBarra(this.venda.codBarra).subscribe(resposta => {
      this.ELEMENT_DATA.push(resposta);
      this.dataSource = new MatTableDataSource<Item>(this.ELEMENT_DATA);
    })
    this.codBarra.reset(); 
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
