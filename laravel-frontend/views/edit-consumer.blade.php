@extends('layouts.app')

@section('content')

<div class="flex items-center justify-center min-h-screen bg-[#F2F8FF] px-4">
  <div class="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm relative border border-gray-200">

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

      <div class="flex justify-center items-center space-x-4 pt-4">
        <button class="btn_negative">Cancelar</button>
        <button class="btn_positive">Guardar</button>
      </div>
    </form>

  </div>
</div>

@endsection
