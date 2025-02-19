const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
});

let usuariosAtivos = {}; 
const TEMPO_LIMITE = 20 * 60 * 1000; 

client.on("qr", (qr) => {
    console.log("qrcode: ");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("bot pronto meu mano");
});

client.on("message", async (message) => {
    const userId = message.from; 
    const msg = message.body.toLowerCase();

    if (!usuariosAtivos[userId]) {
        usuariosAtivos[userId] = { ativo: true, ultimaMensagem: Date.now() }; //esses emoji foram uma merda, pedi pro chat colocar todos
        await message.reply("Olá! Bem-vindo ao nosso atendimento. Escolha uma opção:\n1️⃣ Fazer um pedido\n2️⃣ Ver cardápio\n3️⃣ Falar com atendente");
        return;
    }

    usuariosAtivos[userId].ultimaMensagem = Date.now();

    switch (msg) {
        case "1":
            await message.reply("Ótimo! Escolha o sabor:\n🍕 1 - Calabresooo\n🍕 2 - Portuguesa\n🍕 3 - Frango com Catupiry");
            break;

        case "2":
            await message.reply("Nosso cardápio:\n🍕 Calabresa - R$ 30,00\n🍕 Portuguesa - R$ 35,00\n🍕 Frango com Catupiry - R$ 38,00");
            break;

        case "3":
            await message.reply("Um atendente entrará em contato em breve. 📞");
            break;

        default:
            await message.reply("Não entendi. Digite 'Oi' para começar.");
            break;
    }
});

setInterval(() => {
    const agora = Date.now();
    
    for (let userId in usuariosAtivos) {
        if (agora - usuariosAtivos[userId].ultimaMensagem > TEMPO_LIMITE) {
            client.sendMessage(userId, "Sua sessão foi encerrada por inatividade. Digite 'Oi' para começar de novo. 👋");
            delete usuariosAtivos[userId]; 
        }
    }
}, 60 * 1000);

client.initialize();
