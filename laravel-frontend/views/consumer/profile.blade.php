@extends('layouts.app')

@section('content')
    <!-- Botón volver -->
        <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="Volver" class="w-10 h-10">
   
    <!-- Card de perfil -->
    <div class="bg-white border border-gray-300 rounded-xl p-6 mx-auto flex flex-col items-center shadow mt-10 w-full max-w-[400px]">
        <!-- icono-perfil y botón editar -->
        <div class="relative mb-6">
            <div class="bg-[#06406A] rounded-full w-36 h-36 flex items-center justify-center">
                <img src="{{ asset('svg/icons/profile.svg') }}" alt="Avatar" class="w-24 h-24">
            </div>
            <button class="absolute bottom-4 right-2 bg-gray-100 rounded-full p-2 shadow cursor-pointer">
                <img src="{{ asset('svg/icons/edit.svg') }}" alt="Editar" class="w-5 h-5">
            </button>
        </div>
        <!-- Formulario de datos -->
        <form class="w-full flex flex-col gap-3">
            <label class="text-gray-700 text-sm">Nombre</label>
            <input type="text" value="Alberto" disabled class="rounded-md border border-gray-300 px-3 py-1 bg-gray-100 text-gray-500 text-base">

            <label class="text-gray-700 text-sm">Apellidos</label>
            <input type="text" value="Mendoza" disabled class="rounded-md border border-gray-300 px-3 py-1 bg-gray-100 text-gray-500 text-base">

            <label class="text-gray-700 text-sm">Correo</label>
            <input type="email" value="AlbertoMendoza@gmail.com" disabled class="rounded-md border border-gray-300 px-3 py-1 bg-gray-100 text-gray-500 text-base">

            <button type="button" class="mt-4 px-4 py-1 rounded-md bg-gray-100 text-[#06406A] border border-gray-300 hover:bg-gray-200 self-center">
                Editar datos
            </button>
        </form>
    </div>

@endsection