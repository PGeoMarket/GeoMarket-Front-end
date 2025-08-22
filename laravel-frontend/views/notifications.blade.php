@extends('layouts.app')

@section('content')

    <div class=" bg-white border-3 border-borde1  rounded-lg  relative h-[calc(100vh-(4rem+24px))] z-10 p-2 flex flex-col md:w-1/3 mx-auto">
        <div>
            <img src="{{ asset('svg/icons/back-icon.svg') }}" class="absolute top-2 left-2 cursor-pointer"
                onclick="history.back()">
        </div>
        <p class="text-4xl font-semibold text-azulPotente mx-auto w-fit mt-3 max-h-[100%-5rem]">Notificaciones</p>

        <div class="flex flex-col gap-2 mt-5 h-full overflow-y-scroll">
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div><div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>
            <div class=" bg-white border-3 border-borde1  rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center">
                <img src="{{asset('svg/icons/userProfiel2.svg')}}" alt="">
                <p class="text-textosNoNegro text-[0.9em] ml-2">Nueva publicacion de tienda Deposito santander</p>
                <p class="text-textosNoNegro">hoy</p>
            </div>


        </div>
    </div>
@endsection
