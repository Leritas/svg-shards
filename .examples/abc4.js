// Projective Geometry and Rendering System
// Part of refactored abc2.js - Projective Geometry and Rendering

class ProjectiveGeometry {
  constructor(geometry) {
    this.geometry = geometry;
  }

  collinearity(result, line, point, att, sign1, sign2) {
    if (point.type !== 'P' && point.type !== 'O') {
      return false;
    }

    if (point.type === 'P') {
      return this.calculateCollinearity(result, line, point, att, sign1, 1);
    } else if (point.type === 'O') {
      return this.lineCollinearity(result, line, point, att, sign1, sign2);
    }

    return false;
  }

  calculateCollinearity(result, line, point, att, sign1, sign2) {
    const pointOnLine = this.geometry.cloneObject(point);
    pointOnLine.attributes = att.clone();

    const direction = sign2 === 1 ? 1 : -1;

    const x1 = this.geometry.projectPointToLine(point, line);
    if (x1) {
      pointOnLine.x = x1.x;
      pointOnLine.y = x1.y;
    } else {
      pointOnLine.x = point.x;
      pointOnLine.y = point.y;
    }

    return pointOnLine;
  }

  lineCollinearity(result, line, targetLine, att, sign1, sign2) {
    const p1 = this.geometry.cloneObject(targetLine);
    const p2 = this.geometry.cloneObject(targetLine);

    p1.x = targetLine.x1;
    p1.y = targetLine.y1;
    p2.x = targetLine.x2;
    p2.y = targetLine.y2;

    const collin1 = this.calculateCollinearity(result, line, p1, att, sign1, sign2);
    const collin2 = this.calculateCollinearity(result, line, p2, att, sign1, sign2);

    return this.geometry.createLine(
      collin1.x, collin1.y, collin1.weight,
      collin2.x, collin2.y, collin2.weight,
      targetLine.bounded, targetLine.type, att
    );
  }

  correlation(result, line1, line2, att, sign1, sign2) {
    if (line2.type !== 'P' && line2.type !== 'O') {
      return false;
    }

    const points = this.extractLineEndpoints(line2);
    const correl1 = this.calculateCollinearity(result, line1, points.p1, att, sign1, sign2);
    const correl2 = this.calculateCollinearity(result, line1, points.p2, att, sign1, sign2);

    return this.geometry.createLine(
      correl1.x, correl1.y, correl1.weight,
      correl2.x, correl2.y, correl2.weight,
      false, "sobstv", att
    );
  }

  extractLineEndpoints(obj) {
    let p1, p2;

    if (obj.type === 'O') {
      p1 = {
        x: obj.x1,
        y: obj.y1,
        weight: 1,
        attributes: obj.attributes
      };
      p2 = {
        x: obj.x2,
        y: obj.y2,
        weight: 1,
        attributes: obj.attributes
      };
    } else if (obj.type === 'P') {
      p1 = {
        x: obj.x,
        y: obj.y,
        weight: obj.weight,
        attributes: obj.attributes
      };
      p2 = {
        x: obj.x,
        y: obj.y,
        weight: 0,
        attributes: obj.attributes
      };
    }

    return { p1, p2 };
  }

  completeQuadrilateral(result, a, b, att, sign1, sign2) {
    const pointsA = this.extractLineEndpoints(a);
    const pointsB = this.extractLineEndpoints(b);

    const p1 = this.geometry.cloneObject(pointsA.p1);
    const p2 = this.geometry.cloneObject(pointsA.p2);
    const p3 = this.geometry.cloneObject(pointsB.p1);
    const p4 = this.geometry.cloneObject(pointsB.p2);

    const q1 = this.geometry.lineIntersection(
      this.geometry.createLine(p1.x, p1.y, 1, p3.x, p3.y, 1, false, "sobstv", att),
      this.geometry.createLine(p2.x, p2.y, 1, p4.x, p4.y, 1, false, "sobstv", att)
    );

    const q2 = this.geometry.lineIntersection(
      this.geometry.createLine(p1.x, p1.y, 1, p4.x, p4.y, 1, false, "sobstv", att),
      this.geometry.createLine(p2.x, p2.y, 1, p3.x, p3.y, 1, false, "sobstv", att)
    );

    const q3 = this.geometry.lineIntersection(
      this.geometry.createLine(p1.x, p1.y, 1, p2.x, p2.y, 1, false, "sobstv", att),
      this.geometry.createLine(p3.x, p3.y, 1, p4.x, p4.y, 1, false, "sobstv", att)
    );

    return this.geometry.createCollinearity(
      p1, p2, p3, p4,
      q1.x, q1.y, q2.x, q2.y, att
    );
  }

