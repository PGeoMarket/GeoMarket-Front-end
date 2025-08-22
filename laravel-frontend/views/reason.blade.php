@extends('layouts.app')

@section('content')
    <div class="md:w-1/2 md:h-1/3 border border-gray-400 bg-white rounded-2xl p-4">
        <!-- Botón para volver atrás -->
        <button class=" rounded-md border border-white active:bg-[#dad8d8]">
            <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="">
        </button>

        <!-- Campo para escribir el motivo -->
        <div class="mx-2">
            <label for="motivo" class="block text-xl">Motivo:</label>
            <textarea id="motivo" class="w-full h-[8em] border border-gray-400 rounded-lg bg-white"></textarea>
        </div>

        <!-- Botón de acción -->
        <div class="flex justify-end mr-[2em] mt-4">
            <button type="submit" class=" btn_positive ">
                Aceptar
            </button>
        </div>
    </div>
@endsection
