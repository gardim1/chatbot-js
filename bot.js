const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    console.log("Escaneie este QR Code:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Bot está pronto!");
});

client.on("message", async (message) => {
    const msg = message.body.toLowerCase();
    
    if (msg === "oi" || msg === "olá") {
        await message.reply("olá! sou o assistente virtual da nossa pizzaria. 🍕\nEscolha uma opção:\n1️⃣ Fazer um pedido\n2️⃣ Ver nosso cardápio\n3️⃣ Falar com um atendente");
    }
    
    else if (msg === "1") {
        await message.reply("otimo! escolha o sabor da pizza:\n🍕 1 - Calabresa\n🍕 2 - Portuguesa\n🍕 3 - Frango com Catupiry");
    }
    
    else if (msg === "2") {
        await message.reply("nosso cardápio:\n🍕 Calabresa - R$ 30,00\n🍕 Portuguesa - R$ 35,00\n🍕 Frango com Catupiry - R$ 38,00");
    }
    
    else if (msg === "3") {
        await message.reply("Um atendente entrará em contato em breve. Aguarde!");
    }
    
    else {
        await message.reply("Desculpe, não entendi. Digite 'Oi' para ver as opções.");
    }
});

client.initialize();
