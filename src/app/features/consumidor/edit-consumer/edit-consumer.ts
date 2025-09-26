import { Component, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud-service';

@Component({
  standalone: true,                             // ← obliga a declarar standalone
  selector: 'app-edit-consumer',
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-consumer.html',
  styleUrls: ['./edit-consumer.css']            // ← corregido: styleUrls en plural
})
export class EditConsumer
  extends CrudService<UserDTO>
  implements OnInit                         // ← ahora implementas OnInit
{
  protected override endpoint = 'users';
  emailTaken!: boolean;
  showSuccessMessage = false;
  showErrorMessage = false;
  user: UserDTO | null = null;

  constructor(
    private userService: UserService,      // ← inyección en minúscula para usarla abajo
    http: HttpClient
  ) {
    super(http);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    console.log(this.user);
  }

  saveUser(): void {
  if (!this.user) return;

  this.update(this.user.id, this.user).subscribe({
    next: resp => {
      this.showSuccessMessage = true;

      // Mezclar con el usuario previo
      const merged = { ...this.user, ...resp };
      this.user = merged;

      this.userService.saveUser(merged);
    },
    error: err => {
      this.showErrorMessage = true;
      console.error(err);
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

  // 👇 Campo que faltaba
  if (data.role_id !== undefined && data.role_id !== null) {
    formData.append('role_id', data.role_id.toString());
  }

  formData.append('_method', 'PUT');

  return this.http.post<UserDTO>(
    `${this.API_URL}/${this.endpoint}/${id}`,
    formData
  );
}
}
