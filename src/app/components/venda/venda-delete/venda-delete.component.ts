import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-delete',
  templateUrl: './venda-delete.component.html',
  styleUrls: ['./venda-delete.component.css']
})
export class VendaDeleteComponent implements OnInit {

  itens: any[] = [];

  cliente: Cliente;

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
    this.findClienteById();
   }

  findById(): void {
    this.service.findById(this.venda.id).subscribe(resposta => {
      this.venda = resposta;
      this.itens = this.venda.itens;
    })
  }

  delete(): void {
    this.service.delete(this.venda.id).subscribe(() => {
      this.toast.success('Venda excluída com sucesso', 'Delete');
      this.router.navigate(['vendas'])
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

  findClienteById(): void {
    this.clienteService.findById(this.venda.cliente).subscribe(resposta => {
      this.venda.cliente = resposta.nome;
    })
  }

  retornaPagamento(pagamento: any): string {
    if(pagamento == '0') {
      return 'DINHEIRO'
    } else if(pagamento == '1') {
      return 'CARTÃO DE CRÉDITO'
    } else if(pagamento == '2') {
      return 'CARTÃO DE DÉBITO'
    } else {
      return 'PIX'
    }
  }

}
