@extends('layouts.app')

@section('content')

<!-- Contenedor principal -->
<div class="bg-white w-full max-w-md mx-auto min-h-[30em] border border-gray-400 relative rounded-2xl p-4 sm:p-6">

  <!-- Fila del título y botón de retroceso -->
  <div class="flex items-center justify-between mb-6">
    <!-- Botón de retroceso -->
    <button class="">
      <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="" class="">
    </button>

    <!-- Título -->
    <h2 class="text-3xl sm:text-4xl font-semibold text-textosNoNegro text-center flex-1">
      Motivo del reporte
    </h2>

    <!-- Espaciador para mantener el título centrado -->
    <div class="w-6 flex-shrink-0"></div>
  </div>

  <!-- Opciones alineadas a la izquierda -->
  <div class="mb-6">
    <div class="flex flex-col items-start text-textosNoNegro space-y-3">
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Producto prohibido</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Información engañosa</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Spam</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Contenido inapropiado</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Producto peligroso</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Práctica comercial sospechosa</span>
      </label>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" class="mr-3 w-4 h-4">
        <span class="text-sm sm:text-base">Otro motivo</span>
      </label>

      <!-- Campo de texto adicional -->
      <input type="text"
             placeholder="Especificar..."
             class="h-10 border border-gray-300 rounded px-3 w-full mt-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
  </div>

  <!-- Botones -->
  <div class="flex justify-end gap-2 mt-8">
    <button class="btn_negative px-4 py-2 text-sm sm:text-base">Cancelar</button>
    <input type="submit" value="Reportar" class="btn_positive px-4 py-2 text-sm sm:text-base">
  </div>

</div>

@endsection
