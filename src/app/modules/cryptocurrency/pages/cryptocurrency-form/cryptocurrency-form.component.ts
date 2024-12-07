import { Component, inject, OnInit } from '@angular/core';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cryptocurrency-form',
  templateUrl: './cryptocurrency-form.component.html',
  styleUrls: ['./cryptocurrency-form.component.scss'],
  imports:[ReactiveFormsModule],
  standalone:true
})
export class CryptocurrencyFormComponent implements OnInit {
  cryptocurrencyForm: FormGroup;
  private cryptocurrencyId:string="new"
  isEditing:boolean=false;
  loading:boolean=false;
  private cryptoCurrencyService=inject(CryptocurrencyService);

  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute){
    this.cryptocurrencyForm=this.formBuilder.group({
      id:[''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      description: [''],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.cryptocurrencyId = this.route.snapshot.paramMap.get('id')!;
    if(this.cryptocurrencyId!='new'){
      this.loadCryptocurrency();
      this.isEditing=true;
    }
  }

  loadCryptocurrency(){
    this.cryptoCurrencyService.getCryptocurrency(Number(this.cryptocurrencyId)).subscribe(
      {
        next: (res) => {
          this.cryptocurrencyForm.setValue(res.data);
          this.loading=false;
        },
        error: (error) => {
          console.log('error', error);
          this.loading=false;
        },
      }
    );
  }

  saveChanges(){
    if(this.isEditing){
      this.updateCryptocurrency();
    }else{
      this.createCryptocurrency();
    }
  }

  createCryptocurrency(){
    this.cryptoCurrencyService.createCryptocurrency(this.cryptocurrencyForm.value).subscribe(
      {
        next: (res) => {
          this.cryptocurrencyForm.setValue(res.data);
          this.loading=false;
        },
        error: (error) => {
          console.log('error', error);
          this.loading=false;
        },
      }
    );
  }

  updateCryptocurrency(){
    this.cryptoCurrencyService.updateCryptocurrency(this.cryptocurrencyForm.value).subscribe(
      {
        next: (res) => {
          this.cryptocurrencyForm.setValue(res.data);
          this.loading=false;
        },
        error: (error) => {
          console.log('error', error);
          this.loading=false;
        },
      }
    );
  }
  

  goToList(){
    this.router.navigate(['/cryptocurrency']);
  }
}
