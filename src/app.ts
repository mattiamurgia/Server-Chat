import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

type Message = { sender: string; body: string };
type Chat = { nameGroup: string; id: (string | number); message: Message[] };


const chats: Chat[] = [{
    "id": 1,
    "nameGroup": "FantaCalcio",
    "message": [{ "sender": "Mattia", "body": "Hello guys" }]
}, {
    "id": 2,
    "nameGroup": "Steve Jobs",
    "message": [{ "sender": "Domenico", "body": "Mi piace la brioscina" }],
},
{
    "id": 3,
    "nameGroup": "Palestra",
    "message": [{ "sender": "Gaetano", "body": "Oggi allenamento" }],
}, {
    "id": 4,
    "nameGroup": "CenaDiGruppo",
    "message": [{ "sender": "Filippo", "body": "Oggi cena di gruppo" }],
},]


// Trattino basso in req perchè non viene utilizzato
app.get("/", function (_: Request, res: Response)
{ res.send("Sono online") });


//Ritorna tutte le chat e se trova un req ti da il filtraggio della chat
app.get("/chats", function (req: Request, res: Response)
{
    let params = req.body;

    if (params)
    {
        const { name } = req.query;
        console.log(name)
        let filterChat = [...chats];

        if (name)
        {
            const filterChat2 = filterChat.filter((chat) => 
            {
                return chat.nameGroup.includes(name as string);
            })
            console.log(filterChat2);
            res.json(filterChat2);
        }
        else res.json(chats)
    }
});


//Cerca le chats con quell id
app.get("/chats/:id", function (req: Request, res: Response)
{
    const chat = chats.find((chat) => chat.id == req.params.id);
    if (chat)
    {
        res.json(chat);
    }
    else res.status(404).json({ message: "Chat non trovata" })
})


//Cerca il messaggio in una chat copiato identico dal prof e riadattato
app.get(
    "/chats/:id/messages",
    ({ params: { id }, query: { text } }: Request, res: Response) =>
    {
        const chat = chats.find((chat) => chat.id === id);
        if (chat)
        {
            if (text)
            {
                res.json(
                    chat.message.filter(({ body: textInMessage }) =>
                        textInMessage.toLowerCase().includes((text as string).toLowerCase())
                    )
                );
            } else
            {
                res.json(chat.message);
            }
        } else
        {
            res.status(404).json({ message: "Chat not found" });
        }
    }
);


//Crea una chat con id random e crea una nuova chat
// nel body se metto {"name":"Pippo"} crea un gruppo con questo nome
app.post("/chats", (req: Request, res: Response) =>
{
    const { name } = req.body;
    const chat: Chat = { nameGroup: name, id: uniqid(), message: [] };
    chats.push(chat);
    res.json(chat);
});


//Inserisce in messaggio nella chat utilizzando sender e body
//Viene inserito in base l'id indicato
app.post("/chats/:id/messages", (req: Request, res: Response) =>
{
    const { sender, body } = req.body;
    const chat = chats.find((chat) => chat.id == req.params.id);
    if (chat)
    {
        chat.message.push({ sender, body });
        res.json(chat);
    } else
    {
        res.status(404).json({ message: "Chat non trovata" });
    }
});



app.listen(3000, () =>
{
    console.log("Sono in ascolto");
})



