import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    id: '',
    tipo: '',
    nome: '',
    tamanho: '',
    qtd: 0,
    valorUnit: 0,
    valorTotal: 0,
    itens: [],
    nivel: 'BAIXO',
  }

  tipo: FormControl =  new FormControl(null, Validators.required);
  nome: FormControl =  new FormControl(null, Validators.required);
  tamanho: FormControl = new FormControl(null, Validators.required);
  valorUnit: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ProdutoService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.produto).subscribe(() => {
      this.toast.success('Produto cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['produtos']);
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

  validaCampos(): boolean {
    return this.nome.valid && this.tipo.valid && this.tamanho.valid && this.valorUnit.valid
  }
}
