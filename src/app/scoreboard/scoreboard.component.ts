import { ScoreboardService } from './scoreboard.service';
import { UserModel } from './../models/user.model';
import { EnvService } from './../services/env/env.service';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  constructor(
    private readonly injector: Injector,
    private _liveAnnouncer: LiveAnnouncer,
    private scoreboardService: ScoreboardService
  ) {}

  envService: EnvService = this.injector.get(EnvService);
  users: UserModel[];
  position: number = 0;
  length: number;
  defaultSize = 10;
  top3 = [1, 2, 3];
  sizeOptions = [5, 10, 15, 20];
  dataSource: MatTableDataSource<UserModel>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['position', 'name', 'lastname', 'points'];

  async ngOnInit(): Promise<void> {
    try {
      const users = await this.scoreboardService.getUsers();
      this.users = users.map((user) => {
        return {
          ...user,
          position: users.indexOf(user) + 1,
        };
      });

    } catch (error) {
      console.log('Error getting users, error: ' + error);
    }

    this.length = this.users.length;
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  shouldShowMedal(position: number) {
    if (this.top3.includes(position)) {
      return true;
    }
    return false;
  }

  getMedal(position: number) {
    return `../../assets/medals/${position}.png`;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`);
    }
  }
}
