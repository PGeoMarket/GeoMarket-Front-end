@extends('layouts.app')

@section('content')

<div class="flex items-center justify-center min-h-screen bg-[#F2F8FF] px-4">
  <div class="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm relative border border-gray-200 ">

    <!-- perfil -->
    <div class="flex justify-center mb-6">
      <div class="relative w-32 h-32">
        <img src="{{ asset('svg/icons/profile.svg') }}" alt="Foto de perfil"
             class="w-32 h-32 rounded-full object-cover bg-blue-900" />
        <!--editar -->
        <div class="absolute bottom-2 right-2">
          <img src="{{ asset('svg/icons/edit.svg') }}" alt="Editar"
               class="w-8 h-8 rounded-full bg-white p-1 shadow-md cursor-pointer" />
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <form class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Nombre:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Apellidos:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

        <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Numero:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Correo:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

       <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Contraseña:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 pb-0.5">Dirección:</label>
        <input type="text" class="inputs_registro w-full">
      </div>

      <!-- Mapa de Google -->
      <div class="w-full h-64 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.160176789594!2d-76.48352223851431!3d3.0082367277367377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e307f3134b20a77%3A0xcb8ce9e4a1c72448!2sSENA%20Regional%20Cauca!5e0!3m2!1ses-419!2sco!4v1750977951386!5m2!1ses-419!2sco"
          class="w-full h-full"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <div class="flex justify-center items-center space-x-4 pt-4">
        <button class="btn_negative">Cancelar</button>
        <button class="btn_positive">Guardar</button>
      </div>
    </form>

  </div>
</div>

@endsection
