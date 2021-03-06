import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.css']
})
export class ItemDeleteComponent implements OnInit {

  item: Item = {
    id: '',
    produto: '',
    fornecedor: '',
    codBarra: '',
    nomeFornecedor:'',
    nomeProduto: '',
    tamanho: '',
    valor: 0
  }

  constructor(
    private itemService: ItemService,
    private toastService: ToastrService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.item.codBarra = this.route.snapshot.paramMap.get('codBarra');
    this.findByCodBarra();
  }

  findByCodBarra(): void {
    this.itemService.findByCodBarra(this.item.codBarra).subscribe(resposta => {
      this.item = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  delete(): void {
    this.itemService.delete(this.item.id).subscribe(() => {
      this.toast.success('Item excluído com sucesso', 'Delete');
      this.router.navigate(['itensprodutos'])
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
