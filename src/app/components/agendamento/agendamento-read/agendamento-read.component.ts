import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-read',
  templateUrl: './agendamento-read.component.html',
  styleUrls: ['./agendamento-read.component.css']
})
export class AgendamentoReadComponent implements OnInit {

  itens: any[] = [];
  
  agendamento: Agendamento = {
    id: '',
    dataHora: '',
    itens: [],
    itensAgendamento: [],
    cliente: 0,
    qtdItens: 0,
    valorTotal: 0,
    telefone: '',
    pagamento: '', 
    status: '',
    nomeCliente: '',
    end: '',     
  }

  constructor(
    private service: AgendamentoService,   
    private route:   ActivatedRoute,
    
    ) { }

  ngOnInit(): void {
    this.agendamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.agendamento.id).subscribe(resposta => {
      this.agendamento = resposta;
      this.itens = this.agendamento.itens;     
    })   
  }

  retornaPagamento(pagamento: any): string {
    if(pagamento == '0') {
      return 'DINHEIRO'
    } else if(pagamento == '1') {
      return 'DÉBITO'
    } else if(pagamento == '2') {
      return 'CRÉDITO'
    } else {
      return 'PIX'
    }
  }

}