  harmonicConjugate(result, line, p1, p2, p3, att, sign1, sign2) {
    const points1 = this.extractLineEndpoints(line);
    const points2 = this.extractLineEndpoints(p1);
    const points3 = this.extractLineEndpoints(p2);
    const points4 = this.extractLineEndpoints(p3);

    const x1 = points1.p1.x.re;
    const y1 = points1.p1.y.re;
    const x2 = points1.p2.x.re;
    const y2 = points1.p2.y.re;

    const x3 = points2.p1.x.re;
    const y3 = points2.p1.y.re;
    const x4 = points2.p2.x.re;
    const y4 = points2.p2.y.re;

    const numerator = (x3 - x1) * (x4 - x2);
    const denominator = (x4 - x1) * (x3 - x2);

    let ratio = 0;
    if (Math.abs(denominator) > 0.001) {
      ratio = numerator / denominator;
    }

    const x5 = (x1 + ratio * x2) / (1 + ratio);
    const y5 = (y1 + ratio * y2) / (1 + ratio);

    return this.geometry.createPoint(
      new Complex(x5, 0),
      new Complex(y5, 0),
      1,
      att
    );
  }
}

class GraphicalRenderer {
  constructor(geometry, screenConfig) {
    this.geometry = geometry;
    this.screenConfig = screenConfig;
    this.canvas = null;
    this.context = null;
  }

  initialize(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.updateCanvasSize();
  }

  updateCanvasSize() {
    if (!this.canvas) return;

    this.canvas.width = this.screenConfig.xScreenMax - this.screenConfig.xScreenMin;
    this.canvas.height = this.screenConfig.yScreenMax - this.screenConfig.yScreenMin;
  }

  worldToScreen(worldX, worldY) {
    const scaleX = this.canvas.width / (this.screenConfig.xScreenMax - this.screenConfig.xScreenMin);
    const scaleY = this.canvas.height / (this.screenConfig.yScreenMax - this.screenConfig.yScreenMin);

    const screenX = (worldX - this.screenConfig.xScreenMin) * scaleX;
    const screenY = (worldY - this.screenConfig.yScreenMin) * scaleY;

    return { x: screenX, y: screenY };
  }

  draw(objects) {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    objects.forEach(obj => {
      try {
        this.drawObject(obj);
      } catch (e) {
        console.error('Error drawing object:', e);
      }
    });
  }

  drawObject(obj) {
    if (!obj || obj.type === '$') return;

    const attributes = obj.attributes;

    switch (obj.type) {
      case 'P':
        this.drawPoint(obj, attributes);
        break;
      case 'O':
        this.drawLine(obj, attributes);
        break;
      case 'D':
        this.drawArc(obj, attributes);
        break;
      case 'W':
        this.drawContour(obj, attributes);
        break;
      case 'K':
      case 'k':
        this.drawRelation(obj, attributes);
        break;
      default:
        console.warn('Unknown object type:', obj.type);
    }
  }

  drawPoint(point, attributes) {
    if (!this.isReal(point)) return;

    const start = this.worldToScreen(point.x.re, point.y.re);

    this.context.save();
    this.setObjectStyle(attributes);

    const radius = point.weight === 1 ? 4 : 6;

    this.context.beginPath();
    this.context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
    this.context.fill();

    if (point.selected) {
      this.context.strokeStyle = '#ff0000';
      this.context.lineWidth = 2;
      this.context.stroke();
    }

    this.context.restore();
  }

  drawLine(line, attributes) {
    if (!this.isReal(line)) return;

    const start = this.worldToScreen(line.x1.re, line.y1.re);
    const end = this.worldToScreen(line.x2.re, line.y2.re);

    this.context.save();
    this.setObjectStyle(attributes);

    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();

    if (line.selected) {
      this.context.strokeStyle = '#ff0000';
      this.context.lineWidth = 2;
      this.context.stroke();
    }

    this.context.restore();
  }

  drawArc(arc, attributes) {
    if (!this.isReal(arc)) return;

    const center = this.worldToScreen(arc.center.re, arc.center.re);
    const startX = this.worldToScreen(arc.center.re + arc.radius.re, arc.center.re);
    const endX = center;

    this.context.save();
    this.setObjectStyle(attributes);

    const radius = Math.sqrt(
      Math.pow(startX.x - center.x, 2) +
      Math.pow(startX.y - center.y, 2)
    );

    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.context.stroke();

    if (arc.selected) {
      this.context.strokeStyle = '#ff0000';
      this.context.lineWidth = 2;
      this.context.stroke();
    }

    this.context.restore();
  }

