const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Plataformas: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Imagen: {
      type: DataTypes.STRING
    },
    FechaDeLanzamiento:{
      type: DataTypes.DATE
    },
   
    Rating: {
      type: DataTypes.DECIMAL,
    }
    
  });
};  






