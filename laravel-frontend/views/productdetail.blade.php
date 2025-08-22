@extends('layouts.app')

@section('content')
    <div class="border border-gray-500 bg-white w-[22.56em] h-[111.56em] rounded-md font-sans">
        <button class="rounded-lg w-10 h-10 border-0 mt-4 ml-4 mb-4">
            <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="atras" class="w-[19em]">
        </button>
        <button class="float-right mr-4 mt-4 rounded-lg border-0 w-10 h-10">
            <img src="{{ asset('svg/icons/trespuntos.svg') }}" alt="puntos">
        </button>

        <h2 class="ml-7 mt-[-1px] text-2xl mb-[1em] ">Harina de trigo</h2>

        <!-- Imagen de fondo con asset -->
        <div style="background-image: url('{{ asset('svg/icons/harinadetrigo.svg') }}')"
            class="border border-gray-500 w-[18.32em] h-[19.48em] ml-4 rounded-md bg-cover bg-center relative"></div>

        <!-- Precio y botón favorito alineados -->
        <div class="flex justify-between items-center mt-4 px-4">
            <p class="text-gray-500 text-xl">$1000</p>
            <button class=" bg-transparent mr-[2.5em] ">
                <img src="{{ asset('svg/icons/favoritooscuro.svg') }}" alt="corazon" class="w-6 h-6">
            </button>
        </div>

        <!-- Estrellas -->
        <img class="ml-4 mt-2 w-24" src="{{ asset('svg/icons/stars.svg') }}" alt="estrella">

        <div class="bg-gray-100 w-[20.86em] h-[15.57em] rounded-lg ml-4 mt-4">
            <h2 class="ml-2">Descripción</h2>
            <p class="ml-2">Harina de trigo de alta calidad, ideal para <br> panadería y repostería. Obtén resultados <br>
                perfectos en tus recetas favoritas.</p>
        </div>

        <!-- Usuario vendedor con imagen más pequeña -->
        <div class="bg-gray-300 w-[20.86em] h-[4.31em] ml-4 mt-4 rounded-xl flex items-center">
            <img class="ml-4 w-10 h-10 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}" alt="foto">
            <p class="ml-6 text-center">Alberto Mendoza</p>
        </div>

        <div>
            <button class="bg-[#144467] text-white w-[11.46em] h-[2.35em] mt-8 ml-4 rounded-lg">Ver ubicación</button>
            <iframe class="w-[20.86em] h-[20.86em] p-4 rounded-3xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.160176789594!2d-76.48352223851431!3d3.0082367277367377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e307f3134b20a77%3A0xcb8ce9e4a1c72448!2sSENA%20Regional%20Cauca!5e0!3m2!1ses-419!2sco!4v1750977951386!5m2!1ses-419!2sco"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <button class="bg-[#144467] text-white w-[10em] h-[2.35em] ml-8 rounded-lg">Mandar mensaje</button>
        </div>

        <div>
            <h1 class="ml-2 text-xl font-semibold mt-4">Comentarios</h1>

            <!-- Comentario 1 -->
            <div class="border border-gray-400 w-[20.86em] h-16 ml-2 rounded-lg relative mt-2">
                <img class="ml-1 mt-1 absolute w-8 h-8 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}"
                    alt="">
                <span class="absolute mt-2 ml-10 text-[#144467] font-bold">Marcela Quintero</span>
                <span class="absolute mt-2 right-2 text-sm">Hoy. <br> 5:54 p.m</span>
                <span class="absolute ml-10 mt-8">Buen producto</span>
            </div>

            <!-- Comentario 2 -->
            <div class="border border-gray-400 w-[20.86em] h-16 ml-2 rounded-lg relative mt-2">
                <img class="ml-1 mt-1 absolute w-8 h-8 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}"
                    alt="">
                <span class="absolute mt-2 ml-10 text-[#144467] font-bold">Marcela Quintero</span>
                <span class="absolute mt-2 right-2 text-sm">Hoy. <br> 5:54 p.m</span>
                <span class="absolute ml-10 mt-8">Buen producto</span>
            </div>
        </div>

        <div class="flex items-center mt-4 px-4">
            <input type="text" placeholder="Deja un comentario aqui.." class="w-[20em] h-12 rounded-full px-4">
            <button class="w-12 ml-2 bg-transparent border-0">
                <img src="{{ asset('svg/icons/enviar.svg') }}" alt="" class="w-16">
            </button>
        </div>
    </div>
@endsection
