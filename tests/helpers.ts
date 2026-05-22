function parseSvg(svg: string): SVGSVGElement {
    const container = document.createElement('div');
    container.innerHTML = svg.trim();
    const svgNode = container.querySelector('svg');
    if (!svgNode) {
        throw new Error('Fixture SVG not found');
    }
    document.body.appendChild(svgNode);
    return svgNode;
}

export { parseSvg };
