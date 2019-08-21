const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/latihan1', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch( err => console.error('Could not connect to MongoDB...', err ));

  const artikelSchema = new mongoose.Schema({
    nama: String,
    nim: Number,
    email: String,
    judul: String,
    tags: [ String ],
    tanggal: { type: Date, default: Date.now},
    isPublished: Boolean
  });

  const Artikel = mongoose.model('Artikel', artikelSchema);

  async function createArtikel() {
    const artikel = new Artikel({
      nama: 'Dimas',
      nim: 09108244034,
      email: 'dimasmillaty@gmail.com',
      judul: 'No SQL Database',
      tags: ['mongo.db', 'backend'],
      isPublished: true
    });

    const result = await artikel.save();
    console.log(result);
  }

  createArtikel();