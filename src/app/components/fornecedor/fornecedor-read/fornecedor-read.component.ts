import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  fornecedor: Fornecedor = {
    id: '',
    nome: '',
    cpfCnpj: '',
    telefone: '',
    end: '',
    email: ''
  }

  constructor(
    private service: FornecedorService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.fornecedor.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.fornecedor.id).subscribe(resposta => {
      this.fornecedor = resposta;
    })
  }

}
