import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = [];

  displayedColumns: string[] = ['id', 'nome', 'tipo', 'tamanho', 'acoes'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ProdutoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
