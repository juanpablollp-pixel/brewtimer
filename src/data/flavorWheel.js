export const FLAVOR_WHEEL = [
  {
    id: 'acido', label: 'Ácido', color: '#e2db28', darkText: true,
    children: [
      { id: 'aromaticosacidos', label: 'Aromáticos Ácidos', color: '#c2bf1c', darkText: true, children: [], description: "Nariz: primer indicio de acidez, como abrir un frasco de pickles. Entrada: hormigueo leve en punta de lengua antes de que aparezca un sabor definido. Medio: acidez difusa que se expande por los laterales sin anclarse en una fruta específica. Final: limpio, sin amargor pronunciado. Diagnóstico: atributo neutro, base de la acidez del café." },
      { id: 'acetico', label: 'Ácido Acético', color: '#a0c88d', darkText: false, children: [], description: "Nariz: punzante, vinagre. Entrada: acidez afilada en punta de lengua, como vinagre diluido. Medio: astringencia en laterales, seca y persistente. Final: reseca la garganta al tragar. Diagnóstico: defecto en dosis notorias. En trazas mínimas puede sumar complejidad en naturales etíopes." },
      { id: 'butirico', label: 'Ácido Butírico', color: '#d8c709', darkText: true, children: [], description: "Nariz: lácteo rancio, queso muy curado. Entrada: acidez extraña, no frutal, que incomoda en punta de lengua. Medio: sensación grasa y agria en laterales. Final: persistente y desagradable. Diagnóstico: defecto. Indica fermentación mal controlada." },
      { id: 'isovalerico', label: 'Ácido Isovalérico', color: '#71c159', darkText: false, children: [], description: "Nariz: intenso, queso añejo, sudor. Entrada: ácido y pungente desde el primer contacto. Medio: invade laterales y centro con una acidez agresiva. Final: largo y desagradable, difícil de limpiar. Diagnóstico: defecto claro. Fermentación defectuosa." },
      { id: 'citrico', label: 'Ácido Cítrico', color: '#e6d90f', darkText: true, children: [], description: "Nariz: limpio, casi neutro. Entrada: acidez limpia y suave en punta de lengua, sin fruta, como un caramelo ácido puro. Medio: se expande suavemente por laterales sin agredir. Final: corto y limpio. Diagnóstico: atributo positivo. Base de la acidez de calidad en cafés de especialidad." },
      { id: 'malico', label: 'Ácido Málico', color: '#b5c524', darkText: true, children: [], description: "Nariz: fresco, levemente frutal. Entrada: acidez viva en punta de lengua, como morder manzana verde. Medio: astringencia leve en laterales, jugosa. Final: limpio con leve sequedad. Diagnóstico: atributo positivo. Común en varietales de altura." },
    ],
  },
  {
    id: 'afrutado', label: 'Afrutado', color: '#ed1c24', darkText: false,
    children: [
      {
        id: 'bayas', label: 'Bayas', color: '#ee2b4b', darkText: false,
        description: "Nariz: mermelada de frutos del bosque, dulce y ácido. Entrada: acidez viva en laterales, como morder una baya cruda. Medio: dulzor frutal sobre base tostada del café. Final: amargo suave, limpio. Diagnóstico: atributo positivo. Señal de varietal de calidad.",
        children: [
          { id: 'mora', label: 'Mora', color: '#0b091a', darkText: false, children: [], description: "Nariz: oscuro, dulce, algo ácido. Entrada: acidez profunda en laterales, como mora madura. Medio: dulzor oscuro sobre fondo tostado. Final: leve amargor persistente. Diagnóstico: atributo positivo en naturales y honey." },
          { id: 'frambuesa', label: 'Frambuesa', color: '#e32a87', darkText: false, children: [], description: "Nariz: frutal y perfumado. Entrada: acidez brillante en laterales, como frambuesa recién mordida. Medio: dulzor ligero sobre base caramelizada. Final: corto y limpio. Diagnóstico: atributo positivo, común en lavados etíopes." },
          { id: 'arandano', label: 'Arándano', color: '#6769ad', darkText: false, children: [], description: "Nariz: oscuro, levemente mohoso y frutal. Entrada: acidez suave en laterales con dulzor discreto. Medio: frutal oscuro sobre fondo tostado. Final: leve astringencia seca. Diagnóstico: atributo positivo en naturales." },
          { id: 'fresa', label: 'Fresa', color: '#ee2a3c', darkText: false, children: [], description: "Nariz: dulce y frutal. Entrada: acidez suave en laterales como fresa recién mordida. Medio: dulzor caramelizado con rastro frutal sobre base del café. Final: limpio, amargo suave. Diagnóstico: atributo muy positivo, altamente codiciado en especialidad." },
        ],
      },
      {
        id: 'citricos', label: 'Cítricos', color: '#fdb912', darkText: true,
        description: "Nariz: cáscara de cítrico frotada, aromático. Entrada: acidez afilada en punta de lengua y laterales. Medio: astringencia cítrica sobre fondo tostado. Final: seco y limpio. Diagnóstico: atributo positivo en lavados de altura.",
        children: [
          { id: 'pomelo', label: 'Pomelo', color: '#f0595e', darkText: false, children: [], description: "Nariz: cáscara de pomelo, amargo y cítrico. Entrada: acidez afilada en laterales con amargor inmediato. Medio: astringencia pronunciada sobre base tostada. Final: amargo persistente en raíz de lengua. Diagnóstico: atributo positivo en dosis moderadas, puede indicar subextracción si es dominante." },
          { id: 'naranja', label: 'Naranja', color: '#f37920', darkText: false, children: [], description: "Nariz: cáscara de naranja, dulce y cítrico. Entrada: acidez suave y dulce en laterales. Medio: cítrico redondo sobre fondo caramelizado del café. Final: limpio y breve. Diagnóstico: atributo muy positivo y accesible para cualquier paladar." },
          { id: 'limon', label: 'Limón', color: '#f5dc00', darkText: true, children: [], description: "Nariz: jugo de limón diluido, fresco. Entrada: acidez viva en laterales y punta de lengua. Medio: cítrico afilado sobre base tostada. Final: seco y limpio. Diagnóstico: atributo positivo, común en lavados centroamericanos." },
          { id: 'lima', label: 'Lima', color: '#92c356', darkText: false, children: [], description: "Nariz: cáscara de lima, verde y afilado. Entrada: acidez más amarga y verde que el limón en laterales. Medio: cítrico penetrante sobre fondo tostado. Final: amargo breve y seco. Diagnóstico: atributo positivo en cafés de altura con alta acidez." },
        ],
      },
      {
        id: 'frutossecos', label: 'Frutos Secos', color: '#d8454f', darkText: false,
        description: "Nariz: oscuro, dulce y concentrado como fruta deshidratada. Entrada: dulzor profundo en punta de lengua. Medio: denso y oscuro sobre base tostada y caramelizada. Final: largo, dulce y levemente amargo. Diagnóstico: atributo positivo en naturales de proceso largo.",
        children: [
          { id: 'pasauva', label: 'Pasa de Uva', color: '#9e1f79', darkText: false, children: [], description: "Nariz: dulce y concentrado, uva seca. Entrada: dulzor denso en punta de lengua con leve acidez. Medio: frutal oscuro sobre fondo tostado. Final: dulce persistente. Diagnóstico: atributo positivo en naturales etíopes y brasileros." },
          { id: 'pasaciruela', label: 'Pasa de Ciruela', color: '#865690', darkText: false, children: [], description: "Nariz: oscuro, mohoso y dulce. Entrada: dulzor profundo con leve acidez en laterales. Medio: denso y oscuro, algo terroso sobre base tostada. Final: largo y algo mohoso. Diagnóstico: atributo positivo en naturales de tueste oscuro." },
        ],
      },
      {
        id: 'otrasfrutas', label: 'Otras Frutas', color: '#f26649', darkText: false,
        description: "Nariz: frutal ligero y floral, sin una fruta definida. Entrada: dulzor suave en punta de lengua. Medio: frutal difuso sobre base caramelizada. Final: limpio y breve. Diagnóstico: atributo positivo general cuando no se puede precisar la fruta.",
        children: [
          { id: 'coco', label: 'Coco', color: '#e58f2b', darkText: false, children: [], description: "Nariz: dulce, algo leñoso y lácteo. Entrada: dulzor suave y untuoso en punta de lengua. Medio: cremoso y algo leñoso sobre base tostada del café. Final: dulce y persistente. Diagnóstico: atributo positivo, común en naturales de Hawái y Panamá." },
          { id: 'cereza', label: 'Cereza', color: '#e71359', darkText: false, children: [], description: "Nariz: frutal y levemente ácido. Entrada: acidez viva en laterales como cereza ácida mordida. Medio: frutal sobre fondo tostado y caramelizado. Final: amargo suave y limpio. Diagnóstico: atributo muy positivo, el café es biológicamente una cereza." },
          { id: 'granada', label: 'Granada', color: '#ef4b60', darkText: false, children: [], description: "Nariz: oscuro, ácido y algo terroso. Entrada: acidez pronunciada en laterales con astringencia. Medio: oscuro y complejo sobre base tostada. Final: astringente y persistente. Diagnóstico: atributo positivo en dosis moderadas en naturales complejos." },
          { id: 'pina', label: 'Piña', color: '#f99d1c', darkText: false, children: [], description: "Nariz: dulce y afilado, tropical. Entrada: acidez brillante y dulce en punta de lengua y laterales. Medio: tropical sobre base caramelizada del café. Final: limpio y breve. Diagnóstico: atributo positivo, común en varietales kenyas y etíopes." },
          { id: 'uva', label: 'Uva', color: '#9fc636', darkText: false, children: [], description: "Nariz: dulce y frutal, algo mohoso. Entrada: dulzor suave con acidez en laterales. Medio: frutal sobre fondo tostado. Final: leve astringencia seca. Diagnóstico: atributo positivo en naturales." },
          { id: 'manzana', label: 'Manzana', color: '#69c071', darkText: false, children: [], description: "Nariz: dulce y frutal, ligero. Entrada: acidez suave en laterales como manzana verde mordida. Medio: frutal ligero sobre base caramelizada. Final: limpio y corto. Diagnóstico: atributo positivo en lavados centroamericanos y colombianos." },
          { id: 'durazno', label: 'Durazno', color: '#f27f51', darkText: false, children: [], description: "Nariz: perfumado, dulce y frutal. Entrada: dulzor suave con acidez discreta en laterales. Medio: frutal y perfumado sobre base tostada del café. Final: dulce y limpio. Diagnóstico: atributo positivo, buscado en lavados de altura." },
          { id: 'pera', label: 'Pera', color: '#b3aa20', darkText: true, children: [], description: "Nariz: dulce, suave y algo mohoso. Entrada: dulzor suave en punta de lengua con leve acidez. Medio: frutal delicado sobre base caramelizada. Final: suave y breve. Diagnóstico: atributo positivo en lavados delicados de baja acidez." },
        ],
      },
    ],
  },
  {
    id: 'cacao', label: 'Cacao', color: '#b27122', darkText: false,
    children: [
      { id: 'chocolateamargo', label: 'Chocolate Amargo', color: '#48271f', darkText: false, children: [], description: "Nariz: cacao intenso, tostado y algo quemado. Entrada: amargo inmediato en punta de lengua. Medio: astringente y seco en laterales, cuerpo pronunciado. Final: amargo largo en raíz de lengua. Diagnóstico: atributo positivo en tuestes oscuros. En tuestes claros indica sobreextracción." },
      { id: 'chocolate', label: 'Chocolate', color: '#6e2822', darkText: false, children: [], description: "Nariz: cacao dulce, tostado medio. Entrada: dulzor suave con amargor discreto en punta de lengua. Medio: redondo y cremoso sobre base tostada. Final: amargo suave y limpio. Diagnóstico: atributo muy positivo y accesible. Común en brasileros y colombianos." },
    ],
  },
  {
    id: 'dulce', label: 'Dulce', color: '#f26522', darkText: false,
    children: [
      { id: 'aromaticosdu', label: 'Aromáticos Dulces', color: '#ce3f6d', darkText: false, children: [], description: "Nariz: galletita dulce recién horneada. Entrada: dulzor suave en punta de lengua. Medio: redondo sobre base caramelizada. Final: corto y limpio. Diagnóstico: atributo positivo, indica buena caramelización del tueste." },
      { id: 'dulcegeneral', label: 'Dulce General', color: '#df717d', darkText: false, children: [], description: "Nariz: cereal azucarado. Entrada: dulzor neutro en punta de lengua. Medio: dulce difuso sobre base tostada. Final: limpio. Diagnóstico: atributo positivo base, presente en cafés bien extraídos." },
      { id: 'aromavainilla', label: 'Aroma de Vainilla', color: '#f47f88', darkText: false, children: [], description: "Nariz: esencia artificial muy dulce. Entrada: dulzor intenso en punta de lengua. Medio: cremoso y algo etéreo. Final: dulce persistente. Diagnóstico: atributo positivo en naturales con fermentación controlada." },
      { id: 'vainilla', label: 'Vainilla', color: '#f6997d', darkText: false, children: [], description: "Nariz: vaina de vainilla, leñoso y especiado. Entrada: dulzor complejo en punta de lengua. Medio: especiado y leñoso sobre base tostada. Final: largo y cálido. Diagnóstico: atributo muy positivo en honey y naturales." },
      {
        id: 'azucarmorena', label: 'Azúcar Morena', color: '#cf7e92', darkText: false,
        description: "Nariz: azúcar rubia, cálido y oscuro. Entrada: dulzor profundo en punta de lengua. Medio: redondo y oscuro sobre base caramelizada. Final: dulce persistente. Diagnóstico: atributo muy positivo en naturales y honey.",
        children: [
          { id: 'miel', label: 'Miel', color: '#f57b28', darkText: false, children: [], description: "Nariz: miel de abeja, dulce y levemente especiado. Entrada: dulzor untuoso en punta de lengua. Medio: cremoso sobre base tostada. Final: dulce y limpio. Diagnóstico: atributo muy positivo, común en proceso honey." },
          { id: 'caramelizado', label: 'Caramelizado', color: '#e1a329', darkText: false, children: [], description: "Nariz: azúcar cocinada, dulce y cálido. Entrada: dulzor redondo en punta de lengua. Medio: caramelo sobre base tostada del café. Final: dulce y limpio sin amargor. Diagnóstico: atributo muy positivo, indica tueste bien ejecutado." },
          { id: 'jarabe', label: 'Jarabe de Arce', color: '#d95e26', darkText: false, children: [], description: "Nariz: maple, dulce y levemente leñoso. Entrada: dulzor denso en punta de lengua. Medio: caramelizado y leñoso sobre base tostada. Final: dulce persistente. Diagnóstico: atributo positivo en naturales de proceso largo." },
          { id: 'melaza', label: 'Melaza', color: '#220008', darkText: false, children: [], description: "Nariz: oscuro, denso y algo acre. Entrada: dulzor intenso con leve acidez en punta de lengua. Medio: oscuro y algo sulfuroso sobre base tostada. Final: persistente y acre. Diagnóstico: atributo positivo en dosis bajas en naturales oscuros. En exceso indica sobrefermentación." },
        ],
      },
    ],
  },
  {
    id: 'especias', label: 'Especias', color: '#ba1141', darkText: false,
    children: [
      {
        id: 'especiasmarrones', label: 'Especias Marrones', color: '#be414d', darkText: false,
        description: "Nariz: mezcla cálida de canela, clavo y nuez moscada. Entrada: dulzor especiado en punta de lengua. Medio: cálido y envolvente sobre base tostada. Final: especiado persistente. Diagnóstico: atributo positivo en naturales y honey de tueste medio.",
        children: [
          { id: 'clavo', label: 'Clavo', color: '#b6796e', darkText: false, children: [], description: "Nariz: clavo de olor, intenso y medicinal. Entrada: especiado y pungente en punta de lengua. Medio: medicinal y floral sobre base tostada. Final: largo e intenso. Diagnóstico: atributo positivo en dosis bajas. En exceso puede indicar fermentación irregular." },
          { id: 'canela', label: 'Canela', color: '#e79330', darkText: false, children: [], description: "Nariz: canela molida, dulce y cálida. Entrada: dulzor especiado en punta de lengua. Medio: cálido sobre base caramelizada. Final: especiado suave. Diagnóstico: atributo muy positivo, común en colombianos y centroamericanos." },
          { id: 'nuezmoscada', label: 'Nuez Moscada', color: '#a6181a', darkText: false, children: [], description: "Nariz: húmedo, denso y algo pesado. Entrada: especiado complejo en punta de lengua. Medio: leñoso y pungente sobre base tostada. Final: persistente y algo petrolero. Diagnóstico: atributo positivo en dosis bajas en naturales complejos." },
          { id: 'anis', label: 'Anís', color: '#caa01c', darkText: true, children: [], description: "Nariz: dulce y caramelizado con algo medicinal. Entrada: dulzor anisado en punta de lengua. Medio: especiado sobre base caramelizada. Final: persistente y algo medicinal. Diagnóstico: atributo positivo en varietales etíopes naturales." },
        ],
      },
      { id: 'pimienta', label: 'Pimienta', color: '#e01a33', darkText: false, children: [], description: "Nariz: pimienta negra recién molida, picante. Entrada: picante suave en punta de lengua. Medio: pungente sobre base tostada. Final: calor en garganta al tragar. Diagnóstico: atributo positivo en tuestes oscuros de cuerpo pronunciado." },
      { id: 'acre', label: 'Acre', color: '#734864', darkText: false, children: [], description: "Nariz: tostadas quemadas, afilado. Entrada: amargo agresivo en punta de lengua. Medio: seco y pungente. Final: amargo largo y desagradable. Diagnóstico: defecto. Indica sobretueste o sobreextracción." },
    ],
  },
  {
    id: 'fermentado', label: 'Fermentado', color: '#b2a214', darkText: true,
    children: [
      { id: 'avinarado', label: 'Avinado', color: '#a50a71', darkText: false, children: [], description: "Nariz: vino tinto, afilado y frutal. Entrada: acidez alcohólica en laterales. Medio: frutal complejo sobre base tostada. Final: rastro alcohólico al tragar. Diagnóstico: atributo positivo en naturales bien fermentados. Defecto si es dominante." },
      { id: 'whisky', label: 'Whisky', color: '#b03a55', darkText: false, children: [], description: "Nariz: destilado de granos, madera y caramelo. Entrada: cálido y alcohólico en punta de lengua. Medio: complejo sobre base tostada. Final: calor persistente en garganta. Diagnóstico: atributo positivo en naturales de fermentación prolongada controlada." },
      { id: 'fermentadosub', label: 'Fermentado', color: '#d2a90a', darkText: true, children: [], description: "Nariz: levadura, dulce y algo ácido. Entrada: acidez extraña en laterales. Medio: pungente sobre base tostada. Final: persistente y algo desagradable. Diagnóstico: defecto en dosis notorias. En trazas mínimas suma complejidad en naturales." },
      { id: 'sobremaduro', label: 'Sobre Maduro', color: '#817029', darkText: false, children: [], description: "Nariz: fruta pasada, dulce y húmedo. Entrada: dulzor extraño con acidez en laterales. Medio: terroso sobre base tostada. Final: húmedo y algo desagradable. Diagnóstico: defecto. Indica fermentación iniciada antes del proceso." },
    ],
  },
  {
    id: 'floral', label: 'Floral', color: '#ec008b', darkText: false,
    children: [
      { id: 'tenegro', label: 'Té Negro', color: '#ae657f', darkText: false, children: [], description: "Nariz: hojas de té oxidadas, marrón y seco. Entrada: astringencia suave en laterales. Medio: seco y algo leñoso sobre base tostada. Final: astringente y persistente. Diagnóstico: atributo positivo en lavados etíopes y kenyas." },
      {
        id: 'floralsub', label: 'Floral', color: '#ef5892', darkText: false,
        description: "Nariz: flores frescas, dulce y delicado. Entrada: dulzor suave y ligero en punta de lengua. Medio: floral sobre base caramelizada. Final: limpio y breve. Diagnóstico: atributo muy positivo, señal de varietal de alta calidad.",
        children: [
          { id: 'manzanilla', label: 'Manzanilla', color: '#fcb024', darkText: true, children: [], description: "Nariz: té de manzanilla, dulce y herbal. Entrada: dulzor suave en punta de lengua. Medio: herbal sobre base tostada. Final: suave y limpio. Diagnóstico: atributo positivo en lavados de altura con fermentación limpia." },
          { id: 'rosa', label: 'Rosa', color: '#e575a8', darkText: false, children: [], description: "Nariz: agua de rosas, delicado y suave. Entrada: dulzor floral en punta de lengua. Medio: floral sobre base caramelizada. Final: limpio y breve. Diagnóstico: atributo muy positivo en geishas y varietales etíopes." },
          { id: 'jazmin', label: 'Jazmín', color: '#fefeea', darkText: true, children: [], description: "Nariz: jazmín en flor, intenso y dulce. Entrada: floral intenso en punta de lengua. Medio: complejo sobre base tostada. Final: persistente y floral. Diagnóstico: atributo muy positivo y codiciado en geishas panameñas y etíopes." },
        ],
      },
    ],
  },
  {
    id: 'nueces', label: 'Nueces', color: '#b7918a', darkText: false,
    children: [
      { id: 'almendra', label: 'Almendra', color: '#d9aa9e', darkText: false, children: [], description: "Nariz: almendra tostada, dulce y mantecoso. Entrada: dulzor suave con leve amargor en punta de lengua. Medio: mantecoso sobre base tostada. Final: amargo suave y limpio. Diagnóstico: atributo muy positivo, común en brasileros y colombianos." },
      { id: 'avellana', label: 'Avellana', color: '#955f23', darkText: false, children: [], description: "Nariz: avellana tostada, dulce y terroso. Entrada: dulzor con leve amargor en punta de lengua. Medio: tostado y algo terroso sobre base caramelizada. Final: amargo suave persistente. Diagnóstico: atributo positivo en tuestes medios." },
      { id: 'mani', label: 'Maní', color: '#e3b503', darkText: true, children: [], description: "Nariz: maní tostado recién horneado, aceitoso y dulce. Entrada: dulzor aceitoso en punta de lengua. Medio: algo terroso sobre base tostada. Final: leve astringencia seca. Diagnóstico: atributo positivo en tuestes medio-oscuros." },
    ],
  },
  {
    id: 'otros', label: 'Otros', color: '#0ea7d3', darkText: false,
    children: [
      {
        id: 'quimico', label: 'Químico', color: '#63c7de', darkText: false,
        description: "Nariz: laboratorio, artificial y penetrante. Entrada: sensación extraña y metálica en punta de lengua. Medio: artificial sobre base tostada. Final: persistente y desagradable. Diagnóstico: defecto. Indica contaminación en proceso o almacenamiento.",
        children: [
          { id: 'goma', label: 'Goma', color: '#011a32', darkText: false, children: [], description: "Nariz: caucho oscuro y pesado. Entrada: amargo extraño en punta de lengua. Medio: pesado y pungente. Final: persistente y desagradable. Diagnóstico: defecto. Indica problemas en el tueste o contaminación." },
          { id: 'zorrillo', label: 'Zorrillo', color: '#608396', darkText: false, children: [], description: "Nariz: sulfuroso y penetrante, imposible de ignorar. Entrada: desagradable desde el primer contacto. Medio: invade toda la boca. Final: muy persistente. Diagnóstico: defecto severo. Indica contaminación química en el proceso." },
          { id: 'petroleo', label: 'Petróleo', color: '#09a8c1', darkText: false, children: [], description: "Nariz: combustible o vaselina, pesado y químico. Entrada: extraño y graso en punta de lengua. Medio: pesado sobre base tostada. Final: persistente y desagradable. Diagnóstico: defecto. Indica contaminación en almacenamiento o transporte." },
          { id: 'medicinal', label: 'Medicinal', color: '#5ea9c1', darkText: false, children: [], description: "Nariz: alcohol o iodo, estéril y penetrante. Entrada: extraño y limpio en punta de lengua. Medio: antiséptico sobre base tostada. Final: persistente. Diagnóstico: defecto. Puede indicar uso de químicos en el proceso o fermentación irregular." },
          { id: 'salado', label: 'Salado', color: '#f8fcff', darkText: true, children: [], description: "Nariz: neutro. Entrada: mineral en punta de lengua. Medio: realza otros sabores sin imponerse. Final: limpio. Diagnóstico: atributo positivo en dosis muy bajas. Realza dulzor y complejidad." },
          { id: 'amargo', label: 'Amargo', color: '#6fc8bf', darkText: false, children: [], description: "Nariz: neutro. Entrada: discreto en punta de lengua. Medio: se afirma en centro y laterales. Final: pronunciado en raíz de lengua, característico del café. Diagnóstico: atributo inherente al café. Defecto solo cuando es agresivo o dominante." },
        ],
      },
      {
        id: 'papelhumedad', label: 'Papel / Humedad', color: '#9eb6c0', darkText: false,
        description: "Nariz: caja de archivos viejos en un depósito sin ventilación. Entrada: neutro y plano en punta de lengua. Medio: cartáceo sobre base tostada. Final: seco y desagradable. Diagnóstico: defecto. Indica café viejo, mal almacenado o filtros contaminados.",
        children: [
          { id: 'fenolico', label: 'Fenólico', color: '#e87e8a', darkText: false, children: [], description: "Nariz: cuero mojado o establo, húmedo y animal. Entrada: extraño y astringente en laterales. Medio: húmedo y pesado sobre base tostada. Final: persistente y desagradable. Diagnóstico: defecto. Indica problemas en fermentación o contaminación." },
          { id: 'carnecaldo', label: 'Carne / Caldo', color: '#ca8277', darkText: false, children: [], description: "Nariz: caldo de carne hirviendo, salado y suave. Entrada: umami suave en centro de lengua. Medio: salado sobre base tostada. Final: persistente y extraño. Diagnóstico: defecto en café. Indica problemas graves en proceso o almacenamiento." },
          { id: 'animal', label: 'Animal', color: '#9bbecd', darkText: false, children: [], description: "Nariz: establo o corral, intenso y penetrante. Entrada: extraño e invasivo. Medio: pesado sobre base tostada. Final: muy persistente. Diagnóstico: defecto severo. Indica contaminación microbiológica." },
          { id: 'ranciotierra', label: 'Rancio / Tierra', color: '#948546', darkText: false, children: [], description: "Nariz: tierra húmeda con hojas en descomposición. Entrada: terroso en punta de lengua. Medio: pesado y húmedo sobre base tostada. Final: persistente y terroso. Diagnóstico: defecto. Indica mal almacenamiento o proceso deficiente." },
          { id: 'ranciopolvo', label: 'Rancio / Polvo', color: '#c8a869', darkText: false, children: [], description: "Nariz: ático cerrado hace años, seco y polvoriento. Entrada: seco y plano en punta de lengua. Medio: polvoriento sobre base tostada. Final: seco y sin vida. Diagnóstico: defecto. Indica café muy viejo o mal almacenado." },
          { id: 'mohoso', label: 'Mohoso / Humedad', color: '#a3ac76', darkText: false, children: [], description: "Nariz: sótano húmedo en invierno, cerrado y levemente verde. Entrada: extraño y húmedo en laterales. Medio: mohoso sobre base tostada. Final: persistente y desagradable. Diagnóstico: defecto. Indica humedad excesiva en almacenamiento o proceso." },
          { id: 'madera', label: 'Madera', color: '#745d27', darkText: false, children: [], description: "Nariz: corteza de árbol, dulce y oscuro. Entrada: seco y leñoso en punta de lengua. Medio: leñoso sobre base tostada. Final: seco y astringente. Diagnóstico: defecto en dosis notorias. Indica café viejo o sobre-almacenado en verde." },
          { id: 'papel', label: 'Papel', color: '#ffffff', darkText: true, children: [], description: "Nariz: filtros de café mojados, neutro. Entrada: plano y cartáceo en punta de lengua. Medio: sin vida sobre base tostada. Final: seco. Diagnóstico: defecto. Indica filtros mal enjuagados o café de baja calidad." },
          { id: 'carton', label: 'Cartón', color: '#dbc446', darkText: true, children: [], description: "Nariz: cartón corrugado mojado. Entrada: plano y cartáceo. Medio: sin cuerpo sobre base tostada. Final: seco y desagradable. Diagnóstico: defecto. Indica oxidación o mal almacenamiento." },
          { id: 'rancio', label: 'Rancio', color: '#667e6d', darkText: false, children: [], description: "Nariz: producto oxidado, sin frescura. Entrada: plano y sin vida en punta de lengua. Medio: apagado sobre base tostada. Final: seco y corto. Diagnóstico: defecto. Indica café muy viejo o mal conservado." },
        ],
      },
    ],
  },
  {
    id: 'tostado', label: 'Tostado', color: '#d23928', darkText: false,
    children: [
      {
        id: 'cereal', label: 'Cereal', color: '#e6be33', darkText: true,
        description: "Nariz: cereales de desayuno tostados, dulce y polvoroso. Entrada: dulzor suave y seco en punta de lengua. Medio: ligero sobre base tostada. Final: corto y limpio. Diagnóstico: atributo positivo en tuestes medios.",
        children: [
          { id: 'malta', label: 'Malta', color: '#eb9c67', darkText: false, children: [], description: "Nariz: cereal oscuro, dulce y algo fermentado. Entrada: dulzor marrón en punta de lengua. Medio: tostado y algo ácido sobre base caramelizada. Final: dulce persistente. Diagnóstico: atributo positivo en tuestes medios a oscuros." },
          { id: 'grano', label: 'Grano', color: '#d1a68a', darkText: false, children: [], description: "Nariz: mezcla de granos de cereal, ligero y polvoroso. Entrada: seco y neutro en punta de lengua. Medio: ligero sobre base tostada. Final: corto y seco. Diagnóstico: atributo positivo en tuestes claros." },
        ],
      },
      {
        id: 'quemado', label: 'Quemado', color: '#b7804d', darkText: false,
        description: "Nariz: maníes quemados, oscuro y agresivo. Entrada: amargo intenso en punta de lengua. Medio: seco y agresivo. Final: amargo muy largo en raíz de lengua. Diagnóstico: defecto. Indica sobretueste.",
        children: [
          { id: 'marrontostado', label: 'Marrón / Tostado', color: '#855724', darkText: false, children: [], description: "Nariz: azúcar rubia con maníes tostados, rico y cálido. Entrada: dulzor oscuro en punta de lengua. Medio: redondo y tostado. Final: amargo suave y dulce persistente. Diagnóstico: atributo muy positivo en tuestes medios a oscuros." },
          { id: 'humo', label: 'Humo', color: '#aa7f32', darkText: false, children: [], description: "Nariz: humo de madera o almendras ahumadas. Entrada: ahumado sutil en punta de lengua. Medio: pungente sobre base tostada. Final: humo persistente en garganta. Diagnóstico: atributo positivo en dosis bajas en tuestes oscuros. Defecto si domina." },
          { id: 'ceniza', label: 'Ceniza', color: '#92a893', darkText: false, children: [], description: "Nariz: ceniza de papel quemado, seco. Entrada: seco y amargo en punta de lengua. Medio: polvoriento sobre base tostada. Final: seco y desagradable. Diagnóstico: defecto. Indica sobretueste severo." },
          { id: 'acreq', label: 'Acre', color: '#b1a16a', darkText: false, children: [], description: "Nariz: cereal sobrecocido, afilado y pungente. Entrada: amargo agresivo en punta de lengua. Medio: pungente y seco. Final: largo y desagradable. Diagnóstico: defecto. Indica sobretueste o sobreextracción severa." },
        ],
      },
      { id: 'tabaco', label: 'Tabaco', color: '#d0b580', darkText: true, children: [], description: "Nariz: tabaco curado sin encender, marrón y dulce. Entrada: amargo suave en punta de lengua. Medio: seco y algo dulce sobre base tostada. Final: persistente y seco. Diagnóstico: atributo positivo en tuestes oscuros de cuerpo pronunciado." },
      { id: 'tabacoPipa', label: 'Tabaco de Pipa', color: '#a59764', darkText: false, children: [], description: "Nariz: tabaco de pipa sin encender, más dulce y frutal. Entrada: dulzor especiado en punta de lengua. Medio: complejo sobre base tostada. Final: persistente y cálido. Diagnóstico: atributo positivo en naturales de tueste oscuro." },
    ],
  },
  {
    id: 'vegetal', label: 'Vegetal / Verde', color: '#b1a16a', darkText: false,
    children: [
      { id: 'aceiteoliva', label: 'Aceite de Oliva', color: '#a1b22a', darkText: true, children: [], description: "Nariz: aceite de oliva extra virgen, untuoso y algo picante. Entrada: graso y suave en punta de lengua. Medio: untuoso sobre base tostada. Final: picante leve en garganta. Diagnóstico: atributo positivo en dosis bajas. Indica cuerpo y textura en el café." },
      { id: 'crudo', label: 'Crudo', color: '#6e8c3a', darkText: false, children: [], description: "Nariz: almendras crudas, verde y sin procesar. Entrada: seco y verde en punta de lengua. Medio: herbáceo sobre base tostada. Final: seco y astringente. Diagnóstico: defecto. Indica subtueste o subextracción." },
      {
        id: 'verdevegetal', label: 'Verde / Vegetal', color: '#25b156', darkText: false,
        description: "Nariz: perejil picado, verde y pungente. Entrada: verde y astringente en laterales. Medio: vegetal sobre base tostada. Final: seco y algo desagradable. Diagnóstico: defecto. Indica subtueste o grano inmaduro.",
        children: [
          { id: 'inmaduro', label: 'Inmaduro', color: '#a8cb48', darkText: true, children: [], description: "Nariz: cáscara de pomelo sin madurar, verde y astringente. Entrada: acidez verde y astringente en laterales. Medio: vegetal y seco sobre base tostada. Final: astringente persistente. Diagnóstico: defecto. Indica grano cosechado antes de madurar." },
          { id: 'vaina', label: 'Vaina', color: '#47b54a', darkText: false, children: [], description: "Nariz: arvejas frescas en vaina, verde y algo terroso. Entrada: verde y suave en punta de lengua. Medio: vegetal dulce sobre base tostada. Final: seco y breve. Diagnóstico: defecto leve. Indica subtueste o grano con maduración irregular." },
          { id: 'fresco', label: 'Fresco', color: '#06ab71', darkText: false, children: [], description: "Nariz: pasto recién cortado, verde y pungente. Entrada: verde y vivo en laterales. Medio: herbáceo sobre base tostada. Final: seco y limpio. Diagnóstico: defecto leve. Indica subtueste o extracción corta." },
          { id: 'verdeoscuro', label: 'Verde Oscuro', color: '#03613e', darkText: false, children: [], description: "Nariz: chauchas o espinaca enlatada, amargo y pesado. Entrada: amargo y vegetal en punta de lengua. Medio: pesado y oscuro sobre base tostada. Final: amargo persistente. Diagnóstico: defecto. Indica grano inmaduro o subtueste pronunciado." },
          { id: 'vegetalsub', label: 'Vegetal', color: '#1bb06c', darkText: false, children: [], description: "Nariz: espárragos enlatados, verde y pungente. Entrada: vegetal y astringente en laterales. Medio: pungente sobre base tostada. Final: seco y desagradable. Diagnóstico: defecto. Indica grano inmaduro o mal procesado." },
          { id: 'heno', label: 'Heno', color: '#a0a025', darkText: false, children: [], description: "Nariz: pasto seco, dulce y polvoroso. Entrada: seco y neutro en punta de lengua. Medio: seco sobre base tostada. Final: corto y seco. Diagnóstico: defecto leve. Indica café viejo o almacenado en condiciones inadecuadas." },
          { id: 'herbaceo', label: 'Herbáceo', color: '#79c259', darkText: false, children: [], description: "Nariz: mezcla de laurel, tomillo y albahaca, complejo. Entrada: herbal y levemente amargo en laterales. Medio: complejo sobre base tostada. Final: herbal persistente. Diagnóstico: atributo positivo en dosis bajas en naturales complejos. Defecto si domina." },
        ],
      },
      { id: 'leguminoso', label: 'Leguminoso', color: '#6fa097', darkText: false, children: [], description: "Nariz: frijoles escurridos, terroso y algo mohoso. Entrada: terroso y seco en punta de lengua. Medio: pesado sobre base tostada. Final: seco y algo desagradable. Diagnóstico: defecto. Indica subtueste o grano de baja calidad." },
    ],
  },
];
