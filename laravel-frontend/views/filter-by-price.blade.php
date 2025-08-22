@extends('layouts.app')

@section('content')
<div class="w-[25.37em] h-[21em] bg-white border border-gray-400 rounded-xl mt-8">
  
  <!-- Botón para volver atrás -->
  <button class="ml-4 mt-4 rounded-md border border-white">
    <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="">
  </button>

  <!-- Título de la sección -->
  <h2 class="text-center font-sans mt-[-1em] text-2xl">Filtrar por precio</h2>

  <!-- Botones de mínimo y máximo -->
  <div class="ml-28 mt-4">
    <button class="bg-[#f6f6f6] text-[#c2c2c2] w-[12.25em] h-[4.56em] rounded-md mb-4 border border-[#c2c2c2]">
      <h3>Minimo</h3>
    </button>
    <button class="bg-[#f6f6f6] text-[#c2c2c2] w-[12.25em] h-[4.56em] rounded-md mb-8 border border-[#c2c2c2]">
      <h3>Maximo</h3>
    </button>
  </div>

  <!-- Botón de acción -->
  <div class="flex justify-end mt-2em  mr-37">
    <button type="submit" class="bg-[#063E67] text-white w-[6.5em] h-[2.5em] rounded-md hover:bg-[#0369a1]">
      Aceptar
    </button>
  </div>
</div>

@endsection