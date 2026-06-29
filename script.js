const data = {
A: [
["Supino máquina","3x 8-12","https://www.youtube.com/results?search_query=machine+chest+press"],
["Puxada alta","3x 8-12","https://www.youtube.com/results?search_query=lat+pulldown"],
["Remada sentada","3x 8-12","https://www.youtube.com/results?search_query=seated+cable+row"],
["Desenvolvimento máquina","2x 10-12","https://www.youtube.com/results?search_query=machine+shoulder+press"],
["Rosca direta","2x 10-12","https://www.youtube.com/results?search_query=barbell+curl"],
["Tríceps corda","2x 10-12","https://www.youtube.com/results?search_query=rope+pushdown"]
],

B: [
["Leg Press","3x 10-12","https://www.youtube.com/results?search_query=leg+press"],
["Mesa flexora","3x 10-12","https://www.youtube.com/results?search_query=lying+leg+curl"],
["Cadeira extensora","2x 12","https://www.youtube.com/results?search_query=leg+extension"],
["Stiff com halteres","2x 10","https://www.youtube.com/results?search_query=romanian+deadlift"],
["Panturrilha","3x 12-15","https://www.youtube.com/results?search_query=standing+calf+raise"],
["Abdominal máquina","2x 12-15","https://www.youtube.com/results?search_query=ab+crunch+machine"]
],

C: [
["Supino inclinado máquina","3x 8-12","https://www.youtube.com/results?search_query=incline+machine+press"],
["Remada máquina","3x 8-12","https://www.youtube.com/results?search_query=machine+row"],
["Puxada neutra","2x 10","https://www.youtube.com/results?search_query=neutral+grip+lat+pulldown"],
["Elevação lateral","2x 12-15","https://www.youtube.com/results?search_query=lateral+raise"],
["Rosca martelo","2x 10-12","https://www.youtube.com/results?search_query=hammer+curl"],
["Tríceps francês","2x 10-12","https://www.youtube.com/results?search_query=overhead+cable+triceps+extension"]
]
};

const tabs = document.getElementById("tabs");
const content = document.getElementById("content");

let treinoAtual = "A";

["A","B","C"].forEach(t => {
    const b = document.createElement("button");
    b.textContent = "Treino " + t;
    b.onclick = () => {
        treinoAtual = t;
        render();
    };
    tabs.appendChild(b);
});

function render(){

    content.innerHTML = "";

    data[treinoAtual].forEach((e,i)=>{

        const key = treinoAtual + i;

        const salvo = JSON.parse(localStorage.getItem(key) || "{}");

        const card = document.createElement("div");

        card.className="card";

        card.innerHTML = `
            <h3>
                <input type="checkbox" ${salvo.done?"checked":""}>
                ${e[0]}
            </h3>

            <p>${e[1]}</p>

            <label>Carga</label><br>
            <input class="carga" value="${salvo.carga||""}"><br><br>

            <label>Repetições</label><br>
            <input class="reps" value="${salvo.reps||""}"><br><br>

            <a target="_blank" href="${e[2]}">▶ Assistir execução</a>
        `;

        const checkbox = card.querySelector("input[type=checkbox]");
        const carga = card.querySelector(".carga");
        const reps = card.querySelector(".reps");

        function salvar(){
            localStorage.setItem(key,JSON.stringify({
                done:checkbox.checked,
                carga:carga.value,
                reps:reps.value
            }));
        }

        checkbox.onchange=salvar;
        carga.oninput=salvar;
        reps.oninput=salvar;

        content.appendChild(card);

    });

}

render();