import mongoose from 'mongoose';

const MedallaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  icono: { type: String, default: '' },
  fecha_obtenida: { type: Date, default: Date.now }
}, { _id: false });

const ProgresoLeccionesSchema = new mongoose.Schema({
  hijo_id: { type: String, required: true, unique: true, index: true },
  leccion_actual: { type: Number, default: 1 },
  total_clics: { type: Number, default: 0 },
  tiempo_total_segundos: { type: Number, default: 0 },
  medallas: [MedallaSchema]
}, {
  timestamps: true
});

export const ProgresoLeccion =
  mongoose.models.ProgresoLeccion || mongoose.model('ProgresoLeccion', ProgresoLeccionesSchema);
