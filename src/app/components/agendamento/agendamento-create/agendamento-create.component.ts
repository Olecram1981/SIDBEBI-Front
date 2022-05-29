import { Item } from './../../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-create',
  templateUrl: './agendamento-create.component.html',
  styleUrls: ['./agendamento-create.component.css']
})
export class AgendamentoCreateComponent implements OnInit {

  itens: Item[] = [];
  clientes: Cliente[] = []

  codBarra: string
  i: number = 0
  
  agendamento: Agendamento = {
    id: '',
    dataHora: '',
    itens: [],
    itensAgendamento: [],
    cliente: '',
    qtdItens: 0,
    valorTotal: 0,
    pagamento: '', 
    status: '',
    end: '',   
  }

  cliente: FormControl = new FormControl(null, Validators.required);
  pagamento: FormControl = new FormControl(null, Validators.required);
  codBarraT: FormControl = new FormControl(null, Validators.required);
  qtdItens: FormControl = new FormControl(null, Validators.required);
  valorTotal: FormControl = new FormControl(null, Validators.required);
  status: FormControl = new FormControl(null, Validators.required);
  end: FormControl = new FormControl(null, Validators.required);
  
  
  constructor(
    private agendamentoService: AgendamentoService,
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

  itemTabela(): void {
    this.agendamento.itensAgendamento.push(this.codBarra)
    this.itemService.findByCodBarra(this.codBarra).subscribe(resposta => {           
      this.itens.push(resposta);
      this.agendamento.qtdItens = this.agendamento.qtdItens + 1;
      this.qtdItens.setValue(this.agendamento.qtdItens);      
      this.agendamento.valorTotal = this.agendamento.valorTotal + this.itens[this.i].valor;
      this.i = this.i + 1;
      this.valorTotal.setValue(this.agendamento.valorTotal);
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
    this.agendamentoService.create(this.agendamento).subscribe(() => {
      this.toast.success('Agendamento efetuada com sucesso', 'Cadastro');
      this.router.navigate(['agendamentos']);
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
    if(this.itens.length > 0) {
      return this.cliente.valid && this.pagamento.valid && this.status.valid && this.end.valid;    
    }else{
      return false;
    }
  }

  carregarEnd(): void {
    for (let x = 0; x <= this.clientes.length; x++) {
      if(this.clientes[x].id == this.agendamento.cliente){
        this.agendamento.end = this.clientes[x].endereco;
      }
    }
  }

}