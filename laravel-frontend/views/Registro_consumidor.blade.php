@extends('layouts.app')

@section('content')
<div class="min-h-screen flex items-center justify-center">
  <div class="bg-white shadow-lg rounded-xl p-6 sm:p-10 w-full max-w-md relative">

    <!-- Botón volver (imagen) -->
    <div class="absolute top-4 left-4 w-2xs">
      <img src="{{ asset('svg/icons/back-icon.svg') }}" class="cursor-pointer" onclick="history.back()">
    </div>

    <!-- Logo principal (imagen) -->
    <div class="flex justify-center mb-2 mt-4">
      <img src="{{ asset('svg/icons/logo.svg') }}" alt="Logo" class="h-16">
    </div>

    <!-- Texto "GeoMarket" (imagen) -->
    <div class="flex justify-center mb-6">
      <img src="{{ asset('svg/icons/geomarket.svg') }}" alt="GeoMarket" class="h-8">
    </div>

    <!-- Formulario -->
    <form method="POST" action="#">
      @csrf

      <div class="space-y-4">
        <input type="text" name="nombre" placeholder="Nombre" class="inputs_registro" required autofocus />
        <input type="text" name="apellidos" placeholder="Apellidos" class="inputs_registro" required/>
        <input type="email" name="email" placeholder="Correo electrónico" class="inputs_registro" required/>
        <input type="email" name="email_confirmation" placeholder="Confirmar correo electrónico" class="inputs_registro" required />
        <input type="tel" name="telefono" placeholder="Teléfono" class="inputs_registro" required/>
        <input type="password" name="password" placeholder="Contraseña" class="inputs_registro" required/>
        <input type="password" name="password_confirmation" placeholder="Confirmar contraseña" class="inputs_registro" required/>
      </div>

      <!-- Checkbox -->
      <div class="flex items-center mt-4 text-xs text-gray-600 justify-center">
        <input type="checkbox" id="terms" class="mr-2">
        <label for="terms">Acepto términos y condiciones</label>
      </div>

      <!-- Botones -->
      <div class="flex justify-center pt-3 gap-2 flex-nowrap">
        <button type="button" class="btn_negative">Cancelar</button>
        <button type="submit" class="btn_positive">Registrarse</button>
      </div>
    </form>

  </div>
</div>
@endsection
