const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';
async function f() {
    await mongoose.connect(mongoUri);
    const q = ['soc', 'pci', 'hitrust', 'gdpr', 'cmmi', 'vapt'];
    const res = await GRCService.find({
        $or: q.map(t => ({ slug: { $regex: t, $options: 'i' } }))
    }, 'slug');
    res.forEach(r => console.log(r.slug));
    await mongoose.connection.close();
}
f();
