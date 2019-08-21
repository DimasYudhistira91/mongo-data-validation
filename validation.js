const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/latihan1', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch( err => console.error('Could not connect to MongoDB...', err ));

  const artikelSchema = new mongoose.Schema({

    // Built-in Validators
    nama: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
    },
    category: {
      type: String,
      required: true,
      enum: ['D3', 'S1', 'S2']
    },
    // ____________________________________\\

    nim: Number,
    email: String,
    judul: String,

    // Custom Validator
    tags: {
      type: Array,
      validate: {
        validator: function(valid) {
          return valid.length > 0;
        },
        message: 'lengkapi, minimal 1 tag.'
      }
    },
    // ______________________________________\\
    tanggal: { type: Date, default: Date.now},
    isPublished: Boolean,

    // Built-in validator:
    nilai: {
      type: Number,
      required: function() { return this.isPublished; },
      min: 10,
      max: 100
    }
    // jika isPublish true maka nilai wajid di isi
    // ____________________________________________\\
  });

  const Artikel = mongoose.model('Artikel', artikelSchema);

  async function createArtikel() {
    const artikel = new Artikel({
      nama: 'Charlote',
      nim: 09108244453,
      category: 'S1',
      email: 'charlotefamily@gmail.com',
      judul: 'learn express',
      tags: [],
      isPublished: true,
      nilai: 75
    });

    try {
      // await artikel.validate(); // bisa pakai ini
      const result = await artikel.save();
      console.log(result);
    }
    catch (exp) {
      console.log(exp.message);
    }
  }

  createArtikel();

//   async function getArtikel() {
//     const artikel = await Artikel
//     .find({ isPublished: false})
//     .select();
    
//       console.log(artikel);
//   }

//   // getArtikel();

//   // async function updateArtikel(id) {
//   //   const result = await Artikel.update({ _id: id }, {
//   //     $set: {
//   //       email: 'litaalit@gmail.com'
//   //     }
//   //   });
//   //   console.log(result);
//   // }

//   // // // untuk edit sekaligus menampilkan data yang di update pakai ini:
//   // // async function updateArtikel(id) {
//   // //   const artikel = await Artikel.findByIdAndUpdate( id, {
//   // //     $set: {
//   // //       email: 'litaalit@gmail.com'
//   // //     }
//   // //   }, { new: true });
//   // //   console.log(artikel);
//   // // }

//   // updateArtikel('5d5cdd805db463174808592a');


// // REMOVE______________________________________________________________

// // async function removeArtikel(id) {
// //   const result = await Artikel.deleteOne({ _id: id });
// //   console.log(result);
// // }

// async function removeArtikel(id) {
//   const artikel = await Artikel.findByIdAndRemove(id);
//   console.log(artikel);
// }

// removeArtikel('5d5ce2bbdf09401210734d91');