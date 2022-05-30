import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';


@Component({
  selector: 'app-agendamento-update',
  templateUrl: './agendamento-update.component.html',
  styleUrls: ['./agendamento-update.component.css']
})
export class AgendamentoUpdateComponent implements OnInit {

  clientes: Cliente[] = []

  agendamento: Agendamento = {
    id: '',
    dataHora: '',
    itens: [],
    itensAgendamento: [],
    cliente: '',
    qtdItens: 0,
    valorTotal: 0,
    telefone: '',
    pagamento: '', 
    status: '',
    end: '',   
  }

  cliente: FormControl =  new FormControl(null, Validators.minLength(3));
  status: FormControl =  new FormControl(null, Validators.required);  

  constructor(
    private service: AgendamentoService,
    private clienteService: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.agendamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   } 

   findById(): void {
    this.service.findById(this.agendamento.id).subscribe(resposta => {
      this.agendamento = resposta;
    })
  }

  update(): void {
    this.service.update(this.agendamento).subscribe(() => {
      this.toast.success('Status atualizado com sucesso', 'Status');
      this.router.navigate(['agendamentos'])
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
    return this.status.valid
  }
}
