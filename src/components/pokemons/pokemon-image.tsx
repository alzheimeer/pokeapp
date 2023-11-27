import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props{
    id: number;
    size?: number;
    backImage: boolean;
    isVisible: boolean;
}

export const PokemonImage = component$(({id, size=200, backImage=false, isVisible=true}: Props) => {

    const imageLoaded = useSignal(false);
     
    useTask$( ({track}) => { 
        track(() => id);

        imageLoaded.value = false;
    })

    let srcImage = '';

    if(backImage){
        srcImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
       
    } else {
        srcImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    
    }
return (
    <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}>

        {!imageLoaded.value && (<span>Cargando...</span>)}
        <img
            src={srcImage}
            alt="pokemon sprite"
            height={size}
            width={size}
            onLoad$={() => imageLoaded.value = true}    
            class={[{
                'hidden': !imageLoaded.value,
                'brightness-0': isVisible
            }, 'transition-all duration-500 ease-in-out']}
        />
    </div>

);
});