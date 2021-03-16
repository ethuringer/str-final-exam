import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.getAll();

  filterStr: string = '';
  columnKey: string = '';

  clickedElementID?: number = 0;
  actionEvent: boolean = false;

  constructor(
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onChangeFilter(event: Event): void {
    this.filterStr = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
  }

  onDelete(id: number): void {
    this.clickedElementID = id;
    this.userService.remove(id).subscribe();
    document.location.reload();
  }

  onConfirmDelete(id: number): void {
    this.confirmDialogService.confirmThis(
      "Are you sure to delete this User?",
      () => { this.actionEvent = true; this.onDelete(id); },
      () => { })
  }

  


}
