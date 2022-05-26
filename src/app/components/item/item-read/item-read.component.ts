import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-read',
  templateUrl: './item-read.component.html',
  styleUrls: ['./item-read.component.css']
})
export class ItemReadComponent implements OnInit {

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
    private toastService:    ToastrService,
    private route: ActivatedRoute,
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

}
