import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBusiness } from 'src/app/interfaces/business';
import { BusinessService } from 'src/app/service/business.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  public displayedColumns: string[] = ['nome', 'business', 'valuation', 'situacao', 'acao'];
  public businessList: IBusiness[] = [];
  public dataSource = new MatTableDataSource<IBusiness>(this.businessList);

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit(): Promise<void> {
    await this.businessService.getBusinessList().subscribe({
      next: (response: IBusiness[]) => {
        this.businessList = response;
        this.dataSource = new MatTableDataSource<IBusiness>(response);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openForm(id: number) {
    this.router.navigateByUrl('form/' + id);
  }
}
