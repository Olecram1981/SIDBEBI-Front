import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';


@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedor: Fornecedor = {
    id: '',
    nome: '',
    cpfCnpj: '',
    telefone: '',
    end: '',
    email: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpfCnpj: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl =  new FormControl(null, Validators.required);
  endereco: FormControl =  new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  

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

  update(): void {
    this.service.update(this.fornecedor).subscribe(() => {
      this.toast.success('Fornecedor atualizado com sucesso', 'Update');
      this.router.navigate(['fornecedores'])
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
    return this.nome.valid && this.cpfCnpj.valid && this.email.valid
    && this.telefone.valid && this.endereco.valid
  }
}
