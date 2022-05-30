import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {

  itens: any[] = [];
  
  venda: Venda = {
    id: '',
    dataHora: '',
    itens: [],
    itensVenda: [],
    qtdItens: 0,
    valorTotal: 0,
    pagamento: '',    
  }

  constructor(
    private service: VendaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    private clienteService: ClienteService,
    ) { }

  ngOnInit(): void {
    this.venda.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.venda.id).subscribe(resposta => {
      this.venda = resposta;
      this.itens = this.venda.itens;     
    })   
  }

  retornaPagamento(pagamento: any): string {
    if(pagamento == '0') {
      return 'DINHEIRO'
    } else if(pagamento == '1') {
      return 'CRÉDITO'
    } else if(pagamento == '2') {
      return 'DÉBITO'
    } else {
      return 'PIX'
    }
  }

}
