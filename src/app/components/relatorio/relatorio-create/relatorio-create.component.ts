import { ItensVenda } from './../../../models/itensVenda';
import { ItensVendaService } from './../../../services/itens-venda.service';
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

  ELEMENT_DATA: ItensVenda[] = [];
  prodTab: Produto[] = [];

  displayedColumns: string[] = ['produto', 'qtd'];
  dataSource = new MatTableDataSource<Produto>(this.prodTab);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  relatorio: Relatorio = {
    dataInicial: '',
    dataFinal: '',    
    produto: '',
    tipo: '',
    tamanho: '',
    qtdTotal: 0,  
    valorTotal: 0,
  }

  produtos: Produto[] = []

  qtdTotalItens: number = 0
  valorTotalItens: number = 0

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
    var dataIncial = new String(this.relatorio.dataInicial);
    var dataFinal = new String(this.relatorio.dataFinal);
    var data = dataIncial.concat(dataFinal.toString());
    this.relatorioService.find(data).subscribe(resposta => {      
      this.ELEMENT_DATA = resposta;      
      if(this.ELEMENT_DATA.length > 0){    
        this.toast.success('Relatóriio gerado com sucesso', 'Relatório');   
        this.valorTotalItens = 0;
        this.formataRelatorio(this.ELEMENT_DATA);   
      }else{
        this.toast.info('Não foram encontradas vendas no período solicitado', 'Relatório');
      }
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

  formataRelatorio(elementos: ItensVenda[]):void {
    this.qtdTotalItens = elementos.length;
    for(let x=0; x < elementos.length; x++){      
      this.valorTotalItens = this.valorTotalItens + elementos[x].valorUnit;
    }
    var qtd = 0;
    for (var i = 0; i < elementos.length; i++) {
      var produto = elementos[i].item + elementos[i].tamanho;
      for (var x = 0; x < elementos.length; x++) {
        if (produto === elementos[x].item + elementos[x].tamanho){
          qtd++;
        }  
      } 
      this.prodTab[i] = {
        id: '',
        tipo: '',
        nome: produto,	
        tamanho: '',
        qtd: qtd,
        valorUnit: 0,
        valorTotal: 0,
        itens: [],
        nivel: ''
      };
      qtd = 0;
    }
    for(let i = 0; i < this.prodTab.length; i++) {
      for (let j = i+1; j < this.prodTab.length; j++) {
        if (this.prodTab[i].nome === this.prodTab[j].nome) {
          for (let k = i; k < this.prodTab.length; k++) {
            this.prodTab[k] = this.prodTab[k+1];
          }
          this.prodTab.length--;
          j--;
        }
      }
    }
    this.dataSource = new MatTableDataSource<Produto>(this.prodTab);
    this.dataSource.paginator = this.paginator;
  }

  findAllProdutos(): void {
    this.produtoService.findAll().subscribe(resposta => {
      this.produtos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.dataInicial.valid && this.dataFinal.valid;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
