import { Venda } from 'src/app/models/venda';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { ProdutoService } from './../../../services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Relatorio } from 'src/app/models/relatorio';
@Component({
  selector: 'app-relatorio-create',
  templateUrl: './relatorio-create.component.html',
  styleUrls: ['./relatorio-create.component.css']
})
export class RelatorioCreateComponent implements OnInit {

  ELEMENT_DATA: Venda[] = [];

  displayedColumns: string[] = ['produto', 'valorUnit'];
  dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  relatorio: Relatorio = {
    dataInicial: null,
    dataFinal: null,    
    produto: '',
    tipo: '',
    tamanho: '',
    qtdTotal: 0,  
    valorTotal: 0,
  }

  produtos: Produto[] = []

  produto: FormControl = new FormControl(null, Validators.required);
  dataInicial: FormControl = new FormControl(null, Validators.required);
  dataFinal: FormControl = new FormControl(null, Validators.required);
  
  constructor(
    private relatorioService: RelatorioService,
    private produtoService: ProdutoService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.findAllProdutos();
  }

  
  find(): void {
    this.relatorioService.find(this.relatorio.dataInicial, this.relatorio.dataFinal).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.toast.info('Relatóriio gerado com sucesso', 'Relatório');      
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

  validaCampos(): boolean {
    return this.dataInicial.valid || this.produto.valid;
  }

}
