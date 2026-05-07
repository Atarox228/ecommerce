import ageRestrictionLogo from './assets/logoFass.webp';
import './env.d.ts'

export const content = {
  site: {
    name: 'FASS BEBIDAS',
    title: 'Fass Bebidas | Distribuidora de bebidas',
    copyright: '© 2025 Fass Bebidas. Todos los derechos reservados.',
  },
  routes: {
    home: '/',
    catalogo: '/catalogo',
    carrito: '/carrito',
    edadRestringida: '/edad-restringida',
    promociones: '/#promociones',
    contacto: '/#contacto',
  },
  navLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Carrito', href: '/carrito' },
    // { label: 'Promociones', href: '/#promociones' },
    { label: 'Contacto', href: '/#contacto' },
  ],
  home: {
    hero: {
      title: 'Tus bebidas favoritas al',
      highlight: 'mejor precio',
      description:
        'Distribuidor oficial de vinos, licores, cervezas y bebidas espirituosas. Envíos en el día para tus eventos.',
      ctaLabel: 'Ver Ofertas del Mes',
      ctaHref: '/#promociones',
    },
    categories: {
      title: 'Nuestras Categorías',
      subtitle: 'Explora nuestra selección de bebidas premium y estándar',
    },
    offers: {
      title: 'Ofertas Imperdibles',
      subtitle: 'Aprovecha nuestros descuentos por tiempo limitado',
    },
    combos: {
      title: 'Combos Fiesteros',
      subtitle: 'Todo lo que necesitas para tu juntada en un solo lugar',
      maxItems: 4,
      ctaLabel: 'Ver catálogo completo',
      ctaHref: '/catalogo',
    },
  },
  catalogo: {
    breadcrumbHome: 'Inicio',
    breadcrumbCurrent: 'Catálogo',
    eyebrow: 'Catálogo',
    title: 'Encontrá tu próximo combo con stock y promos reales',
    intro: {
      lead: 'La información sale únicamente de ',
      source: 'catalogo.json',
      middle: ' y se consume mediante ',
      service: 'api.js',
      tail: ', con filtros, ordenamiento y paginación del lado del cliente.',
    },
    stats: {
      products: 'Productos',
      results: 'Resultados',
      maxPrice: 'Precio máximo',
    },
    toolbar: {
      searchLabel: 'Buscar en catálogo',
      searchPlaceholder: 'Buscar por nombre...',
      sortLabel: 'Ordenar por',
      sortOptions: [
        { value: 'destacados', label: 'Destacados' },
        { value: 'precio-asc', label: 'Precio: menor a mayor' },
        { value: 'precio-desc', label: 'Precio: mayor a menor' },
        { value: 'nombre-asc', label: 'Nombre: A a Z' },
      ],
    },
    filters: {
      priceTitle: 'Precio',
      minLabel: 'Mínimo',
      maxLabel: 'Máximo',
      activeRangePrefix: 'Rango activo:',
      stateTitle: 'Estado',
      stateText: 'Se muestran solo productos activos. Las promos sin coincidencia en el mock se ignoran.',
    },
    results: {
      loadingSummary: 'Cargando catálogo...',
      loadingState: 'Cargando los productos del catálogo...',
      emptyState: 'No hay productos que coincidan con los filtros actuales.',
      pagePrefix: 'Página',
      pageSeparator: 'de',
      resultSingular: 'resultado',
      resultPlural: 'resultados encontrados',
      available: 'Disponible para despacho',
      unavailable: 'Sin stock',
    },
    buttons: {
      addToCart: 'Agregar al carrito',
      addAnother: 'Agregar otro',
      prevPageLabel: 'Página anterior',
      nextPageLabel: 'Página siguiente',
    },
    cart: {
      title: 'Carrito de compra',
      subtitle: 'Revisá los productos y luego terminá tu pedido en la página del carrito.',
      emptyState: 'Todavía no agregaste productos al carrito.',
      itemLabel: 'producto',
      itemsLabel: 'productos',
      totalLabel: 'Total',
      clearLabel: 'Vaciar carrito',
      checkoutLabel: 'Ir al carrito',
      payLabel: 'Pagar',
      whatsappNumber: '+54 9 11 5904-5262',
      messageIntro: 'Hola, quiero hacer este pedido:',
      messageFooter: 'Quedo a la espera de la confirmación. Gracias.',
      quantityLabel: 'Cantidad',
      removeLabel: 'Quitar',
      lockMessage: 'Pedido enviado: las cantidades quedaron bloqueadas para mantener la unicidad.',
      paymentTitle: 'Método de pago',
      paymentHint: 'Elegí una opción para habilitar el botón de envío.',
      paymentMethods: [
        { value: 'transferencia', label: 'Transferencia', percentage: 0 },
        { value: 'efectivo', label: 'Efectivo', percentage: -5 },
        { value: 'tarjeta', label: 'Tarjeta', percentage: 2 },
      ],
      sendLabel: 'Enviar pedido',
      sentLabel: 'Pedido enviado',
      restartLabel: 'Crear nuevo pedido',
      cartPageTitle: 'Confirmá tu pedido',
      cartPageIntro: 'Ajustá cantidades, elegí método de pago y enviá tu pedido por WhatsApp.',
    },
  },
  footer: {
    contactTitle: 'Contacto',
    contactItems: [
      // {
      //   label: 'Av. Libertador 1234, Ciudad',
      //   href: 'https://www.google.com/maps/search/Av.+Libertador+1234,+Ciudad',
      //   icon: '📍',
      //   external: true,
      // },
      {
        label: '+54 9 11 3161-5976',
        href: 'tel:+549113161-5976',
        icon: '📞',
      },
      // {
      //   label: 'ventas@fassbebidas.com',
      //   href: 'mailto:ventas@fassbebidas.com',
      //   icon: '📧',
      // },
      {
        label: '@fass.logistica',
        href: 'https://www.instagram.com/fass.logistica/',
        icon: '📱',
        external: true,
      },
    ],
    informationTitle: 'Información',
    informationLinks: [
      { label: 'Términos y Condiciones', href: '#' },
      { label: 'Política de Envíos', href: '#' },
      { label: 'Preguntas Frecuentes', href: '#' },
    ],
  },
  productCard: {
    detailLabel: 'Ver detalle',
    detailHref: '/catalogo',
  },
  ageGate: {
    storageKey: 'fass-age-verification',
    badge: 'Acceso restringido',
    title: 'Confirmá tu edad',
    description: 'Este sitio web está dirigido solo a mayores de 18 años. Elegí una opción para continuar.',
    adultPrompt: 'Soy Mayor de edad (+18)',
    adultAction: 'Entrar',
    minorPrompt: 'Soy Menor de edad (-18)',
    minorAction: 'Salir',
  },
  ageRestriction: {
    logoSrc: ageRestrictionLogo,
    logoAlt: 'Logo de Fass Bebidas',
    message: 'Este sitio web esta dirigido solo a mayor de 18 años',
  },
  // Load mocks only in development to avoid bundling them in production
  catalogoData: (await (async () => {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
      try {
        const mod = await import('./mocks/catalogo.json');
        return mod.default ?? mod;
      } catch (e) {
        return { packs: [], promos: [] };
      }
    }

    return { packs: [], promos: [] };
  })()),
};

export default content;