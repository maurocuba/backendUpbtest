-- Inventario inicial de la Capsule Corp: solo se inserta si la tabla está vacía
INSERT INTO productos (nombre, categoria, precio, stock)
SELECT * FROM (VALUES
    ('Esfera del Dragón de 4 estrellas', 'Esferas del Dragón', 99999.99, 1),
    ('Esfera del Dragón de 1 estrella', 'Esferas del Dragón', 99999.99, 1),
    ('Semilla del Ermitaño', 'Curación', 1500.00, 12),
    ('Radar del Dragón', 'Tecnología', 25000.00, 3),
    ('Scouter', 'Tecnología', 8000.00, 7),
    ('Cápsula Hoi-Poi (Casa)', 'Cápsulas', 12000.00, 5),
    ('Cápsula Hoi-Poi (Moto)', 'Cápsulas', 4500.00, 0),
    ('Nube Voladora Kinton', 'Transporte', 50000.00, 1),
    ('Báculo Sagrado', 'Armas', 30000.00, 2),
    ('Armadura de combate Saiyajin', 'Vestimenta', 6000.00, 9),
    ('Traje de entrenamiento de Goku', 'Vestimenta', 350.00, 25),
    ('Pesas de entrenamiento 100 kg', 'Entrenamiento', 800.00, 4)
) AS v(nombre, categoria, precio, stock)
WHERE NOT EXISTS (SELECT 1 FROM productos);
