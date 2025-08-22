@extends('layouts.app') {{-- Extiende la plantilla base llamada "app.blade.php" --}}

@section('content')
    {{-- Inicio de la sección de contenido principal de la vista --}}

    {{-- Contenedor principal del formulario --}}
    <form action="">
        <div class="border-1 border-borde2 bg-blancoSucio rounded-[20px] p-3 h-[calc(100vh-(4rem+24px))] flex flex-col">

            {{-- Botones de acción alineados a la derecha --}}
            <div class="flex justify-end gap-2">
                <button class="btn_negative">Cancelar</button>
                <input type="submit" value="Publicar" class="btn_azulPotente">
            </div>

            <div class="h-full  grid grid-rows-[40%_60%] overflow-scroll md:grid-cols-2 md:grid-rows-none">


                    {{-- Componente Alpine.js para manejar la imagen seleccionada --}}
                    <div x-data="{ image: null }"
                        class="  grid grid-rows-[80%_20%] ">

                        {{-- Vista previa de imagen (icono por defecto o imagen cargada) --}}
                        <div class=" border-1 border-borde1 rounded-2xl my-3 w-fit h-auto md:max-h-[500px] mx-auto">
                            {{-- Muestra un ícono por defecto si no hay imagen cargada --}}
                            <img src="{{ asset('svg/icons/imagePreviewDefault.svg') }}" class="h-full rounded-[14px]"
                                x-show="!image">

                            {{-- Muestra la imagen seleccionada por el usuario --}}
                            <img :src="image" class=" h-full  rounded-[14px]" x-show="image">
                        </div>

                        {{-- Botón para cargar imagen --}}
                        <div class=" mx-auto">
                            <label for="upload" class="cursor-pointer px-4 py-2 btn_azulPotente transition">
                                Cargar imagen
                            </label>
                            {{-- Input oculto que se activa al hacer clic en el label --}}
                            <input type="file" id="upload" class="hidden" accept="image/*"
                                @change='image = URL.createObjectURL($event.target.files[0])'>
                        </div>
                    </div>

                <div class=" grid grid-rows-[auto_1fr] md:p-5">

                    {{-- Inputs para nombre, precio y categoría del producto --}}
                    <div class="flex flex-col  h-fit space-y-4">
                        <input type="text" name="productName"
                            class="inputs_registro"
                            placeholder="Nombre del producto" required>

                        <input type="number" name="productPrice"
                            class="inputs_registro" 
                            placeholder="Precio del producto" required>

                        <div>
                            <label for="" class="text-textosNoNegro">Categoria</label>
                            <select name="" id=""
                                class="bg-[#EDEDED] border-1 border-borde2 p-1 rounded-md mb-3 text-textosNoNegro" required>
                                <option value="electrodomesticos">Electrodomesticos</option>
                                <option value="alimentos">Alimentos</option>
                                <option value="entretenimiento">Entretenimiento</option>
                                <option value="muebles">Muebles</option>
                            </select>
                        </div>
                    </div>

                    <div class=" ">
                        {{-- Textarea para descripción del producto --}}
                        <textarea name="" id="" class="bg-white border-1 border-borde2 p-1 rounded-md w-full h-full"
                            placeholder="Descripcion"></textarea>
                    </div>

                </div>

            </div>

        </div>
    </form>
@endsection
