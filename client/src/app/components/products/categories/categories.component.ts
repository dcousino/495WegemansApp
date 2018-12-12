import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { ApplicationState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { LoadCategories } from 'src/app/store/actions/category.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../../alerts/error-modal/error-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../products.style.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedItems: string[];
  loading: boolean;
  constructor(private store: Store<ApplicationState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadCategories());

    this.store.select('categories').subscribe(cat => {
      this.loading = cat.loading;
      this.categories = cat.categories.filter(
        category => category.children && category.children.length > 0
      );
    });

    this.selectedItems = [];
  }

  trackByFn(index: number, category: Category): string {
    return category ? category.id : undefined;
  }
}
