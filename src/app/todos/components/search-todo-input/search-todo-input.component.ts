import {Component, inject, OnInit} from '@angular/core';
import {NgIcon} from "@ng-icons/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

//  Services.
import {TodosService} from "../../../todos";

@Component({
  selector: 'app-search-todo-input',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="searchForm"
      class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <ng-icon class="text-pink-300 text-sm" name="bootstrapSearch"/>
      </div>
      <input
        type="search"
        class="w-full bg-black bg-opacity-20 rounded border border-gray-800 py-2 ps-10 px-3.5 text-sm -tracking-tighter on-focus "
        placeholder="Search toDo..."
        formControlName="searchValue"
      >
    </form>

    @if (todosService.searchedTodosCount() === 0 && searchForm.get('searchValue')?.value) {
      <!--Ponerle uniconito comico-->
      <p class="text-red-400 text-center mt-2 text-sm">No results found on this search</p>
    }
  `, styles: ``
})
export class SearchTodoInputComponent implements OnInit {

  private fb = inject(FormBuilder);
  public todosService = inject(TodosService);

  public searchForm: FormGroup;

  constructor() {
    this.searchForm = this.fb.group({
      searchValue: [''],
    })
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(({searchValue}) => {
      if (searchValue.length === 0) {
        this.todosService.resetSearch();
      }

      this.todosService.searchTodos(searchValue);
    })
  }
}
