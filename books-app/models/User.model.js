const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, 'El nombre de usuario es obligatorio.'],
            minlength: [5, 'El nombre de usuario debe tener 5 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El email de usuario es obligatorio.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria.']
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('User', userSchema);
