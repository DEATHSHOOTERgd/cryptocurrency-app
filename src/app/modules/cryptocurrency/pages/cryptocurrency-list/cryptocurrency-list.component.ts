import { Component, inject, OnInit } from '@angular/core';
import { ICryptoCurrency } from '../../interfaces/cryptocurrency.interface';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'cryptocurrency-list',
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.scss'],
  imports:[ CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,HttpClientModule],
  standalone:true
})
export class CryptocurrencyListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  private cryptoCurrencyService=inject(CryptocurrencyService);


  constructor(private router: Router){

  }

  gotoCryptocurrencyForm(id:string){
    this.router.navigate(['/cryptocurrency', id]);
  }

  cryptocurrencies:ICryptoCurrency[]=[]
  loading:boolean=false;

  ngOnInit(): void {
    this.getCryptocurrencies();
  }

  getCryptocurrencies(): void {
    this.loading = true;

    this.cryptoCurrencyService.getCryptocurrencies(10, 0, '').subscribe(
      {
        next: (res) => {
          this.cryptocurrencies = res.data;
          this.loading=false;
        },
        error: (error) => {
          console.log('error', error);
          this.loading=false;
        },
      }
    );
  }

  deleteCryptocurrencies(id:number): void {
    this.loading = true;

    this.cryptoCurrencyService.deleteCryptocurrency(id).subscribe(
      {
        next: (res) => {
          this.loading=false;
          this.getCryptocurrencies();
        },
        error: (error) => {
          console.log('error', error);
          this.loading=false;
        },
      }
    );
  }
}
