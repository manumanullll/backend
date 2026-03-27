import { MongoClient } from "mongodb";

// Substitua pela sua string de conexão do MongoDB Atlas
const url = "mongodb+srv://Manuela:843592Budbeer@cluster0.vikwj6s.mongodb.net/";
const client = new MongoClient(url);

export async function conectarDb() {
    await client.connect();
    return client.db('agenda');
}