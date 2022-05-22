import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Senha } from 'src/app/models/senha';
import { SenhaService } from 'src/app/services/senha.service';

@Component({
  selector: 'app-senha-delete',
  templateUrl: './senha-delete.component.html',
  styleUrls: ['./senha-delete.component.css']
})
export class SenhaDeleteComponent implements OnInit {

  senha: Senha = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    perfis: []
  }

  constructor(
    private service: SenhaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.senha.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.senha.id).subscribe(resposta => {
      this.senha = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.senha.id).subscribe(() => {
      this.toast.success('Senha excluído com sucesso', 'Delete');
      this.router.navigate(['senhas'])
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

}
