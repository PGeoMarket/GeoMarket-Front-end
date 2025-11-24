import { Component, Input, OnInit } from '@angular/core';
import { Closedialog } from '../../../../core/dialogs/closedialog';
import { UserDTO } from '../../../../core/services/user-service';
import { SellerDTO } from '../../../../core/services/seller-service';
import { FormsModule } from '@angular/forms';
import { AdminService, suspendMessageDTO } from '../../../../core/services/admin-service';

@Component({
  selector: 'app-reason',
  imports: [Closedialog, FormsModule],
  templateUrl: './reason.html',
  styleUrl: './reason.css'
})
export class Reason implements OnInit{

  @Input() seller!: SellerDTO;
  suspendObject: suspendMessageDTO = {days: 0};

  constructor (private adminService: AdminService) {}
  
  ngOnInit(): void {
      console.log(this.seller);
      
  }  

  suspendUser () {  
    
    this.adminService.suspendedTemporary(this.suspendObject, this.seller.user_id)
    .subscribe({
      next: data => {
        console.log(data);
        
      }
    });
    
  }

}
