// ============================================
// Caxambu NoSQL - Fase 2: Consultas y Operaciones MQL
// Base de datos: caxambu-nosql
// ============================================

use("caxambu-nosql");

// -------- PASO 3: CONSULTAS DE LECTURA --------

// 1. Filtrado básico por coincidencia exacta
// Trae todos los pedidos que ya fueron entregados
db.pedidos.find({ estado: "Entregado" });

// 2. Operador de comparación ($lt)
// Trae productos con stock bajo, para alertar reposición
db.productos.find({ stock: { $lt: 10 } });

// 3. Notación de punto sobre campos anidados
// Trae los cafés en grano de origen Colombia
db.productos.find({ "detalles_especialidad.origen": "Colombia" });

// 4. Proyección de campos específicos (excluyendo _id)
// Trae nombre y mail de todos los clientes, sin exponer teléfono ni dirección
db.clientes.find(
  {},
  { _id: 0, nombre: 1, email: 1 }
);

// 5. Filtrado de elementos dentro de un arreglo ($elemMatch)
// Trae pedidos que incluyan un ítem con molienda "Fina (Espresso)"
db.pedidos.find({
  items: { $elemMatch: { variante_molienda: "Fina (Espresso)" } }
});


// -------- PASO 4: OPERACIONES DE ESCRITURA --------

// 1. Actualización con $set: modifica un campo y agrega uno nuevo
// Actualiza el precio de un producto y lo marca en oferta
db.productos.updateOne(
  { _id: "prod_cafe_002" },
  { $set: { precio: 4800.00, en_oferta: true } }
);

// 2. Actualización atómica con $inc: incrementa/decrementa un contador numérico
// Descuenta stock luego de concretar una venta
db.productos.updateOne(
  { _id: "prod_cafe_001" },
  { $inc: { stock: -2 } }
);

// 3. Eliminación segura con deleteOne bajo criterio estricto (_id)
// Elimina un pedido cancelado puntual
db.pedidos.deleteOne(
  { _id: "ped_777889004" }
);
