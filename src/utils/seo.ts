interface MetaConfig {
  title: string;
  description: string;
  keywords: string;
}

export const getMetaConfig = (locale: string): MetaConfig => {
  const configs = {
    en: {
      title: 'Tiotecno - China Factory Tour with Independent Sourcing Agent',
      description: 'Professional sourcing service helping you find reliable manufacturers in China. Factory visits, product sourcing, and price negotiations with no hidden fees.',
      keywords: 'China factory tour, sourcing agent, manufacturing, supplier search, factory visit, product sourcing, Chinese manufacturers'
    },
    zh: {
      title: 'Tiotecno - 独立采购代理的中国工厂考察',
      description: '专业采购服务，助您找到可靠的中国制造商。工厂参观、产品采购、价格谈判，无隐藏费用。',
      keywords: '中国工厂考察,采购代理,制造业,供应商寻找,工厂参观,产品采购,中国制造商'
    },
    es: {
      title: 'Tiotecno - Visita a Fábricas en China con Agente de Abastecimiento Independiente',
      description: 'Servicio profesional de abastecimiento que le ayuda a encontrar fabricantes confiables en China. Visitas a fábricas, abastecimiento de productos y negociaciones de precios sin costos ocultos.',
      keywords: 'visita fábrica China, agente abastecimiento, manufactura, búsqueda proveedores, visita fábrica, abastecimiento productos, fabricantes chinos'
    }
  };
  
  return configs[locale] || configs.en;
}; 