import { Component, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud-service';

@Component({
  standalone: true,
  selector: 'app-edit-consumer',
  templateUrl: './edit-consumer.html',
  styleUrls: ['./edit-consumer.css'],
  imports: [Closedialog, CommonModule, FormsModule]
})
export class EditConsumer extends CrudService<UserDTO> implements OnInit {
  protected override endpoint = 'users';
  showSuccessMessage = false;
  showErrorMessage = false;
  user: UserDTO | null = null;

  constructor(
    private userService: UserService,
    http: HttpClient
  ) {
    super(http);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  saveUser(): void {
    if (!this.user) return;
    this.update(this.user.id, this.user).subscribe({
      next: resp => {
        this.user = resp;
        this.showSuccessMessage = true;
      },
      error: err => {
        console.error(err);
        this.showErrorMessage = true;
      }
    });
  }

  override update(
    id: number,
    data: Partial<UserDTO>
  ): Observable<UserDTO> {
    const formData = new FormData();
    formData.append('primer_nombre', data.primer_nombre ?? '');
    formData.append('segundo_nombre', data.segundo_nombre ?? '');
    formData.append('primer_apellido', data.primer_apellido ?? '');
    formData.append('segundo_apellido', data.segundo_apellido ?? '');
    formData.append('email', data.email ?? '');
    formData.append('_method', 'PUT');
    return this.http.post<UserDTO>(
      `${this.API_URL}/${this.endpoint}/${id}`,
      formData
    );
  }
}
