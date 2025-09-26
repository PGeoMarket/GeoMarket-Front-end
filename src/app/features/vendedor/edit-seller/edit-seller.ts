import { Component, OnInit } from '@angular/core';
import { Closedialog } from '../../../core/dialogs/closedialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../core/services/crud-service';
import { UserDTO, UserService } from '../../../core/services/user-service';
import { SellerDTO } from '../../../core/services/seller-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [Closedialog, CommonModule, FormsModule],
  templateUrl: './edit-seller.html',
  styleUrls: ['./edit-seller.css'],
})
export class EditSeller extends CrudService<UserDTO> implements OnInit {
  protected override endpoint = 'users';
  user: UserDTO | null = null;
  store: SellerDTO | null = null;

  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(private userService: UserService, http: HttpClient) {
    super(http);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.user?.seller) {
      this.store = this.user.seller;
    }

    // Asegurar objeto coordinate para evitar errores de binding en el HTML
    if (this.store && !this.store.coordinate) {
      this.store.coordinate = {
        id: 0,
        created_at: '',
        updated_at: '',
        latitud: 0,
        longitud: 0,
        direccion: '',
        coordinateable_type: 'seller',
        coordinateable_id: this.store.id
      };
    }

    // Asegurar role_id mínimo para evitar 422 si backend lo requiere
    if (this.user && (this.user.role_id === undefined || this.user.role_id === null)) {
      this.user.role_id = this.user.role?.id ?? this.user.role_id ?? 3;
    }
  }

  saveChanges(): void {
    if (!this.user) return;

    // 1) Actualizar usuario
    this.update(this.user.id, this.user).subscribe({
      next: (userResp) => {
        // 2) Si hay seller, actualizar seller también
        if (this.store) {
          this.updateSeller(this.store.id, this.store).subscribe({
            next: (sellerResp) => {
              const merged: UserDTO = {
                ...(this.user ?? {} as UserDTO),
                ...userResp,
                seller: { ...(this.user?.seller ?? {} as SellerDTO), ...(sellerResp as SellerDTO) }
              };

              this.user = merged;
              this.store = merged.seller ?? null;
              this.userService.saveUser(merged);
              this.showSuccessMessage = true;
            },
            error: (err) => {
              this.showErrorMessage = true;
              console.error('Error al actualizar tienda:', err);
            }
          });
        } else {
          const merged: UserDTO = { ...(this.user ?? {} as UserDTO), ...userResp };
          this.user = merged;
          this.userService.saveUser(merged);
          this.showSuccessMessage = true;
        }
      },
      error: (err) => {
        this.showErrorMessage = true;
        console.error('Error al actualizar usuario:', err);
      }
    });
  }

  // override update para usuario (envía FormData como en edit-consumer)
  override update(id: number, data: Partial<UserDTO>): Observable<UserDTO> {
    const formData = new FormData();

    formData.append('primer_nombre', data.primer_nombre ?? '');
    formData.append('segundo_nombre', data.segundo_nombre ?? '');
    formData.append('primer_apellido', data.primer_apellido ?? '');
    formData.append('segundo_apellido', data.segundo_apellido ?? '');
    formData.append('email', data.email ?? '');

    // si el user tiene coordinate en user (no es el caso si lo guardas en seller),
    // esto es opcional; lo dejo si alguna API la espera en user
    if (data.coordinate?.direccion) {
      formData.append('direccion', data.coordinate.direccion);
    }

    // enviar role_id si existe (evita 422)
    if (data.role_id !== undefined && data.role_id !== null) {
      formData.append('role_id', data.role_id.toString());
    }

    formData.append('_method', 'PUT');

    return this.http.post<UserDTO>(
      `${this.API_URL}/${this.endpoint}/${id}`,
      formData
    );
  }

  // update separado para seller (envía FormData a /sellers/:id)
  private updateSeller(id: number, data: Partial<SellerDTO>): Observable<SellerDTO> {
    const formData = new FormData();

    formData.append('nombre_tienda', data.nombre_tienda ?? '');
    formData.append('descripcion', data.descripcion ?? '');

    // enviamos dirección desde seller.coordinate.direccion
    if (data.coordinate?.direccion) {
      formData.append('direccion', data.coordinate.direccion);
    }

    formData.append('activo', data.activo ? '1' : '0');
    formData.append('_method', 'PUT');

    return this.http.post<SellerDTO>(
      `${this.API_URL}/sellers/${id}`,
      formData
    );
  }
}
