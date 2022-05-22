import { Senha } from './../../../models/senha';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SenhaService } from 'src/app/services/senha.service';

@Component({
  selector: 'app-senha-menu',
  templateUrl: './senha-menu.component.html',
  styleUrls: ['./senha-menu.component.css']
})
export class SenhaMenuComponent implements OnInit {

  ELEMENT_DATA: Senha[] = [];

  displayedColumns: string[] = ['id', 'nome', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Senha>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: SenhaService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Senha>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
