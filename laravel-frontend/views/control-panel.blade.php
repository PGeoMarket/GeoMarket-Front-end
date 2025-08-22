@extends('layouts.app')

@section('content')
    <div x-data="{ showChatModal: false, activeTab: 'soporte' }"
        class="bg-white border-3 border-borde1 rounded-lg relative h-[calc(100vh-(4rem+24px))] z-10 p-2 grid grid-rows-[auto_1fr]">

        <div class="flex  items-center justify-between w-1/2">
            <!-- Lado izquierdo: Botón de volver y título -->
            <div class="flex items-center gap-4">
                <img src="{{ asset('svg/icons/back-icon.svg') }}" class="cursor-pointer" onclick="history.back()">
                <p class="text-4xl font-semibold text-azulPotente w-fit mt-2 md:text-5xl ">Chats</p>
            </div>

            <!-- Lado derecho: Botones -->
            <div class="flex gap-2">
                <button @click="activeTab = 'soporte'; showChatModal = false"
                    :class="activeTab === 'soporte' ? 'bg-[#06406A] text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-3 md:px-4 py-1 rounded-md text-xs md:text-sm font-semibold shadow">Soporte</button>
                <button @click="activeTab = 'reportes'; showChatModal = false"
                    :class="activeTab === 'reportes' ? 'bg-[#06406A] text-white' : 'bg-gray-200 text-gray-700'"
                    class="px-3 md:px-4 py-1 rounded-md text-xs md:text-sm font-semibold shadow">Reportes</button>
            </div>
        </div>
        <!-- Contenedor principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 h-full min-h-0 mt-2">

            <!-- Lista de reportes -->
            <div x-show="activeTab === 'reportes'" class="overflow-y-auto flex flex-col gap-2 pr-1">
                <!-- Más chats -->
                @for ($i = 0; $i < 10; $i++)
                    <div @click="window.innerWidth >= 768 ? showChatModal = true : window.location.href = '{{ route('chat.show', ['id' => $i]) }}'"
                        class="border-3 border-borde1 rounded-lg p-2 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center cursor-pointer">
                        <div
                            class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
                            <img src="{{ asset('img/florhuila.png') }}" alt="" class="w-full h-full object-cover" />
                        </div>
                        <p class="text-azulPotente font-semibold text-[1.3em] mt-1 md:text-[1.7em]">
                            Harina xxxxg $xxxxx
                        </p>
                        <div
                            class="row-span-2 flex flex-col justify-between items-end h-full self-stretch text-sm text-textosNoNegro">
                            <p>hoy</p>
                            <p>23:25</p>
                        </div>
                        <p class="text-textosNoNegro text-[0.8em] md:text-[1.3em]">Motivo: contenido engañoso</p>
                    </div>
                @endfor
            </div>

            <!-- Lista de soporte -->
            <div x-show="activeTab === 'soporte'" class="overflow-y-scroll flex flex-col gap-2 pr-1">
                <!-- Más chats -->
                @for ($i = 0; $i < 10; $i++)
                    <div @click="window.innerWidth >= 768 ? showChatModal = true : window.location.href = '{{ route('chat.show', ['id' => $i]) }}'"
                        class="border-3 border-borde1 rounded-lg p-2 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] items-center cursor-pointer">
                        <div
                            class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
                            <img src="{{ asset('svg/icons/userProfiel2.svg') }}" alt=""
                                class="w-full h-full object-cover" />
                        </div>
                        <p class="text-azulPotente font-semibold text-[1.3em] mt-1 md:text-[1.7em]">
                            Camilo Ramos - vendedor
                        </p>
                        <div
                            class="row-span-2 flex flex-col items-center justify-center h-full text-sm text-textosNoNegro ">
                            <p>#342</p>
                        </div>
                        <p class="text-textosNoNegro text-[0.8em] md:text-[1.3em]">Como puedo publicar un producto</p>
                    </div>
                @endfor
            </div>

            <!-- Panel del chat - Solo visible en desktop y cuando activeTab sea 'soporte' -->
            <div x-show="showChatModal && activeTab === 'soporte'" x-cloak
                class="hidden md:block border-1 border-borde1 rounded-lg">
                @include('components.chat-support')
            </div>

            <!-- Panel del chat - Solo visible en desktop y cuando activeTab sea 'soporte' -->

            <div x-show="showChatModal && activeTab === 'reportes'" x-cloak
                class="hidden md:block border border-borde1 rounded-lg h-full overflow-hidden">
                @include('components.chat-report')
            </div>
        </div>
    </div>
@endsection
