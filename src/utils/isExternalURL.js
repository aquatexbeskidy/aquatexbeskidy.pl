const isExternal = (link) => ['http', 'mailto:', 'tel:'].some((t) => link.includes(t));

export default isExternal;
