// Modernized Geometric Computation System
// Refactored from original abc.js to modern readable JavaScript

const EPS = 0.001;

class Complex {
  constructor(re = 0, im = 0) {
    this.re = re;
    this.im = im;
  }

  get zero() {
    return Math.abs(this.re) < EPS * EPS * EPS && Math.abs(this.im) < EPS * EPS * EPS;
  }

  clone() {
    return new Complex(this.re, this.im);
  }

  add(other) {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  subtract(other) {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  multiply(other) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  divide(other) {
    const denominator = other.re * other.re + other.im * other.im;
    if (Math.abs(denominator) < EPS) {
      throw new Error('Division by zero');
    }
    return new Complex(
      (this.re * other.re + this.im * other.im) / denominator,
      (other.re * this.im - this.re * other.im) / denominator
    );
  }

  negate() {
    return new Complex(-this.re, -this.im);
  }

  square() {
    return this.multiply(this);
  }

  sqrt() {
    const magnitude = Math.sqrt(this.re * this.re + this.im * this.im);
    const v = magnitude + this.re;
    const a = Math.sqrt(v / 2);
    const b = Math.sign(this.im) * Math.sqrt((magnitude - this.re) / 2);
    return new Complex(a, b);
  }

  abs() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  equals(other, epsilon = EPS) {
    return Math.abs(this.re - other.re) < epsilon && Math.abs(this.im - other.im) < epsilon;
  }
}

class Attributes {
  constructor(options = {}) {
    this.level = options.level ?? 0;
    this.layers = options.layers ?? ['Слой'];
    this.checked = options.checked ?? true;
    this.red = options.red ?? 0;
    this.green = options.green ?? 0;
    this.blue = options.blue ?? 0;
  }

  clone() {
    return new Attributes({
      level: this.level,
      layers: [...this.layers],
      checked: this.checked,
      red: this.red,
      green: this.green,
      blue: this.blue
    });
  }
}

class GeometryObject {
  constructor(type) {
    this.type = type;
    this.incidents = [];
    this.gabarit = false;
    this.selected = false;
    this.attributes = new Attributes();
  }

  addIncident(obj) {
    if (!this.incidents.includes(obj)) {
      this.incidents.push(obj);
      obj.incidents.push(this);
    }
  }
}

class NumberObject extends GeometryObject {
  constructor(value, attributes) {
    super('C');
    this.value = value.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class ConditionObject extends GeometryObject {
  constructor(value, attributes) {
    super('G');
    this.value = value.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class EmptyObject extends GeometryObject {
  constructor(attributes) {
    super('$');
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class Point extends GeometryObject {
  constructor(x, y, weight, attributes) {
    super('P');
    this.x = x.clone();
    this.y = y.clone();
    this.weight = weight;
    this.direction = 1;
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }

  isReal() {
    return Math.abs(this.x.im) < EPS && Math.abs(this.y.im) < EPS;
  }

  isProper() {
    return this.weight === 1;
  }
}

class ProeLine extends GeometryObject {
  constructor(L1, S1, S2, S3, L2, D1, D2, D3, attributes) {
    super('L');
    this.L1 = L1.clone();
    this.S1 = S1.clone();
    this.S2 = S2.clone();
    this.S3 = S3.clone();
    this.L2 = L2.clone();
    this.D1 = D1.clone();
    this.D2 = D2.clone();
    this.D3 = D3.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class Line extends GeometryObject {
  constructor(x1, y1, w1, x2, y2, w2, bounded, type, attributes) {
    super('O');
    this.x1 = x1.clone();
    this.y1 = y1.clone();
    this.w1 = w1;
    this.x2 = x2.clone();
    this.y2 = y2.clone();
    this.w2 = w2;
    this.bounded = bounded;
    this.direction = 1;
    this.type = type;
    this.null = false;
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }

  isProper() {
    return this.w1 === 1 && this.w2 === 1;
  }

  isReal() {
    return Math.abs(this.x1.im) < EPS && Math.abs(this.y1.im) < EPS &&
           Math.abs(this.x2.im) < EPS && Math.abs(this.y2.im) < EPS;
  }
}

class Arc extends GeometryObject {
  constructor(center, radius, x1, y1, x2, y2, attributes) {
    super('D');
    this.center = center.clone();
    this.radius = radius.clone();
    this.x1 = x1.clone();
    this.y1 = y1.clone();
    this.x2 = x2.clone();
    this.y2 = y2.clone();
    this.direction = 1;
    this.laba = 0;
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }

  isReal() {
    return Math.abs(this.center.im) < EPS && Math.abs(this.radius.im) < EPS;
  }
}

class Collinearity extends GeometryObject {
  constructor(A1, A2, A3, A4, B1, B2, B3, B4, attributes) {
    super('K');
    this.S1 = A1.clone();
    this.S2 = A2.clone();
    this.S3 = A3.clone();
    this.S4 = A4.clone();
    this.D1 = B1.clone();
    this.D2 = B2.clone();
    this.D3 = B3.clone();
    this.D4 = B4.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class Correlation extends GeometryObject {
  constructor(A1, A2, A3, A4, B1, B2, B3, B4, attributes) {
    super('k');
    this.S1 = A1.clone();
    this.S2 = A2.clone();
    this.S3 = A3.clone();
    this.S4 = A4.clone();
    this.D1 = B1.clone();
    this.D2 = B2.clone();
    this.D3 = B3.clone();
    this.D4 = B4.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class Quadrilateral extends GeometryObject {
  constructor(P1, P2, P3, P4, P5, attributes) {
    super('Y');
    this.PR1 = P1.clone();
    this.PR2 = P2.clone();
    this.PR3 = P3.clone();
    this.PR4 = P4.clone();
    this.PR5 = P5.clone();
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class Contour extends GeometryObject {
  constructor(attributes) {
    super('W');
    this.lines = [];
    this.subContours = [];
    if (attributes) {
      this.attributes = attributes.clone();
    }
  }
}

class ScreenConfig {
  constructor(x1, y1, x2, y2) {
    this.centerX = undefined;
    this.centerY = undefined;
    this.xScreenMin = x1;
    this.yScreenMin = y1;
    this.xScreenMax = x2;
    this.yScreenMax = y2;
    this.matrix = new Array(3).fill(0).map(() => new Array(3).fill(0));
    this.scale = 1;
    this.scaleFactor = 1;
    this.transformType = "E";
    this.lineTail = 20;
    this.scaleX = 1;
    this.scaleY = 1;
    this.centerXRatio = 0.5;
    this.centerYRatio = 0.5;

    this.initializeMatrix();
  }

  initializeMatrix() {
    this.matrix[1][1] = 1; this.matrix[1][2] = 0; this.matrix[1][3] = 0;
    this.matrix[2][1] = 0; this.matrix[2][2] = 1; this.matrix[2][3] = 0;
    this.matrix[3][1] = 0; this.matrix[3][2] = 0; this.matrix[3][3] = 1;
  }
}

class GeometryCommands {
  constructor() {
    this.systemVariables = {
      allowComplex: true
    };
  }

  createPoint(x, y, weight, attributes) {
    return new Point(x, y, weight, attributes);
  }

  createLine(x1, y1, w1, x2, y2, w2, bounded, type, attributes) {
    return new Line(x1, y1, w1, x2, y2, w2, bounded, type, attributes);
  }

  createArc(center, radius, x1, y1, x2, y2, attributes) {
    return new Arc(center, radius, x1, y1, x2, y2, attributes);
  }

  createNumber(value, attributes) {
    return new NumberObject(value, attributes);
  }

  createEmpty(attributes) {
    return new EmptyObject(attributes);
  }

  projectPointToLine(point, line) {
    const AB = this.calcProjection(point.x, point.y, line);

    if (!this.pointBelongsToLine(line, AB.re, AB.im)) {
      return null;
    }

    const result = this.createPoint(AB, AB, 1, point.attributes);
    line.addIncident(result);
    return result;
  }

  calcProjection(XX, YY, line) {
    const X1 = line.x1;
    const Y1 = line.y1;
    const X2 = line.x2;
    const Y2 = line.y2;

    const SCDP = this.calculateDirectionCoefficients(X1.re, Y1.re, X2.re, Y2.re);
    const Df = this.angle(0, 1, SCDP.sin, SCDP.cos);
    const Dx = (Math.PI / 2) + Df;

    const X3 = XX.add(new Complex(200 * Math.cos(Dx), 0));
    const Y3 = YY.add(new Complex(200 * Math.sin(Dx), 0));
    const X4 = XX.subtract(new Complex(200 * Math.cos(Dx), 0));
    const Y4 = YY.subtract(new Complex(200 * Math.sin(Dx), 0));

    const P = this.lineIntersectionComplex(X1, Y1, X2, Y2, X3, Y3, X4, Y4);

    return { re: P.x, im: P.y };
  }

  calculateDirectionCoefficients(X1, Y1, X2, Y2) {
    const Dx = X2 - X1;
    const Dy = Y2 - Y1;
    const D = Math.sqrt(Dx * Dx + Dy * Dy);

    let result = { sin: 0, cos: 0, distance: D };

    if (D > 0) {
      result.sin = Dy / D;
      result.cos = Dx / D;
    }

    return result;
  }

  angle(sinA, cosA, sinB, cosB) {
    let angleA = Math.asin(sinA);
    if (cosA >= 0 && sinA >= 0) angleA = Math.asin(sinA);
    else if (cosA < 0 && sinA >= 0) angleA = Math.PI - Math.asin(sinA);
    else if (cosA >= 0 && sinA < 0) angleA = Math.asin(sinA);
    else if (cosA < 0 && sinA < 0) angleA = -Math.PI - Math.asin(sinA);

    let angleB = Math.asin(sinB);
    if (cosB >= 0 && sinB >= 0) angleB = Math.asin(sinB);
    else if (cosB < 0 && sinB >= 0) angleB = Math.PI - Math.asin(sinB);
    else if (cosB >= 0 && sinB < 0) angleB = Math.asin(sinB);
    else if (cosB < 0 && sinB < 0) angleB = -Math.PI - Math.asin(sinB);

    let result = angleB - angleA;
    return result;
  }

  lineIntersectionComplex(X1, Y1, X2, Y2, X3, Y3, X4, Y4) {
    const A1 = Y1.subtract(Y2);
    const B1 = X2.subtract(X1);
    const A2 = Y3.subtract(Y4);
    const B2 = X4.subtract(X3);
    const ZZ = A1.multiply(B2).subtract(B1.multiply(A2));

    let result = { x: B1, y: A1.negate(), z: new Complex(0, 0) };

    if (Math.abs(ZZ.re) > 1e-25 || Math.abs(ZZ.im) > 1e-25) {
      const C1 = X1.multiply(Y2).subtract(Y1.multiply(X2));
      const C2 = X3.multiply(Y4).subtract(Y3.multiply(X4));

      const XX = B1.multiply(C2).subtract(C1.multiply(B2)).divide(ZZ);
      const YY = C1.multiply(A2).subtract(A1.multiply(C2)).divide(ZZ);
      result = { x: XX, y: YY, z: new Complex(1, 0) };
    }

    return result;
  }

  pointBelongsToLine(line, x, y) {
    if (line.x1.im !== 0 || line.y1.im !== 0 || line.x2.im !== 0 || line.y2.im !== 0) {
      return false;
    }

    const crossProduct = (y - line.y1.re) * (line.x2.re - line.x1.re) -
                        (x - line.x1.re) * (line.y2.re - line.y1.re);

    return Math.abs(crossProduct) < EPS;
  }

  midpoint(P1, P2) {
    const x = new Complex((P1.x.re + P2.x.re) / 2, (P1.x.im + P2.x.im) / 2);
    const y = new Complex((P1.y.re + P2.y.re) / 2, (P1.y.im + P2.y.im) / 2);
    return this.createPoint(x, y, 1, P1.attributes);
  }

  lineIntersection(line1, line2) {
    const result = this.lineIntersectionComplex(
      line1.x1, line1.y1, line1.x2, line1.y2,
      line2.x1, line2.y1, line2.x2, line2.y2
    );

    if (result.z.re === 1) {
      if (this.pointBelongsToLine(line1, result.x.re, result.y.im) &&
          this.pointBelongsToLine(line2, result.x.re, result.y.im)) {
        const point = this.createPoint(result.x, result.y, 1, line1.attributes);
        line1.addIncident(point);
        line2.addIncident(point);
        return point;
      }
    }

    return null;
  }

  calculateCircleIntersections(circle1, circle2) {
    const Xc1 = circle1.center;
    const Yc1 = new Complex(circle1.center.im === 0 ? circle1.center.re : 0, 0);
    const Xc2 = circle2.center;
    const Yc2 = new Complex(circle2.center.im === 0 ? circle2.center.re : 0, 0);
    const R1 = circle1.radius;
    const R2 = circle2.radius;

    const Z = Math.pow(Xc1.re, 2) - Math.pow(Xc2.re, 2) +
              Math.pow(Yc1.re, 2) - Math.pow(Yc2.re, 2) -
              Math.pow(R1.re, 2) + Math.pow(R2.re, 2);

    const Dx = Xc2.subtract(Xc1);
    const Dy = Yc1.subtract(Yc2);

    if (Math.abs(Dx.re) < EPS && Math.abs(Dy.re) < EPS) {
      return null;
    }

    return this.calculateArcIntersections(Xc1, Yc1, Xc2, Yc2, R1, R2);
  }

  calculateArcIntersections(Xc1, Yc1, Xc2, Yc2, R1, R2) {
    const DeltaX = Xc2.subtract(Xc1);
    const DeltaY = Yc2.subtract(Yc1);
    const R1_2 = R1.multiply(R1);
    const R2_2 = R2.multiply(R2);
    const Xc1_2 = Xc1.multiply(Xc1);
    const Xc2_2 = Xc2.multiply(Xc2);
    const Yc1_2 = Yc1.multiply(Yc1);
    const Yc2_2 = Yc2.multiply(Yc2);

    let U = R1_2.subtract(R2_2);
    U = U.subtract(Yc1_2).add(Yc2_2).subtract(Xc1_2).add(Xc2_2);
    const DeltaX_2 = DeltaX.multiply(DeltaX);
    const DeltaY_2 = DeltaY.multiply(DeltaY);

    let X1, Y1, X2, Y2;

    if (Math.abs(Xc1.re - Xc2.re) > EPS || Math.abs(Xc1.im - Xc2.im) > EPS) {
      const V = DeltaY_2.divide(DeltaX_2);
      const A = V.add(new Complex(1, 0));

      const V1 = (new Complex(2, 0)).multiply(DeltaY).divide(DeltaX).multiply(Xc1);
      const V2 = U.multiply(DeltaY).divide(DeltaX_2);
      const V3 = (new Complex(2, 0)).multiply(Yc1);
      const B = V1.subtract(V2).subtract(V3);

      const V4 = U.multiply(U).divide((new Complex(4, 0)).multiply(DeltaX_2));
      const V5 = U.divide(DeltaX);
      const C = V4.subtract(V5.multiply(Xc1)).add(Xc1_2).add(Yc1_2).subtract(R1_2);

      const D = B.multiply(B).subtract((new Complex(4, 0)).multiply(A.multiply(C)));

      Y1 = B.negate().add(D.sqrt()).divide((new Complex(2, 0)).multiply(A));
      Y2 = B.negate().subtract(D.sqrt()).divide((new Complex(2, 0)).multiply(A));

      const V6 = U.subtract((new Complex(2, 0)).multiply(Y1).multiply(DeltaY));
      X1 = V6.divide((new Complex(2, 0)).multiply(DeltaX));

      const V7 = U.subtract((new Complex(2, 0)).multiply(Y2).multiply(DeltaY));
      X2 = V7.divide((new Complex(2, 0)).multiply(DeltaX));
    } else {
      return null;
    }

    return { X1, Y1, X2, Y2 };
  }

  createScreenConfig(x1, y1, x2, y2) {
    return new ScreenConfig(x1, y1, x2, y2);
  }

  createProeLine(L1, S1, S2, S3, L2, D1, D2, D3, attributes) {
    return new ProeLine(L1, S1, S2, S3, L2, D1, D2, D3, attributes);
  }

  createQuadrilateral(P1, P2, P3, P4, P5, attributes) {
    return new Quadrilateral(P1, P2, P3, P4, P5, attributes);
  }

  createCollinearity(A1, A2, A3, A4, B1, B2, B3, B4, attributes) {
    return new Collinearity(A1, A2, A3, A4, B1, B2, B3, B4, attributes);
  }

  createCorrelation(A1, A2, A3, A4, B1, B2, B3, B4, attributes) {
    return new Correlation(A1, A2, A3, A4, B1, B2, B3, B4, attributes);
  }

  createCondition(value, attributes) {
    return new ConditionObject(value, attributes);
  }

  cloneObject(source) {
    if (!source) return null;

    switch (source.type) {
      case 'C':
        return new NumberObject(source.value, source.attributes);
      case 'P':
        return new Point(source.x, source.y, source.weight, source.attributes);
      case 'O':
        return new Line(source.x1, source.y1, source.w1, source.x2, source.y2, source.w2,
                        source.bounded, source.type, source.attributes);
      case 'D':
        return new Arc(source.center, source.radius, source.x1, source.y1, source.x2, source.y2, source.attributes);
      case 'L':
        return new ProeLine(source.L1, source.S1, source.S2, source.S3, source.L2,
                           source.D1, source.D2, source.D3, source.attributes);
      case 'K':
        return new Collinearity(source.S1, source.S2, source.S3, source.S4,
                               source.D1, source.D2, source.D3, source.D4, source.attributes);
      case 'k':
        return new Correlation(source.S1, source.S2, source.S3, source.S4,
                               source.D1, source.D2, source.D3, source.D4, source.attributes);
      case 'Y':
        return new Quadrilateral(source.PR1, source.PR2, source.PR3, source.PR4,
                               source.PR5, source.attributes);
      case 'W':
        const contour = new Contour(source.attributes);
        contour.lines = source.lines.map(line => this.cloneObject(line));
        return contour;
      case '$':
        return new EmptyObject(source.attributes);
      default:
        return null;
    }
  }

  discriminant(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    return p1 * p5 * p9 + p4 * p8 * p3 + p7 * p2 * p6 -
           p7 * p5 * p3 - p1 * p8 * p6 - p4 * p2 * p9;
  }

  discriminantComplex(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    const s1 = p1.multiply(p5).multiply(p9);
    const s2 = p4.multiply(p8).multiply(p3);
    const s3 = p7.multiply(p2).multiply(p6);
    const s4 = p7.multiply(p5).multiply(p3);
    const s5 = p1.multiply(p8).multiply(p6);
    const s6 = p4.multiply(p2).multiply(p9);
    const d1 = s1.add(s2.add(s3));
    const d2 = s4.add(s5.add(s6));
    return d1.subtract(d2);
  }

  distancePointLine(point, line) {
    if (!line.isProper() || !point.isReal()) {
      return null;
    }

    const x1 = line.x1.re, y1 = line.y1.re;
    const x2 = line.x2.re, y2 = line.y2.re;
    const xp = point.x.re, yp = point.y.re;

    const numerator = Math.abs((y2 - y1) * xp - (x2 - x1) * yp + x2 * y1 - y2 * x1);
    const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));

    return denominator > EPS ? numerator / denominator : null;
  }

  distancePointPoint(p1, p2) {
    if (!p1.isReal() || !p2.isReal()) {
      return null;
    }

    const dx = p1.x.re - p2.x.re;
    const dy = p1.y.re - p2.y.re;
    return Math.sqrt(dx * dx + dy * dy);
  }

  angleBetweenPoints(p1, p2, p3) {
    if (!p1.isReal() || !p2.isReal() || !p3.isReal()) {
      return null;
    }

    const v1 = { x: p1.x.re - p2.x.re, y: p1.y.re - p2.y.re };
    const v2 = { x: p3.x.re - p2.x.re, y: p3.y.re - p2.y.re };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (mag1 < EPS || mag2 < EPS) {
      return null;
    }

    const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
    return Math.acos(cosAngle) * 180 / Math.PI;
  }

  isPointOnLine(point, line, tolerance = EPS) {
    if (!line.isProper() || !point.isReal()) {
      return false;
    }

    const distance = this.distancePointLine(point, line);
    return distance !== null && distance < tolerance;
  }

  isCollinear(p1, p2, p3, tolerance = EPS) {
    if (!p1.isReal() || !p2.isReal() || !p3.isReal()) {
      return false;
    }

    const area = this.discriminant(
      p1.x.re, p1.y.re, 1,
      p2.x.re, p2.y.re, 1,
      p3.x.re, p3.y.re, 1
    );

    return Math.abs(area) < tolerance;
  }

  getLineAngle(line) {
    if (!line.isReal()) {
      return null;
    }

    const dx = line.x2.re - line.x1.re;
    const dy = line.y2.re - line.y1.re;
    const angleFromX = Math.atan2(dy, dx) * 180 / Math.PI;

    return angleFromX >= 0 ? angleFromX : angleFromX + 360;
  }

  getIntersectionAngles(line1, line2) {
    if (!line1.isReal() || !line2.isReal()) {
      return null;
    }

    const angle1 = this.getLineAngle(line1);
    const angle2 = this.getLineAngle(line2);

    if (angle1 === null || angle2 === null) {
      return null;
    }

    let difference = Math.abs(angle2 - angle1);
    if (difference > 180) {
      difference = 360 - difference;
    }

    return {
      angle: difference,
      angle1: angle1,
      angle2: angle2
    };
  }

  isParallel(line1, line2, tolerance = 1) {
    const angles = this.getIntersectionAngles(line1, line2);

    if (!angles) {
      return false;
    }

    return Math.abs(angles.angle) < tolerance || Math.abs(angles.angle - 180) < tolerance;
  }

  isPerpendicular(line1, line2, tolerance = 1) {
    const angles = this.getIntersectionAngles(line1, line2);

    if (!angles) {
      return false;
    }

    return Math.abs(angles.angle - 90) < tolerance;
  }

  pointOnLineAtDistance(point, line, distance) {
    if (!line.isProper() || !point.isReal()) {
      return null;
    }

    const angle = this.getLineAngle(line) * Math.PI / 180;
    const newX = point.x.re + distance * Math.cos(angle);
    const newY = point.y.re + distance * Math.sin(angle);

    return this.createPoint(new Complex(newX, 0), new Complex(newY, 0), 1, point.attributes);
  }

  footOfPerpendicular(point, line) {
    return this.projectPointToLine(point, line);
  }

  perpendicularLine(line, throughPoint) {
    if (!line.isReal() || !throughPoint.isReal()) {
      return null;
    }

    const angle = this.getLineAngle(line) * Math.PI / 180;
    const perpAngle = angle + Math.PI / 2;

    const x2 = throughPoint.x.re + Math.cos(perpAngle);
    const y2 = throughPoint.y.re + Math.sin(perpAngle);

    const newLine = this.createLine(
      throughPoint.x, throughPoint.y, 1,
      new Complex(x2, 0), new Complex(y2, 0), 1,
      false, "sobstv", line.attributes
    );

    return newLine;
  }

  parallelLine(line, offset) {
    if (!line.isReal()) {
      return null;
    }

    const angle = this.getLineAngle(line) * Math.PI / 180;
    const perpAngle = angle + Math.PI / 2;

    const offsetX = offset * Math.cos(perpAngle);
    const offsetY = offset * Math.sin(perpAngle);

    const newLine = this.createLine(
      new Complex(line.x1.re + offsetX, 0),
      new Complex(line.y1.re + offsetY, 0),
      1,
      new Complex(line.x2.re + offsetX, 0),
      new Complex(line.y2.re + offsetY, 0),
      1,
      false, "sobstv", line.attributes
    );

    return newLine;
  }

  circleFromThreePoints(p1, p2, p3) {
    if (!p1.isReal() || !p2.isReal() || !p3.isReal()) {
      return null;
    }

    const x1 = p1.x.re, y1 = p1.y.re;
    const x2 = p2.x.re, y2 = p2.y.re;
    const x3 = p3.x.re, y3 = p3.y.re;

    const D = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

    if (Math.abs(D) < EPS) {
      return null;
    }

    const centerX = ((x1 * x1 + y1 * y1) * (y2 - y3) +
                    (x2 * x2 + y2 * y2) * (y3 - y1) +
                    (x3 * x3 + y3 * y3) * (y1 - y2)) / D;

    const centerY = ((x1 * x1 + y1 * y1) * (x3 - x2) +
                    (x2 * x2 + y2 * y2) * (x1 - x3) +
                    (x3 * x3 + y3 * y3) * (x2 - x1)) / D;

    const radius = Math.sqrt(Math.pow(x1 - centerX, 2) + Math.pow(y1 - centerY, 2));

    const startAngle = Math.atan2(y1 - centerY, x1 - centerX) * 180 / Math.PI;
    const endAngle = startAngle;

    return this.createArc(
      new Complex(centerX, 0),
      new Complex(radius, 0),
      new Complex(centerX + radius * Math.cos(startAngle * Math.PI / 180), 0),
      new Complex(centerY + radius * Math.sin(startAngle * Math.PI / 180), 0),
      new Complex(centerX + radius * Math.cos(endAngle * Math.PI / 180), 0),
      new Complex(centerY + radius * Math.sin(endAngle * Math.PI / 180), 0),
      p1.attributes
    );
  }

  lineFromPointAndAngle(point, angleInDegrees, length = 100) {
    if (!point.isReal()) {
      return null;
    }

    const angleInRadians = angleInDegrees * Math.PI / 180;

    const x2 = point.x.re + length * Math.cos(angleInRadians);
    const y2 = point.y.re + length * Math.sin(angleInRadians);

    return this.createLine(
      point.x, point.y, 1,
      new Complex(x2, 0), new Complex(y2, 0), 1,
      false, "sobstv", point.attributes
    );
  }

  lineFromTwoPoints(p1, p2) {
    if (!p1.isReal() || !p2.isReal()) {
      return null;
    }

    return this.createLine(
      p1.x, p1.y, 1,
      p2.x, p2.y, 1,
      false, "sobstv", p1.attributes
    );
  }
}

const geometry = new GeometryCommands();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Complex,
    Attributes,
    GeometryObject,
    Point,
    Line,
    Arc,
    NumberObject,
    EmptyObject,
    ConditionObject,
    ProeLine,
    Collinearity,
    Correlation,
    Quadrilateral,
    Contour,
    ScreenConfig,
    GeometryCommands,
    geometry
  };
}
