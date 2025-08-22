@extends('layouts.app')

@section('content')

<div>
    <div class="border-1 w-[60%] md:w-fit h-screen">
        <!-- Sección superior (perfil) -->
        <div class="bg-white flex flex-col items-center p-4 ">
            <img src="{{ asset('svg/icons/userProfiel.svg') }}" alt="Perfil" class="w-12 h-12 md:w-auto md:h-auto">
            <p class="text-azulPotente text-sm md:text-lg mt-2">pedro picapiedra</p>
            <a href="" class="text-[#4690FF] text-xs md:text-base">Administrador</a>
            <p class="bg-[#06406A] text-white py-1 px-3 md:px-5 w-fit rounded-[16px] mt-2 md:mt-3 text-xs md:text-sm">
                perfil</p>
        </div>

        <!-- Menú -->
        <div class="bg-[#06406A] h-full">
            <div class="p-2 md:p-4">
                <img src="{{ asset('svg/icons/home.svg') }}" class="inline w-7 h-7 md:w-auto md:h-auto">
                <p class="text-white inline text-[1.2em] ml-1 md:text-[1.3em]">Inicio</p>
            </div>
            <div class="p-2 md:p-4">
                <img src="{{ asset('svg/icons/favorites.svg') }}" class="inline w-7 h-7 md:w-auto md:h-auto">
                <p class="text-white inline text-[1.2em] ml-1 md:text-[1.3em]">Favoritos</p>
            </div>
            <div class="p-2 md:p-4 ">
                <img src="{{ asset('svg/icons/notifications.svg')}}" class="inline w-7 h-7 md:w-auto md:h-auto ">
                <p class="text-white inline  text-[1.2em] ml-1 md:text-[1.3em]">Notificaciones</p>
            </div>
            <div class="p-2 md:p-4">
                <img src="{{ asset('svg/icons/messages.svg') }}" class="inline w-7 h-7 md:w-auto md:h-auto">
                <p class="text-white inline  text-[1.2em] ml-1 md:text-[1.3em]">Mensajes</p>
            </div>
            <div class="p-2 md:p-4">
                <img src="{{ asset('svg/icons/controlPanel.svg') }}" class="inline w-7 h-7 md:w-auto md:h-auto">
                <p class="text-white inline  text-[1.2em] ml-1 md:text-[1.3em]">Panel de control</p>
            </div>
            <div class="p-2 md:p-4">
                <img src="{{ asset('svg/icons/support.svg') }}" class="inline w-7 h-7 md:w-auto md:h-auto">
                <p class="text-white inline  text-[1.2em] ml-1 md:text-[1.3em]">Soporte y preguntas frecuentes</p>
            </div>
        </div>
    </div>
</div>

@endsection
