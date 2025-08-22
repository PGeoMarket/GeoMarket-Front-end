@extends('layouts.app')

@section('content')
    <div class="border border-gray-300 rounded-xl w-fit p-6 self-center mx-auto mt-20">
        <!--icono de regreso-->
        <img src="{{ asset('svg/icons/back-icon.svg') }}" alt="Volver" class="cursor-pointer">

        <!--caja de las opciones-->
        <div class="rounded-xl ">
            <h5 class="text-2xl font-normal text-gray-800 text-center mb-1 mt-2 leading-tight">
                ¿como desea<br>registrarse?
            </h5>
            <!--boton de registro como vendedor-->
            <div
                class="bg-[#06406A] rounded-xl flex-col w-50 p-9 items-center justify-center mb-6 cursor-pointer display-flex flex">
                <img src="{{ asset('svg/icons/store.svg') }}" alt="Vendedor" class="w-12 mb-3">
                <span class="text-white text-lg">Vendedor</span>
            </div>
            <!--boton de registro como consumidor-->
            <div
                class="bg-[#06406A] rounded-xl flex-col w-50 p-9 items-center justify-center mb-6 cursor-pointer display-flex flex">
                <img src="{{ asset('svg/icons/cart.svg') }}" alt="Consumidor" class="w-12 mb-3 cursor-pointer ">
                <span class="text-white text-lg">Consumidor</span>
            </div>
        </div>
    </div>
@endsection
