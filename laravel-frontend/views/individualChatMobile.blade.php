@extends('layouts.app')

@section('content')
    <div x-data=""
        class="bg-white border-3 border-borde1 rounded-lg relative h-[calc(100vh-(4rem+24px))] z-10 p-2">
        <div class="grid grid-rows-[auto_1fr_auto] h-full">
            <!-- Header -->
            <div class="flex items-center border-b-1 border-borde2 rounded-lg p-2">
                <img src="{{ asset('svg/icons/back-icon.svg') }}" class="cursor-pointer" onclick="history.back()">
                <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
                    <img src="{{ asset('img/florhuila.png') }}" alt="" class="w-full h-full object-cover" />
                </div>
                <p class="text-azulPotente font-semibold text-[1.4em] mt-1 md:text-[2em]">
                    Harina xxxxg $xxxxx (juan)
                </p>
            </div>

            <!-- Cuerpo del chat -->
            <div class="overflow-y-auto p-4 space-y-6">
                <div class="flex justify-center">
                    <p class="text-sm bg-gray-200 text-gray-700 px-4 py-1 rounded-full">Hoy</p>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="max-w-[70%] bg-gray-100 text-black px-4 py-2 rounded-lg w-fit">Hola, ¿cómo estás?</div>
                    <div class="max-w-[70%] bg-azulSecundario text-white px-4 py-2 rounded-lg w-fit self-end">Bien, gracias.
                        ¿Y tú?</div>
                </div>

                <div class="flex justify-center">
                    <p class="text-sm bg-gray-200 text-gray-700 px-4 py-1 rounded-full">Ayer</p>
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="max-w-[70%] bg-gray-100 text-black px-4 py-2 rounded-lg w-fit">Te mandé la foto del
                        producto.</div>
                    <div class="max-w-[70%] bg-azulSecundario text-white px-4 py-2 rounded-lg w-fit self-end">¡Ya la vi!
                        Gracias.</div>
                </div>
            </div>

            <!-- Input del mensaje -->
            <div class="mt-2 p-2 grid grid-cols-[1fr_auto] gap-2">
                <input type="text" class="w-full border border-borde1 rounded-md px-3 py-2"
                    placeholder="Escribe aquí...">
                <img src="{{ asset('svg/icons/enviar.svg') }}" alt="">
            </div>
        </div>


    </div>
@endsection
