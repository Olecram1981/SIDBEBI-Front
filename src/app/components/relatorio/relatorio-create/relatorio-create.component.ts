import { Router } from '@angular/router';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { FornecedorService } from './../../../services/fornecedor.service';
import { ProdutoService } from './../../../services/produto.service';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Relatorio } from 'src/app/models/relatorio';
@Component({
  selector: 'app-relatorio-create',
  templateUrl: './relatorio-create.component.html',
  styleUrls: ['./relatorio-create.component.css']
})
export class RelatorioCreateComponent implements OnInit {

  relatorios: Relatorio[];

  relatorio: Relatorio = {
    dataInicial: '',
    dataFinal: '',    
    produto: '',
  }

  produtos: Produto[] = []

  produto: FormControl = new FormControl(null, Validators.required);
  dataInicial: FormControl = new FormControl(null, Validators.required);
  dataFinal: FormControl = new FormControl(null, Validators.required);
  
  constructor(
    private relatorioService: RelatorioService,
    private produtoService: ProdutoService,
    private toastService: ToastrService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllProdutos();
  }

  
  find(): void {
    this.relatorioService.find(this.relatorio).subscribe(resposta => {
      this.relatorios = resposta;
      this.toast.success('Relatóriio gerado com sucesso', 'Relatório');
      this.router.navigate(['relatórios']);
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

  validaCampos(): boolean {
    return this.dataInicial.valid || this.produto.valid;
  }

}
