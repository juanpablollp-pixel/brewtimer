export const FLAVOR_WHEEL = [
  {
    id: 'acido', label: 'Ácido', color: '#e2db28', darkText: true,
    children: [
      { id: 'aromaticosacidos', label: 'Aromáticos Ácidos', color: '#c2bf1c', darkText: true, children: [] },
      { id: 'acetico', label: 'Ácido Acético', color: '#a0c88d', darkText: false, children: [] },
      { id: 'butirico', label: 'Ácido Butírico', color: '#d8c709', darkText: true, children: [] },
      { id: 'isovalerico', label: 'Ácido Isovalérico', color: '#71c159', darkText: false, children: [] },
      { id: 'citrico', label: 'Ácido Cítrico', color: '#e6d90f', darkText: true, children: [] },
      { id: 'malico', label: 'Ácido Málico', color: '#b5c524', darkText: true, children: [] },
    ],
  },
  {
    id: 'afrutado', label: 'Afrutado', color: '#ed1c24', darkText: false,
    children: [
      {
        id: 'bayas', label: 'Bayas', color: '#ee2b4b', darkText: false,
        children: [
          { id: 'mora', label: 'Mora', color: '#0b091a', darkText: false, children: [] },
          { id: 'frambuesa', label: 'Frambuesa', color: '#e32a87', darkText: false, children: [] },
          { id: 'arandano', label: 'Arándano', color: '#6769ad', darkText: false, children: [] },
          { id: 'fresa', label: 'Fresa', color: '#ee2a3c', darkText: false, children: [] },
        ],
      },
      {
        id: 'citricos', label: 'Cítricos', color: '#fdb912', darkText: true,
        children: [
          { id: 'pomelo', label: 'Pomelo', color: '#f0595e', darkText: false, children: [] },
          { id: 'naranja', label: 'Naranja', color: '#f37920', darkText: false, children: [] },
          { id: 'limon', label: 'Limón', color: '#f5dc00', darkText: true, children: [] },
          { id: 'lima', label: 'Lima', color: '#92c356', darkText: false, children: [] },
        ],
      },
      {
        id: 'frutossecos', label: 'Frutos Secos', color: '#d8454f', darkText: false,
        children: [
          { id: 'pasauva', label: 'Pasa de Uva', color: '#9e1f79', darkText: false, children: [] },
          { id: 'pasaciruela', label: 'Pasa de Ciruela', color: '#865690', darkText: false, children: [] },
        ],
      },
      {
        id: 'otrasfrutas', label: 'Otras Frutas', color: '#f26649', darkText: false,
        children: [
          { id: 'coco', label: 'Coco', color: '#e58f2b', darkText: false, children: [] },
          { id: 'cereza', label: 'Cereza', color: '#e71359', darkText: false, children: [] },
          { id: 'granada', label: 'Granada', color: '#ef4b60', darkText: false, children: [] },
          { id: 'pina', label: 'Piña', color: '#f99d1c', darkText: false, children: [] },
          { id: 'uva', label: 'Uva', color: '#9fc636', darkText: false, children: [] },
          { id: 'manzana', label: 'Manzana', color: '#69c071', darkText: false, children: [] },
          { id: 'durazno', label: 'Durazno', color: '#f27f51', darkText: false, children: [] },
          { id: 'pera', label: 'Pera', color: '#b3aa20', darkText: true, children: [] },
        ],
      },
    ],
  },
  {
    id: 'cacao', label: 'Cacao', color: '#b27122', darkText: false,
    children: [
      { id: 'chocolateamargo', label: 'Chocolate Amargo', color: '#48271f', darkText: false, children: [] },
      { id: 'chocolate', label: 'Chocolate', color: '#6e2822', darkText: false, children: [] },
    ],
  },
  {
    id: 'dulce', label: 'Dulce', color: '#f26522', darkText: false,
    children: [
      { id: 'aromaticosdu', label: 'Aromáticos Dulces', color: '#ce3f6d', darkText: false, children: [] },
      { id: 'dulcegeneral', label: 'Dulce General', color: '#df717d', darkText: false, children: [] },
      { id: 'aromavainilla', label: 'Aroma de Vainilla', color: '#f47f88', darkText: false, children: [] },
      { id: 'vainilla', label: 'Vainilla', color: '#f6997d', darkText: false, children: [] },
      {
        id: 'azucarmorena', label: 'Azúcar Morena', color: '#cf7e92', darkText: false,
        children: [
          { id: 'miel', label: 'Miel', color: '#f57b28', darkText: false, children: [] },
          { id: 'caramelizado', label: 'Caramelizado', color: '#e1a329', darkText: false, children: [] },
          { id: 'jarabe', label: 'Jarabe de Arce', color: '#d95e26', darkText: false, children: [] },
          { id: 'melaza', label: 'Melaza', color: '#220008', darkText: false, children: [] },
        ],
      },
    ],
  },
  {
    id: 'especias', label: 'Especias', color: '#ba1141', darkText: false,
    children: [
      {
        id: 'especiasmarrones', label: 'Especias Marrones', color: '#be414d', darkText: false,
        children: [
          { id: 'clavo', label: 'Clavo', color: '#b6796e', darkText: false, children: [] },
          { id: 'canela', label: 'Canela', color: '#e79330', darkText: false, children: [] },
          { id: 'nuezmoscada', label: 'Nuez Moscada', color: '#a6181a', darkText: false, children: [] },
          { id: 'anis', label: 'Anís', color: '#caa01c', darkText: true, children: [] },
        ],
      },
      { id: 'pimienta', label: 'Pimienta', color: '#e01a33', darkText: false, children: [] },
      { id: 'acre', label: 'Acre', color: '#734864', darkText: false, children: [] },
    ],
  },
  {
    id: 'fermentado', label: 'Fermentado', color: '#b2a214', darkText: true,
    children: [
      { id: 'avinarado', label: 'Avinado', color: '#a50a71', darkText: false, children: [] },
      { id: 'whisky', label: 'Whisky', color: '#b03a55', darkText: false, children: [] },
      { id: 'fermentadosub', label: 'Fermentado', color: '#d2a90a', darkText: true, children: [] },
      { id: 'sobremaduro', label: 'Sobre Maduro', color: '#817029', darkText: false, children: [] },
    ],
  },
  {
    id: 'floral', label: 'Floral', color: '#ec008b', darkText: false,
    children: [
      { id: 'tenegro', label: 'Té Negro', color: '#ae657f', darkText: false, children: [] },
      {
        id: 'floralsub', label: 'Floral', color: '#ef5892', darkText: false,
        children: [
          { id: 'manzanilla', label: 'Manzanilla', color: '#fcb024', darkText: true, children: [] },
          { id: 'rosa', label: 'Rosa', color: '#e575a8', darkText: false, children: [] },
          { id: 'jazmin', label: 'Jazmín', color: '#fefeea', darkText: true, children: [] },
        ],
      },
    ],
  },
  {
    id: 'nueces', label: 'Nueces', color: '#b7918a', darkText: false,
    children: [
      { id: 'almendra', label: 'Almendra', color: '#d9aa9e', darkText: false, children: [] },
      { id: 'avellana', label: 'Avellana', color: '#955f23', darkText: false, children: [] },
      { id: 'mani', label: 'Maní', color: '#e3b503', darkText: true, children: [] },
    ],
  },
  {
    id: 'otros', label: 'Otros', color: '#0ea7d3', darkText: false,
    children: [
      {
        id: 'quimico', label: 'Químico', color: '#63c7de', darkText: false,
        children: [
          { id: 'goma', label: 'Goma', color: '#011a32', darkText: false, children: [] },
          { id: 'zorrillo', label: 'Zorrillo', color: '#608396', darkText: false, children: [] },
          { id: 'petroleo', label: 'Petróleo', color: '#09a8c1', darkText: false, children: [] },
          { id: 'medicinal', label: 'Medicinal', color: '#5ea9c1', darkText: false, children: [] },
          { id: 'salado', label: 'Salado', color: '#f8fcff', darkText: true, children: [] },
          { id: 'amargo', label: 'Amargo', color: '#6fc8bf', darkText: false, children: [] },
        ],
      },
      {
        id: 'papelhumedad', label: 'Papel / Humedad', color: '#9eb6c0', darkText: false,
        children: [
          { id: 'fenolico', label: 'Fenólico', color: '#e87e8a', darkText: false, children: [] },
          { id: 'carnecaldo', label: 'Carne / Caldo', color: '#ca8277', darkText: false, children: [] },
          { id: 'animal', label: 'Animal', color: '#9bbecd', darkText: false, children: [] },
          { id: 'ranciotierra', label: 'Rancio / Tierra', color: '#948546', darkText: false, children: [] },
          { id: 'ranciopolvo', label: 'Rancio / Polvo', color: '#c8a869', darkText: false, children: [] },
          { id: 'mohoso', label: 'Mohoso / Humedad', color: '#a3ac76', darkText: false, children: [] },
          { id: 'madera', label: 'Madera', color: '#745d27', darkText: false, children: [] },
          { id: 'papel', label: 'Papel', color: '#ffffff', darkText: true, children: [] },
          { id: 'carton', label: 'Cartón', color: '#dbc446', darkText: true, children: [] },
          { id: 'rancio', label: 'Rancio', color: '#667e6d', darkText: false, children: [] },
        ],
      },
    ],
  },
  {
    id: 'tostado', label: 'Tostado', color: '#d23928', darkText: false,
    children: [
      {
        id: 'cereal', label: 'Cereal', color: '#e6be33', darkText: true,
        children: [
          { id: 'malta', label: 'Malta', color: '#eb9c67', darkText: false, children: [] },
          { id: 'grano', label: 'Grano', color: '#d1a68a', darkText: false, children: [] },
        ],
      },
      {
        id: 'quemado', label: 'Quemado', color: '#b7804d', darkText: false,
        children: [
          { id: 'marrontostado', label: 'Marrón / Tostado', color: '#855724', darkText: false, children: [] },
          { id: 'humo', label: 'Humo', color: '#aa7f32', darkText: false, children: [] },
          { id: 'ceniza', label: 'Ceniza', color: '#92a893', darkText: false, children: [] },
          { id: 'acreq', label: 'Acre', color: '#b1a16a', darkText: false, children: [] },
        ],
      },
      { id: 'tabaco', label: 'Tabaco', color: '#d0b580', darkText: true, children: [] },
      { id: 'tabacoPipa', label: 'Tabaco de Pipa', color: '#a59764', darkText: false, children: [] },
    ],
  },
  {
    id: 'vegetal', label: 'Vegetal / Verde', color: '#b1a16a', darkText: false,
    children: [
      { id: 'aceiteoliva', label: 'Aceite de Oliva', color: '#a1b22a', darkText: true, children: [] },
      { id: 'crudo', label: 'Crudo', color: '#6e8c3a', darkText: false, children: [] },
      {
        id: 'verdevegetal', label: 'Verde / Vegetal', color: '#25b156', darkText: false,
        children: [
          { id: 'inmaduro', label: 'Inmaduro', color: '#a8cb48', darkText: true, children: [] },
          { id: 'vaina', label: 'Vaina', color: '#47b54a', darkText: false, children: [] },
          { id: 'fresco', label: 'Fresco', color: '#06ab71', darkText: false, children: [] },
          { id: 'verdeoscuro', label: 'Verde Oscuro', color: '#03613e', darkText: false, children: [] },
          { id: 'vegetalsub', label: 'Vegetal', color: '#1bb06c', darkText: false, children: [] },
          { id: 'heno', label: 'Heno', color: '#a0a025', darkText: false, children: [] },
          { id: 'herbaceo', label: 'Herbáceo', color: '#79c259', darkText: false, children: [] },
        ],
      },
      { id: 'leguminoso', label: 'Leguminoso', color: '#6fa097', darkText: false, children: [] },
    ],
  },
];
