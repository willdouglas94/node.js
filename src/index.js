const player1= {
    nome:"Mario",
    velocidade: 4,
    manobrabilidade:3,
    poder: 3,
    pontos: 0,
};

const player2= {
    nome:"Luigi",
    velocidade: 3,
    manobrabilidade:4,  
    poder: 4,
    pontos: 0,
};

const player3= {
    nome:"Peach",
    velocidade: 3,
    manobrabilidade:4,  
    poder: 2,
    pontos: 0,
};

const player4= {
    nome:"Yoshi",
    velocidade: 2,
    manobrabilidade:4,  
    poder: 3,
    pontos: 0,
};

const player5= {
    nome:"Bowser",
    velocidade: 5,
    manobrabilidade:2,      
    poder: 5,
    pontos: 0,
};

const player6= {
    nome:"Donkey Kong",
    velocidade: 2,
    manobrabilidade:2,      
    poder: 5,
    pontos: 0,
};

const player7= {
    nome:"toad",
    velocidade: 3,
    manobrabilidade:3,      
    poder: 4,
    pontos: 0,
};


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "Reta";           
            break;
        case random < 0.66:
            result = "Curva";
            break;
        default:
            result = "Confronto";
            
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${ diceResult + attribute}`);

}

async function playRaceEngine(character1, character2) {
    for(let round=1; round <= 5; round++) {
        console.log(`\nRodada ${round} 🚦🚦...`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);
        // Rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalSkillTest1 = 0;
        let totalSkillTest2 = 0;

        if(block === "Reta") {
            totalSkillTest1 = character1.velocidade + diceResult1;
            totalSkillTest2 = character2.velocidade + diceResult2;

            await logRollResult(character1.nome, "velocidade", diceResult1, character1.velocidade);
            await logRollResult(character2.nome, "velocidade", diceResult1, character2.velocidade);
        }
    
        if(block === "Curva") {
            totalSkillTest1 = character1.manobrabilidade + diceResult1;
            totalSkillTest2 = character2.manobrabilidade + diceResult2;

            await logRollResult(character1.nome, "manobrabilidade", diceResult1, character1.manobrabilidade);
            await logRollResult(character2.nome, "manobrabilidade", diceResult1, character2.manobrabilidade);
    
        }   
    
        if(block === "Confronto") {
            powerResult1 = character1.poder + diceResult1;
            powerResult2 = character2.poder + diceResult2;

            console.log(`${character1.nome} confrontou com o ${character2.nome}! 💥💥`);

            await logRollResult(character1.nome, "poder", diceResult1, character1.poder);
            await logRollResult(character2.nome, "poder", diceResult1, character2.poder);
            
            if(powerResult1 > powerResult2 && character2.pontos > 0){ 
                console.log(`${character1.nome} venceu o confronto! 🏆 ${character2.nome} Perdeu um ponto!🐢`);
                character2.pontos --;
            }

            if(powerResult2 > powerResult1 && character1.pontos > 0){ 
                console.log(`${character2.nome} venceu o confronto! 🏆 ${character1.nome} Perdeu um ponto!🐢`);
                character1.pontos --;
            }

                        
            console.log(
            powerResult1 === powerResult2
                ? "Empate! Nenhum ponto foi perdido."
                :"" 
            );

            
        }    
        
        //verificando o vencedor
        
        if(totalSkillTest1 > totalSkillTest2) {
            console.log(`${character1.nome} marcou um ponto! 🏁`);
            character1.pontos ++;
        }else if(totalSkillTest1 < totalSkillTest2) {
            console.log(`${character2.nome} marcou um ponto! 🏁`);
            character2.pontos ++;
        }
        console.log("----------------------------------");
    }
    
        
}

async function declareWinner(character1, character2) {
    console.log("Resultado final : 🏁🏁");
    console.log(`${character1.nome} : ${character1.pontos} pontos`);
    console.log(`${character2.nome} : ${character2.pontos} pontos`);
    if(character1.pontos > character2.pontos) {
        console.log(`${character1.nome} é o vencedor! Parabéns! 🏆🏆`);
    } else if(character2.pontos > character1.pontos) {
        console.log(`${character2.nome} é o vencedor! Parabéns! 🏆🏆`);
    } else {
        console.log("Empate! Nenhum vencedor.");
    }
}

(async function main() {
    console.log(`Iniciando o jogo entre ${player1.nome} e ${player2.nome} 🏁🏁🚨🚨...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();