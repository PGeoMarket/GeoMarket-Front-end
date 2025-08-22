@extends('layouts.app')

@section('content')
<div class="bg-white border-3 border-borde1 rounded-lg relative h-[calc(100vh-(4rem+24px))] z-10 p-2 grid grid-rows-[auto_1fr]">

    <!-- Botón de volver -->
    <img src="{{ asset('svg/icons/back-icon.svg') }}" class="absolute top-2 left-2 cursor-pointer" onclick="history.back()">

    <!-- Título -->
    <p class="text-4xl font-semibold text-azulPotente mx-auto w-fit mt-2 md:text-5xl">Chats</p>

    <!-- Contenedor principal: 1 columna en mobile, 2 columnas desde md -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 h-full min-h-0 mt-2">

        <!-- Columna izquierda: lista de chats (siempre visible) -->
        <div class="overflow-y-auto flex flex-col gap-2 pr-1">
            <!-- Chat soporte -->
            <div class="border-3 border-borde1 rounded-lg p-2 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center">
                <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
                    <img src="{{ asset('svg/icons/chatSupport.svg') }}" alt="" class="w-full h-full object-cover" />
                </div>
                <p class="text-azulPotente font-semibold text-[0.9em] mt-1 md:text-[1.2em]">Soporte</p>
                <div class="row-span-2 flex flex-col justify-between items-end h-full self-stretch text-sm text-textosNoNegro">
                    <p>hoy</p>
                    <p>23:25</p>
                </div>
                <p class="text-textosNoNegro text-[0.8em] md:text-[1em]">Juan: valee gracias. uwu</p>
            </div>

            <!-- Más chats -->
            @for ($i = 0; $i < 10; $i++)
                <div class="border-3 border-borde1 rounded-lg p-2 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center">
                    <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
                        <img src="{{ asset('img/florhuila.png') }}" alt="" class="w-full h-full object-cover" />
                    </div>
                    <p class="text-azulPotente font-semibold text-[0.9em] mt-1 md:text-[1.2em]">
                        Nueva publicación de tienda Depósito Santander
                    </p>
                    <div class="row-span-2 flex flex-col justify-between items-end h-full self-stretch text-sm text-textosNoNegro">
                        <p>hoy</p>
                        <p>23:25</p>
                    </div>
                    <p class="text-textosNoNegro text-[0.8em] md:text-[1em]">Juan: valee gracias. uwu</p>
                </div>
            @endfor
        </div>

        <!-- Columna derecha: contenido del chat (solo visible en md en adelante) -->
        <div class="hidden md:block bg-gray-100 rounded-lg p-4">
            
        </div>
    </div>
</div>
@endsection
