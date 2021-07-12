import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CustomersService, Customer } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customer: Customer;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private customersService: CustomersService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.customersService.getCustomer(id).subscribe((customer) => {
      this.customer = customer;
    }, (error) => {
      if (error.status === 404) {
        this.router.navigate([`../404`], { relativeTo: this.route });
      }
    })
  }
}
