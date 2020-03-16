;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.def =
    function(edge, source, target, context, settings) {
      var color = edge.color,
        prefix = settings('prefix') || '',
        size = edge[prefix + 'size'] || 1,
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor');

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }
    size *= settings('edgeHoverSizeRatio');

    context.strokeStyle = color;
    context.lineWidth = size;
    context.beginPath();
    context.moveTo(
      source[prefix + 'x'],
      source[prefix + 'y']
    );
    context.lineTo(
      target[prefix + 'x'],
      target[prefix + 'y']
    );
    context.stroke();
    context.closePath();


    var fontSize,
        edgex = (source[prefix + 'x'] + target[prefix + 'x']) / 2,
        edgey = (source[prefix + 'y'] + target[prefix + 'y']) / 2,
        x, y, w, h, e,

    fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

    context.font = [
        settings('activeFontStyle'),
        fontSize + 'px',
        settings('activeFont') || settings('font')
      ].join(' ');


    context.beginPath();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 8;
    context.shadowColor = settings('labelHoverShadowColor');

    if (edge.label && typeof edge.label === 'string') {
      var x = Math.round(edgex - fontSize / 2 - 2);
      console.log(x)
      console.log(edgex)
      console.log(fontSize)
      var y = Math.round(edgey - fontSize / 2 - 2);
      var  w = Math.round(
        context.measureText(edge.label).width + fontSize / 2 + size + 7
      );
      var h = Math.round(fontSize + 4);
      var e = Math.round(fontSize / 2 + 2);

      console.log(x, y ,w,h,e)
      context.moveTo(x, y + e);
      context.arcTo(x, y, x + e, y, e);
      context.lineTo(x + w, y);
      context.lineTo(x + w, y + h);
      context.lineTo(x + e, y + h);
      context.arcTo(x, y + h, x, y + h - e, e);
      context.lineTo(x, y + e);

      context.closePath();
      context.fillStyle="white"
      context.fill();

      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
    }


    context.beginPath();
    context.fillStyle="black";
    context.fillText(edge.label, edgex+ size + 3, edgey + fontSize / 3);
    // context.fillRect(edgex, edgey, 20, 30);

    // context.fillText(
    //   edge.label,
    //   edgex,
    //   edgey
    // );
  };
})();
