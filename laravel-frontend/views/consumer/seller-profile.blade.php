{{-- filepath: c:\xampp\htdocs\laravel_frontend\resources\views\vendedor\profile.blade.php --}}
@extends('layouts.app')

@section('content')
    <div
        class="border border-gray-300 rounded-xl p-2 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6 bg-white shadow h-auto md:h-[calc(100vh-80px)]">
        <!-- Perfil vendedor -->
        <div
            class="w-full md:w-[370px] flex-shrink-0 flex flex-col border border-gray-300 rounded-xl p-4 md:p-6 bg-white relative mb-2 md:mb-0">
            <!-- Botón editar datos -->
            <div x-data="{ open: false }" class="absolute top-2 right-2 z-10">
                                <button @click="open = !open"
                                    class="bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-200 focus:outline-none">
                                    <svg class="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" stroke-width="2"
                                        viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="1.5" />
                                        <circle cx="12" cy="6" r="1.5" />
                                        <circle cx="12" cy="18" r="1.5" />
                                    </svg>
                                </button>
                                <div x-show="open" @click.away="open = false"
                                    class="mt-1 bg-white border rounded shadow px-2 py-1 text-xs absolute  min-w-[80px]"
                                    x-transition>
                                    <button class="block text-[#06406A] hover:underline w-full text-left cursor-pointer">Calificar</button>
                                    <button class="block text-red-500 hover:underline w-full text-left cursor-pointer">Reportar</button>
                                </div>
                            </div>
            <!-- icono perfil -->
            <div class="flex flex-col items-center mb-4 mt-2">
                <div class="bg-[#06406A] rounded-full w-24 h-24 flex items-center justify-center mb-2 relative">
                    <img src="{{ asset('svg/icons/profile.svg') }}" alt="Avatar" class="w-14 h-14">
                    
                </div>
            </div>
            <!-- Info -->
            <div class="text-left w-full mt-2 text-[15px] space-y-1">
                <div><span class="font-bold">Nombre:</span> <br> Don Goku Castañeda</div>
                <div><span class="font-bold">Negocio:</span> <br> Tiendita del dragón</div>
                <div><span class="font-bold">Correo:</span> <br> dongokucastañeda@gmail.com</div>
                <div><span class="font-bold">Telefono:</span> <br> 3001231231</div>
                <div><span class="font-bold">Direccion:</span> <br> Cr 49 No. 134A-07, C.P 11001</div>
            </div>
            <!-- Mapa, botón y estrellas -->
            <div class="flex items-end gap-2 mt-6 w-full mb-8">
                <div class="relative">
                    <img src="{{ asset('img/map.png') }}" alt="Mapa" class="w-40 h-20 rounded-md border object-cover">
                    
                </div>
                <div class="flex ml-auto items-center h-full">
                    <img src="{{ asset('svg/icons/stars.svg') }}" alt="Estrellas" class="h-10">
                </div>
            </div>
        </div>
        <!-- Catálogo y comentarios -->
        <div class="flex-1 flex flex-col min-w-0" x-data="{ tab: 'catalogo' }">
            <!-- Tabs -->
            <div class="flex gap-2 mb-4">
                <button :class="tab === 'catalogo' ? 'bg-[#06406A] text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-5 py-2 rounded-md text-base font-semibold shadow focus:outline-none cursor-pointer"
                    @click="tab = 'catalogo'">Catálogo</button>
                <button :class="tab === 'comentarios' ? 'bg-[#06406A] text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-5 py-2 rounded-md text-base font-semibold shadow focus:outline-none cursor-pointer"
                    @click="tab = 'comentarios'">Comentarios</button>
            </div>
            <!-- Catálogo grid con scroll -->
            <div class="overflow-auto" x-show="tab === 'catalogo'">
                @include('includes.test')
            </div>
            <!-- Comentarios -->
            <div class="flex-1 overflow-y-auto pr-2" x-show="tab === 'comentarios'">
                <div class="flex flex-col gap-3">
                    @for ($i = 0; $i < 16; $i++)
                        <div class="flex items-center border rounded-lg bg-gray-100 shadow px-3 py-2 relative">
                            <img src="{{ asset('svg/icons/profile.svg') }}" class="w-10 h-10 bg-[#06406A] rounded-full mr-3 cursor-pointer"
                                alt="avatar">
                            <div class="flex-1">
                                <div class="font-semibold text-sm text-[#06406A]">@usuario_17</div>
                                <div class="text-xs text-gray-600">¡Hace 1 mes! Todo fácil. ¡Súper! & Goodds</div>
                            </div>
                            <div class="flex items-center ml-2">
                                <img src="{{ asset('svg/icons/stars.svg') }}" alt="" class="h-6">
                            </div>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
@endsection