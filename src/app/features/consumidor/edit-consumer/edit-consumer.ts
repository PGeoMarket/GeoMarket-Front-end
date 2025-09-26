import { Component } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-consumer',
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-consumer.html',
  styleUrl: './edit-consumer.css'
})
export class EditConsumer {
  emailTaken!: boolean;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  user: UserDTO | null = null;

  constructor(private UserService: UserService) { }
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.user = this.UserService.getCurrentUser();
    console.log(this.user);

  }

  override update(id: number, data: Partial<UserDTO>): Observable<UserDTO> {
    const formData = new FormData();

    // Campos obligatorios
    formData.append('Nombre', data.primer_nombre ?? '');
    formData.append('Segundo Nombre', data.segundo_nombre != null ? data.segundo_nombre.toString() : '');
    formData.append('Apellido', data.primer_apellido ?? '');
    formData.append('Segundo Apellido', data.segundo_apellido != null ? data.segundo_apellido.toString() : '');
    formData.append('Correo', data.email ?? '');

    // Campos opcionales
    if (data.image) formData.append('imagen', data.image);

    // <-- Método override necesario para multipart + "PUT"
    formData.append('_method', 'PUT');

    // Enviar como POST (Laravel interpretará _method=PUT)
    return this.http.post<UserDTO>(`${this.API_URL}/${this.endpoint}/${id}`, formData);
  }
}
