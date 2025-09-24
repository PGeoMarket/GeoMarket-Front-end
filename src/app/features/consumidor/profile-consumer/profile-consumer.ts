import { Component, OnInit } from '@angular/core';
import { Closedialog } from "../../../core/dialogs/closedialog";
import { Router } from '@angular/router';
import { UserDTO, UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-profile-consumer',
  imports: [Closedialog],
  templateUrl: './profile-consumer.html',
  styleUrl: './profile-consumer.css'
})
export class ProfileConsumer implements OnInit {

  user: UserDTO | null = null;


  constructor(private router: Router , private userService:UserService) {}
  ngOnInit(): void {
    this.getUserData();
  }

  goBack() {
    this.router.navigate(['/']); // o la ruta que quieras
  }


   getUserData(){
       this.user = this.userService.getCurrentUser();
      console.log(this.user);
      
    }
}
