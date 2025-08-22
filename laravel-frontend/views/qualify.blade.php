@extends('layouts.app')

@section('content')
  
  <div class="w-[32.68em] p-4 rounded-md border border-gray-400 bg-white font-sans">
    
    <!-- Encabezado -->
    <div class="flex items-center">
      <button class="rounded-md p-1 hover:bg-gray-200 active:bg-gray-300">
        <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="Atrás" class="w-6 h-6">
      </button>
      <p class="text-2xl ml-4">Calificar</p>
    </div>

    <!-- Estrellas -->
    <div class="flex justify-center mt-8 mb-6 flex-row-reverse">
      <input type="radio" name="star" id="star5" value="5" class="hidden" />
      <label for="star5" class="text-[2.5em] text-blue-900 cursor-pointer transition hover:text-yellow-400 peer-checked:text-yellow-400">&#9733;</label>

      <input type="radio" name="star" id="star4" value="4" class="hidden" />
      <label for="star4" class="text-[2.5em] text-blue-900 cursor-pointer transition hover:text-yellow-400 peer-checked:text-yellow-400">&#9733;</label>

      <input type="radio" name="star" id="star3" value="3" class="hidden" />
      <label for="star3" class="text-[2.5em] text-blue-900 cursor-pointer transition hover:text-yellow-400 peer-checked:text-yellow-400">&#9733;</label>

      <input type="radio" name="star" id="star2" value="2" class="hidden" />
      <label for="star2" class="text-[2.5em] text-blue-900 cursor-pointer transition hover:text-yellow-400 peer-checked:text-yellow-400">&#9733;</label>

      <input type="radio" name="star" id="star1" value="1" class="hidden" />
      <label for="star1" class="text-[2.5em] text-blue-900 cursor-pointer transition hover:text-yellow-400 peer-checked:text-yellow-400">&#9733;</label>
    </div>

    <!-- Botones -->
    <div class="flex justify-end space-x-4">
      <button class="w-32 h-12 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 active:bg-gray-500">
        Cancelar
      </button>
      <button class="w-32 h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800">
        Calificar
      </button>
    </div>

  </div>

  @endsection