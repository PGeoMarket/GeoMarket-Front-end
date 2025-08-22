@extends('layouts.app')

@section('content')

<div class="w-[39.06em] h-[15.87em] border border-gray-400 rounded-lg mt-8">
  <!-- Botón para volver atrás -->
  <button class="ml-4 mt-4 rounded-md border border-white active:bg-[#dad8d8]">
    <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="">
  </button>

  <!-- Mensaje de confirmación -->
  <p class="font-sans text-2xl text-center mt-4">Ubicación seleccionada <br> correctamente</p>

  <!-- Botón de acción -->
  <div class="flex justify-end mr-[17em] mt-4">
    <button type="submit" class="bg-[#063E67] text-white w-[6.5em] h-[2.5em] rounded-md hover:bg-[#0369a1]">
      Aceptar
    </button>
  </div>
</div>
@endsection