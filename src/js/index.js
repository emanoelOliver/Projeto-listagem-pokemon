let pokemonsList = []
let cont = 20
let isVisible = false

async function setPokemonsList(url) {
    const response = await fetch(url)
    const { results } = await response.json()

    await Promise.all(results.map(async (pokemon) => {
        const responseInfo = await fetch(pokemon.url)
        const data = await responseInfo.json()
        const pokemonInfo = {
            abilities: data.abilities.map((value) => {
                return value.ability.name
            }),
            baseExperience: data.base_experience,
            name: data.name,
            id: data.id,
            urlImg: data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: data.types.map((value) => {
                return value.type.name
            }),
            status: data.stats.map((value) => {
                return {
                    atribute: value.stat.name,
                    atributeValue: value.base_stat
                }
            }),
        }
        pokemonsList.push(pokemonInfo)
    }))

    const pokemonsListHTML = pokemonsList.map((pokemon) => {
        return `<li class="cartao-pokemon"><div class="informacoes"><span id="namepokemon">${pokemon.name}</span><span id="idpokemon">#0${pokemon.id}</span></div><img id="pokemon-img" alt="Bulbasaur" src=${pokemon.urlImg} class="gif"><ul class="tipos"><li id="tipo1" class="tipo ${pokemon.types[0]}">${pokemon.types[0]}${pokemon.types[1] ? `<li id="tipo2" class="tipo ${pokemon.types[1]}">${pokemon.types[1]}</li>` : ''}</li></ul><div class="status"><span id="xp" class="descricao">xp base: ${pokemon.baseExperience}</span><span id="hp" class="descricao">${pokemon.status[0].atribute}: ${pokemon.status[0].atributeValue}</span><span id="atk" class="descricao">${pokemon.status[1].atribute}: ${pokemon.status[1].atributeValue}</span><span id="def" class="descricao">${pokemon.status[2].atribute}: ${pokemon.status[2].atributeValue}</span><span id="s-atk" class="descricao">${pokemon.status[3].atribute}: ${pokemon.status[3].atributeValue}</span><span id="s-def" class="descricao">${pokemon.status[4].atribute}: ${pokemon.status[4].atributeValue}</span><span id="spd" class="descricao">${pokemon.status[5].atribute}: ${pokemon.status[5].atributeValue}</span></div></li>`
    }).join('')
    document.getElementById('listagem-card').innerHTML = pokemonsListHTML
}

async function getPokemons() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${cont}&limit=20`
    setPokemonsList(url)
    cont += 20
}

function toggleVisibility() {
    if (window.pageYOffset > 600) {
        document.getElementById('botao-scroll').innerHTML = '<div class="botao-scroll" onclick="scrollToTop()"><img src="./src/imagens/acima.png" alt="Scroll" /></div>'
    } else {
        document.getElementById('botao-scroll').innerHTML = ''
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.onload = async function () {
    setPokemonsList('https://pokeapi.co/api/v2/pokemon')
    window.addEventListener('scroll', toggleVisibility)
}

// ALTERAR TEMA 

const botaoAlterarTema = document.getElementById("botao-alterar-tema")
const body = document.querySelector("body")
const imagemBotaoTrocaDeTema = document.querySelector(".imagem-botao")

botaoAlterarTema.addEventListener("click", () => {
    const modoEscuroEstaAtivo = body.classList.contains("modo-escuro")

    body.classList.toggle("modo-escuro")

    if (modoEscuroEstaAtivo) {
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/imagens/sun.png")
    } else {
        imagemBotaoTrocaDeTema.setAttribute("src", "./src/imagens/moon.png")
    }
})
