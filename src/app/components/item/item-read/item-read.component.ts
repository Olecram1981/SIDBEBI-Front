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
    nomeProduto: ''
  }

  constructor(
    private itemService: ItemService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.item.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.itemService.findById(this.item.id).subscribe(resposta => {
      this.item = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

}
