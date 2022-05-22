import { Venda } from 'src/app/models/venda';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements OnInit {

  ELEMENT_DATA: Venda[] = [];

  displayedColumns: string[] = ['id', 'cliente', 'dataHora', 'valorTotal', 'acoes'];
  dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: VendaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Venda>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
