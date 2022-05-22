import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Senha } from 'src/app/models/senha';
import { SenhaService } from 'src/app/services/senha.service';

@Component({
  selector: 'app-senha-create',
  templateUrl: './senha-create.component.html',
  styleUrls: ['./senha-create.component.css']
})
export class SenhaCreateComponent implements OnInit {

  senhas: Senha = {
    id: '',
    nome: '',	
    email: '',
    senha: '',
    perfis: []
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: SenhaService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.senhas).subscribe(() => {
      this.toast.success('Usuário cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['senhas']);
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
    return this.nome.valid && this.email.valid && this.senha.valid
  }
}
