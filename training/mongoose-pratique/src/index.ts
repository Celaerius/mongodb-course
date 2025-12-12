import { connect } from 'mongoose';
import { MovieModel } from './schemas/movies_2.ts';

async function init() {
    const connection = await connect('mongodb://root:test123@127.0.0.1:27017/sample_mflix?authSource=admin');

    const movie1 = new MovieModel({
        title: 'Titanique',
        genres: ['Romance', 'Hardcore', 'Family'],
        rated: 'R',
        fullplot: `Deux amants se retrouvent sur un bateau en train de couler, mais au lieu de succomber à la tragédie, ils décident de transformer leur naufrage en une aventure inattendue et passionnée. Alors que les vagues tumultueuses les entourent, l'amour entre eux s'épanouit dans des moments hilarants et érotiques. Avec un mélange de romance, de situations comiques et de rebondissements inattendus, 'Titanique' explore l'idée que même au milieu d'un naufrage, l'amour peut surgir de manière inattendue, prêt à défier les éléments et à créer une histoire d'amour vraiment inoubliable.`
    });

    const movie2 = new MovieModel({
        title: 'TRIPTOK & cie',
        genres: ['Comedy', 'Romance'],
        rated: 'PG-18',
        fullplot: 'Une histoire touchante d\' un patron qui adopte 10 débiles mentaux qui ont des tripes et beaucoup de tocs.'
    });

    // sauvegarder un par un
    // await movie1.save();
    // await movie2.save();

    await MovieModel.bulkSave([movie1, movie2]);

    const matrix = await MovieModel.findOne({
        title: 'The Matrix'
    });

    if (!matrix) {
        throw new Error("La matrice n'existe pas");
    }

    matrix.title = "The Matrique";

    await matrix.save();

    // OU
    await MovieModel.findOneAndUpdate({
        title: 'The Matrix',
    }, {
        $set: {
            title: 'The Matrique'
        }
    });

    // supprime the matrique
    await matrix.deleteOne();

    console.log('Succès !');
}

init();