  drawContour(contour, attributes) {
    if (!contour.lines || contour.lines.length === 0) return;

    this.context.save();
    this.setObjectStyle(attributes);

    contour.lines.forEach(line => {
      this.drawObject(line);
    });

    if (contour.selected) {
      this.context.strokeStyle = '#ff0000';
      this.context.lineWidth = 2;
    }

    this.context.restore();
  }

  drawRelation(relation, attributes) {
    const points = this.extractRelationPoints(relation);

    if (points.length < 2) return;

    this.context.save();
    this.setObjectStyle(attributes);

    this.context.setLineDash([5, 5]);

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      if (this.isReal(p1) && this.isReal(p2)) {
        const start = this.worldToScreen(p1.x.re, p1.y.re);
        const end = this.worldToScreen(p2.x.re, p2.y.re);

        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.stroke();
      }
    }

    this.context.restore();
  }

  extractRelationPoints(relation) {
    const points = [];

    if (relation.type === 'K' || relation.type === 'k') {
      const relatedObjects = [
        relation.S1, relation.S2, relation.S3, relation.S4,
        relation.D1, relation.D2, relation.D3, relation.D4
      ];

      relatedObjects.forEach(obj => {
        if (obj && obj.type === 'P') {
          points.push(obj);
        }
      });
    }

    return points;
  }

  setObjectStyle(attributes) {
    const level = attributes ? attributes.level : 0;
    const red = attributes ? attributes.red : 0;
    const green = attributes ? attributes.green : 0;
    const blue = attributes ? attributes.blue : 0;

    const alpha = level === 0 ? 1 : 0.5;

    this.context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this.context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this.context.lineWidth = level === 0 ? 1 : 1;
  }

  isReal(obj) {
    if (!obj) return false;

    if (obj.type === 'P') {
      return Math.abs(obj.x.im) < 0.001 && Math.abs(obj.y.im) < 0.001;
    } else if (obj.type === 'D') {
      return Math.abs(obj.center.im) < 0.001 && Math.abs(obj.radius.im) < 0.001;
    } else if (obj.type === 'O') {
      return Math.abs(obj.x1.im) < 0.001 && Math.abs(obj.y1.im) < 0.001 &&
             Math.abs(obj.x2.im) < 0.001 && Math.abs(obj.y2.im) < 0.001;
    }

    return false;
  }

  drawGrid(step = 20) {
    if (!this.context || !this.screenConfig) return;

    this.context.save();
    this.context.lineWidth = 0.5;
    this.context.strokeStyle = '#cccccc';

    for (let x = 0; x < this.canvas.width; x += step) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);
      this.context.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += step) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
      this.context.stroke();
    }

    this.context.restore();
  }

  drawAxes() {
    if (!this.context) return;

    const originX = this.worldToScreen(0, 0).x;
    const originY = this.worldToScreen(0, 0).y;

    this.context.save();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000000';

    this.context.beginPath();
    this.context.moveTo(0, originY);
    this.context.lineTo(this.canvas.width, originY);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(originX, 0);
    this.context.lineTo(originX, this.canvas.height);
    this.context.stroke();

    this.context.restore();
  }

  highlightObject(obj, color = '#00ff00') {
    this.drawObject(obj);

    this.context.save();
    this.context.strokeStyle = color;
    this.context.lineWidth = 3;

    switch (obj.type) {
      case 'P':
        this.highlightPoint(obj);
        break;
      case 'O':
        this.highlightLine(obj);
        break;
      case 'D':
        this.highlightArc(obj);
        break;
    }

    this.context.restore();
  }

  highlightPoint(point) {
    const center = this.worldToScreen(point.x.re, point.y.re);
    const radius = point.weight === 1 ? 8 : 10;

    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
  }

  highlightLine(line) {
    const start = this.worldToScreen(line.x1.re, line.y1.re);
    const end = this.worldToScreen(line.x2.re, line.y2.re);

    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
  }

  highlightArc(arc) {
    const center = this.worldToScreen(arc.center.re, arc.center.re);
    const startX = this.worldToScreen(arc.center.re + arc.radius.re, arc.center.re);

    const radius = Math.sqrt(
      Math.pow(startX.x - center.x, 2) +
      Math.pow(startX.y - center.y, 2)
    );

    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.context.stroke();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ProjectiveGeometry,
    GraphicalRenderer
  };
}