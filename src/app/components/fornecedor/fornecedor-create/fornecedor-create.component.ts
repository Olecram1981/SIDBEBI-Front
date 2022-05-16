import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
    id: '',
    nome: '',
    cpfCnpj: '',
    telefone: '',
    end: '',
    email: ''
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpfCnpj: FormControl = new FormControl(null);
  email: FormControl = new FormControl(null);
  telefone: FormControl = new FormControl(null, Validators.required);
  end: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.fornecedor).subscribe(() => {
      this.toast.success('Fornecedor cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['fornecedores']);
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
    return this.nome.valid && this.cpfCnpj.valid && this.email.valid && 
    this.telefone.valid && this.end.valid
  }
}
