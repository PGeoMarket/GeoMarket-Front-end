@extends('layouts.app')

@section('content')

<div class="bg-white w-[35em] h-[40em] border border-gray-400 rounded-xl">
  <!-- Botón de retroceso -->
  <button class="ml-4 mt-4 border border-white active:bg-[#dad8d8]">
    <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="">
  </button>

  <!-- Imagen central de soporte -->
  <div class="ml-[14.5em]">
    <img src="{{ asset('svg/icons/soporte.svg') }}" alt="">
  </div>

  <!-- Título principal -->
  <p class="text-center text-[#06406a] font-sans">Soporte y preguntas <br> frecuentes</p>

  <!-- Preguntas frecuentes -->
  <details class="ml-[8.5em] mt-4">
    <summary class="font-sans">¿Cómo puedo publicar un producto?</summary>
    <div class="bg-white w-[20em] h-[4em] border border-gray-400 rounded-xl">
      <p class="ml-2 font-sans">Pues la verdad es que esto es una pantalla, la verdad no sé...</p>
    </div>
  </details>

  <details class="ml-[8.5em] mt-4">
    <summary class="font-sans">¿Cómo puedo publicar un producto?</summary>
    <div class="bg-white w-[20em] h-[4em] border border-gray-400 rounded-xl">
      <p class="ml-2 font-sans">Pues la verdad es que esto es una pantalla, la verdad no sé...</p>
    </div>
  </details>

  <details class="ml-[8.5em] mt-4">
    <summary class="font-sans">¿Cómo puedo publicar un producto?</summary>
    <div class="bg-white w-[20em] h-[4em] border border-gray-400 rounded-xl">
      <p class="ml-2 font-sans">Pues la verdad es que esto es una pantalla, la verdad no sé...</p>
    </div>
  </details>

  <details class="ml-[8.5em] mt-4">
    <summary class="font-sans">¿Cómo puedo publicar un producto?</summary>
    <div class="bg-white w-[20em] h-[4em] border border-gray-400 rounded-xl">
      <p class="ml-2 font-sans">Pues la verdad es que esto es una pantalla, la verdad no sé...</p>
    </div>
  </details>

  <!-- Nota al final -->
  <p class="text-center font-sans mt-6">Si su pregunta no se encuentra, puede enviarla:</p>

  <!-- Área de texto para nueva pregunta -->
  <label>
    <textarea placeholder="Escriba aquí..." class="ml-[7.5em] w-[20em] h-[5em] border border-gray-400 rounded-xl mt-2"></textarea>
  </label>

  <!-- Botón para enviar -->
  <div class="flex justify-end mr-[7em] mt-4">
    <button type="submit" class="bg-[#063E67] text-white w-[6.5em] h-[2.5em] rounded-md hover:bg-[#0369a1]">
      Enviar
    </button>
  </div>
</div>

@endsection