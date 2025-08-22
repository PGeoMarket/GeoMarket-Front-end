<div class="grid grid-rows-[auto_1fr] h-full min-h-0">
    <!-- Header -->
    <div class="grid border-b-1 border-borde2 rounded-lg p-2 grid-cols-[auto_auto_1fr]">
        <div class="w-16 h-16 md:w-20 md:h-20 bg-gray-100 overflow-hidden rounded-full shadow row-span-2 mr-1">
            <img src="{{ asset('img/florhuila.png') }}" alt="" class="w-full h-full object-cover" />
        </div>
        <p class="text-azulPotente font-semibold text-[0.9em] mt-1 md:text-[2em]">
            Harina xxxxg $xxxxx (juan)
        </p>
        <div class="row-start-2 col-start-3 flex justify-between items-center">
            <p class="text-sm text-textosNoNegro">#342</p>
            <div class="gap-4">
                <button class="btn_negative ">
                    Rechazar
                </button>
                <button class="btn_negative">
                    Aceptar
                </button>
            </div>
        </div>
    </div>

    <!-- Cuerpo principal con scroll -->
    <div class="flex min-h-0">
        {{-- Informacion del usuario --}}
        <div class="flex-1">
            <div class="bg-white p-4 shadow-md border w-full h-full border-gray-200">
                <!-- perfil -->
                                    <div class="flex justify-end">
                        <ul class="nav" x-data={open:false}>
                            <button class="w-5 h-5 ">
                                <img src="{{ asset('svg/icons/trespuntos.svg') }}" alt="puntos" class="w-6"
                                    x-on:click = "open = !open" x-on:click.away= "open = false">
                            </button>

                            <ul {{-- Filtros --}}
                                class="absolute bg-white text-textosNoNegro min-w-[200px] translate-x-[-85%] text-left"
                                x-show = "open">
                                <li class="filtros">Suspender</li>
                                <li class="filtros">Bloquear</li>
                                <li class="filtros">Advertir</li>
                            </ul>
                        </ul>
                    </div>
                <div class="flex justify-center mb-4">
                    
                    <div class="relative w-24 h-24">
                        <img src="{{ asset('svg/icons/profile.svg') }}" alt="Foto de perfil"
                            class="w-full h-full rounded-full object-cover bg-blue-900" />
                        <div class="absolute bottom-1 right-1">
                            <img src="{{ asset('svg/icons/edit.svg') }}" alt="Editar"
                                class="w-6 h-6 rounded-full bg-white p-1 shadow-md cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del negocio:</label>
                        <input type="text" class="inputs_registro w-full" readonly placeholder="Verdura el Pepe">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                        <input type="text" class="inputs_registro w-full" readonly
                            placeholder="Pepe Castillo Rodriguez">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Número:</label>
                        <input type="text" class="inputs_registro w-full" readonly placeholder="1234566723">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
                        <input type="text" class="inputs_registro w-full" readonly placeholder="pepe@gmail.com">
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Historial de reportes:</label>
                        <div class="bg-gray-100 p-3 rounded-lg grid grid-cols-2 gap-4">

                            <div>

                                <p class="font-medium text-gray-700 mb-1">Recibidos</p>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Reportes</label>
                                    <input type="numer" class="inputs_registro w-full" readonly placeholder="2">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Sanciones</label>
                                    <input type="number" class="inputs_registro w-full" readonly placeholder="0">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Advertencias</label>
                                    <input type="number" class="inputs_registro w-full" readonly placeholder="0">
                                </div>
                            </div>

                            <div>
                                <p class="font-medium text-gray-700 mb-1">Enviados</p>


                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Reportes</label>
                                    <input type="text" class="inputs_registro w-full" readonly placeholder="1">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Dudas</label>
                                    <input type="number" class="inputs_registro w-full" readonly placeholder="0">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Detalles de la publicacion --}}
        <div class="w-[22.56em] h-full overflow-hidden">
            <div class="border border-gray-300 bg-white h-full flex flex-col">


                <div class="overflow-y-auto flex-grow px-4">
                    <div class="flex justify-end">
                        <ul class="nav" x-data={open:false}>
                            <button class="w-5 h-5 ">
                                <img src="{{ asset('svg/icons/trespuntos.svg') }}" alt="puntos" class="w-6"
                                    x-on:click = "open = !open" x-on:click.away= "open = false">
                            </button>

                            <ul {{-- Filtros --}}
                                class="absolute bg-white text-textosNoNegro min-w-[200px] translate-x-[-85%] text-left"
                                x-show = "open">
                                <li class="filtros">Suspender</li>
                                <li class="filtros">Bloquear</li>
                            </ul>
                        </ul>
                    </div>

                    <h2 class="text-xl font-semibold mb-3">Harina de trigo</h2>

                    <img src="{{ asset('svg/icons/harinadetrigo.svg') }}"
                        class="border border-gray-300 w-full h-64 rounded-md mb-4">
                    </img>

                    <div class="flex justify-between items-center mb-4">
                        <p class="text-gray-500 text-xl">$1000</p>
                        <button>
                            <img src="{{ asset('svg/icons/favoritooscuro.svg') }}" alt="corazon" class="w-6 h-6">
                        </button>
                    </div>

                    <div class="mb-4">
                        <img class="w-24" src="{{ asset('svg/icons/stars.svg') }}" alt="estrella">
                    </div>

                    <div class="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 class="font-medium mb-2">Descripción</h2>
                        <p>Harina de trigo de alta calidad, ideal para panadería y repostería.</p>
                    </div>

                    <div class="flex items-center p-3 bg-gray-100 rounded-xl mb-4">
                        <img class="w-10 h-10 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}"
                            alt="foto">
                        <p class="ml-4">Alberto Mendoza</p>
                    </div>

                    <div class="mb-4">
                        <button class="btn_azulPotente w-full mb-3">Ver ubicación</button>
                        <iframe class="w-full h-64 rounded-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.160176789594!2d-76.48352223851431!3d3.0082367277367377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e307f3134b20a77%3A0xcb8ce9e4a1c72448!2sSENA%20Regional%20Cauca!5e0!3m2!1ses-419!2sco!4v1750977951386!5m2!1ses-419!2sco"
                            allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <button class="btn_azulPotente w-full mt-3">Mandar mensaje</button>
                    </div>

                    <div class="mb-4">
                        <h1 class="text-xl font-semibold mb-3">Comentarios</h1>

                        <div class="space-y-3">
                            <div class="border border-gray-300 p-3 rounded-lg">
                                <div class="flex items-center">
                                    <img class="w-8 h-8 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}"
                                        alt="">
                                    <span class="ml-2 font-bold text-azulPotente">Marcela Quintero</span>
                                    <span class="ml-auto text-sm text-gray-500">Hoy 5:54 p.m</span>
                                </div>
                                <p class="mt-2">Buen producto</p>
                            </div>

                            <div class="border border-gray-300 p-3 rounded-lg">
                                <div class="flex items-center">
                                    <img class="w-8 h-8 rounded-full" src="{{ asset('svg/icons/userProfiel.svg') }}"
                                        alt="">
                                    <span class="ml-2 font-bold text-azulPotente">Carlos Pérez</span>
                                    <span class="ml-auto text-sm text-gray-500">Ayer 8:21 p.m</span>
                                </div>
                                <p class="mt-2">Excelente calidad</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center mb-4">
                        <input type="text" placeholder="Deja un comentario aqui.."
                            class="flex-grow h-12 rounded-full px-4 border border-gray-300">
                        <button class="w-10 ml-2">
                            <img src="{{ asset('svg/icons/enviar.svg') }}" alt="" class="w-5 h-5">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
