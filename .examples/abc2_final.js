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
    this.xm = x2;
    this.ym = y2;
    this.xScreenMin = x1;
    this.yScreenMin = y1;
    this.xScreenMax = x2;
    this.yScreenMax = y2;
    this.M = undefined;
    this.SK = 1;
    this.Kf = 1;
    this.TP = "E";
    this.LineTail = 20;
    this.Mas = 1;
    this.MasX = 1;
    this.MasY = 1;
    this.KCX = 0.5;
    this.KCY = 0.5;

    this.initializeMatrix();
  }

  initializeMatrix() {
    // Создаём массив с индексами 1,2,3 как в оригинале
    this.M = new Array(4);
    for (let i = 0; i < 4; i++) {
      this.M[i] = new Array(4);
    }

    this.M[1][1] = 1; this.M[1][2] = 0; this.M[1][3] = 0;
    this.M[2][1] = 0; this.M[2][2] = 1; this.M[2][3] = 0;
    this.M[3][1] = 0; this.M[3][2] = 0; this.M[3][3] = 1;
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

// Extended Functional Commands for Geometric Construction
// Part of refactored abc2.js - Constructive Commands (EExec*)

function sqrt(x) {
  return Math.sqrt(x);
}

class ConstructiveCommands {
  constructor(geometry) {
    this.geometry = geometry;
    this.systemVariables = {
      allowComplex: true,
      checkConstructibility: true
    };
  }

  createNumber(value, attributes) {
    return this.geometry.createNumber(value, attributes);
  }

  createEmpty(attributes) {
    return this.geometry.createEmpty(attributes);
  }

  EExecC0(result, value, att, sign) {
    if (value.type !== 'C') return false;
    return this.geometry.createNumber(value.value, att);
  }

  EExecP0(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') return returnEmpty(result, att);
    return this.geometry.createPoint(x.value, y.value, 1, att);
  }

  EExecP1(result, point, dx, dy, att, sign1, sign2, sign3) {
    if (point.type !== 'P' || dx.type !== 'C' || dy.type !== 'C') {
      return false;
    }

    const newX = point.x.add(dx.value);
    const newY = point.y.add(dy.value);
    return this.geometry.createPoint(newX, newY, point.weight, att);
  }

  EExecPP(result, p1, p2, att, sign1, sign2) {
    if (p1.type !== 'P' || p2.type !== 'P') {
      return this.createEmpty(att);
    }

    if (this.isProper(p1) && this.isProper(p2)) {
      const x = (p1.x.re + p2.x.re) / 2;
      const y = (p1.x.im + p2.x.im) / 2;
      const newX = (p1.y.re + p2.y.re) / 2;
      const newY = (p1.y.im + p2.y.im) / 2;

      return this.geometry.createPoint(
        new Complex(x, y),
        new Complex(newX, newY),
        1,
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecDN(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    if (this.isProper(x) && this.isProper(y)) {
      const c1 = this.EExecC2({}, x, y, att, 1, 1);
      const c2 = this.EExecAQ({}, c1, {value: new Complex(2, 0), type: 'C'}, att, 1, 1);
      const p1 = this.EExecPP({}, x, y, att, 1, 1);
      return this.EExecD0(result, p1, c2, att, 1, 1);
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecC7(result, value, att, sign1) {
    if (value.type !== 'O') {
      return this.createEmpty(att);
    }

    let SCDP;
    if (sign1 === 1) {
      SCDP = this.geometry.calculateDirectionCoefficients(
        value.x1.re, value.y1.re,
        value.x2.re, value.y2.re
      );
    } else {
      SCDP = this.geometry.calculateDirectionCoefficients(
        value.x2.re, value.y2.re,
        value.x1.re, value.y1.re
      );
    }

    const angle = this.geometry.angle(0, 1, SCDP.sin, SCDP.cos);
    let normalizedAngle = angle;
    if (normalizedAngle < 0) normalizedAngle = 2 * Math.PI + normalizedAngle;

    const angleInDegrees = normalizedAngle * 180 / Math.PI;
    return this.geometry.createNumber(new Complex(angleInDegrees, 0), att);
  }

  EExecCI(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return this.createEmpty(att);
    }

    let SCDP1, SCDP2;

    if (sign1 === 1) {
      SCDP1 = this.geometry.calculateDirectionCoefficients(
        x.x1.re, x.y1.re,
        x.x2.re, x.y2.re
      );
    } else {
      SCDP1 = this.geometry.calculateDirectionCoefficients(
        x.x2.re, x.y2.re,
        x.x1.re, x.y1.re
      );
    }

    let angle1 = this.geometry.angle(0, 1, SCDP1.sin, SCDP1.cos);
    if (angle1 < 0) angle1 = 2 * Math.PI + angle1;

    if (sign2 === 1) {
      SCDP2 = this.geometry.calculateDirectionCoefficients(
        y.x1.re, y.y1.re,
        y.x2.re, y.y2.re
      );
    } else {
      SCDP2 = this.geometry.calculateDirectionCoefficients(
        y.x2.re, y.y2.re,
        y.x1.re, y.y1.re
      );
    }

    let angle2 = this.geometry.angle(0, 1, SCDP2.sin, SCDP2.cos);
    if (angle2 < 0) angle2 = 2 * Math.PI + angle2;

    if (angle2 < angle1) angle2 = angle2 + 2 * Math.PI;

    const angleDifference = (angle2 - angle1) * 180 / Math.PI;
    return this.geometry.createNumber(new Complex(angleDifference, 0), att);
  }

  EExecPR(result, x, att, sign1) {
    if (x.type !== 'P') {
      return this.createEmpty(att);
    }

    const vx = x.x;
    const vy = x.y;
    return this.geometry.createPoint(
      new Complex(vx.re, -vx.im),
      new Complex(vy.re, -vy.im),
      1,
      att
    );
  }

  EExecCJ(result, x, y, z, att, sign1, sign2, sign3) {
    if (x.type !== 'P' || y.type !== 'P' || z.type !== 'O') {
      return false;
    }

    if (this.isProper(x) && this.isProper(y) && this.isProper(z) &&
        this.isReal(x) && this.isReal(y) && this.isReal(z)) {

      const a = this.calculateCJ(x, y, z, sign3);

      if (a.real) {
        return this.geometry.createNumber(
          new Complex(a.x, a.y),
          att
        );
      }
    }

    if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecO0(result, p1, p2, att, sign1, sign2) {
    if (p1.type !== 'P' || p2.type !== 'P') {
      return false;
    }

    const type = (p1.weight === 0 && p2.weight === 0) ? "nesobstv" : "sobstv";

    if (this.isProper(p1) && this.isProper(p2)) {
      const line = this.geometry.createLine(
        p1.x, p1.y, 1,
        p2.x, p2.y, 1,
        false, "sobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    if ((p1.weight === 1 && p2.weight === 0) || (p2.weight === 1 && p1.weight === 0)) {
      const properPoint = p1.weight === 1 ? p1 : p2;
      const improperPoint = p1.weight === 0 ? p1 : p2;

      if (improperPoint.y.im === 0) {
        const dx = improperPoint.x.re;
        const dy = improperPoint.y.re;
        const length = Math.sqrt(dx * dx + dy * dy);

        let sin1, cos1, angle;
        if (length > 0) {
          sin1 = dy / length;
          cos1 = dx / length;
          angle = Math.atan2(sin1, cos1);
        }

        const x2 = properPoint.x.re + 100 * Math.cos(angle);
        const y2 = properPoint.y.re + 100 * Math.sin(angle);

        const line = this.geometry.createLine(
          properPoint.x, properPoint.y, 1,
          new Complex(x2, 0), new Complex(y2, 0), 1,
          false, "sobstv", att
        );

        if (line) {
          line.addIncident(p1);
          line.addIncident(p2);
        }

        return line;
      }

      const line = this.geometry.createLine(
        p1.x, p1.y, p1.weight,
        p2.x, p2.y, p2.weight,
        false, "sobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    if (p1.weight === 0 && p2.weight === 0) {
      const line = this.geometry.createLine(
        new Complex(p1.x.re, 0),
        new Complex(p1.y.re, 0),
        0,
        new Complex(p2.x.re, 0),
        new Complex(p2.y.re, 0),
        0,
        true, "nesobstv", att
      );

      if (line) {
        line.addIncident(p1);
        line.addIncident(p2);
      }

      return line;
    }

    return this.createEmpty(att);
  }

  EExecO2(result, x1, y1, x2, y2, att, sign1, sign2, sign3, sign4) {
    if (x1.type !== 'C' || y1.type !== 'C' || x2.type !== 'C' || y2.type !== 'C') {
      return false;
    }

    return this.geometry.createLine(
      x1.value, y1.value, 1,
      x2.value, y2.value, 1,
      false, "sobstv", att
    );
  }

  EExecO8(result1, result2, x, y, att1, att2, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return false;
    }

    let x1, y1, x2, y2;
    if (sign1 === 1) {
      x1 = new Complex(x.x1.re, 0);
      y1 = new Complex(x.y1.re, 0);
      x2 = new Complex(x.x2.re, 0);
      y2 = new Complex(x.y2.re, 0);
    } else {
      x2 = new Complex(x.x1.re, 0);
      y2 = new Complex(x.y1.re, 0);
      x1 = new Complex(x.x2.re, 0);
      y1 = new Complex(x.y2.re, 0);
    }

    const SCDP1 = this.geometry.calculateDirectionCoefficients(x1.re, y1.re, x2.re, y2.re);
    let angle1 = this.geometry.angle(0, 1, SCDP1.sin, SCDP1.cos);
    if (angle1 < 0) angle1 = 2 * Math.PI + angle1;

    if (sign2 === 1) {
      x1 = new Complex(y.x1.re, 0);
      y1 = new Complex(y.y1.re, 0);
      x2 = new Complex(y.x2.re, 0);
      y2 = new Complex(y.y2.re, 0);
    } else {
      x2 = new Complex(y.x1.re, 0);
      y2 = new Complex(y.y1.re, 0);
      x1 = new Complex(y.x2.re, 0);
      y1 = new Complex(y.y2.re, 0);
    }

    const SCDP2 = this.geometry.calculateDirectionCoefficients(x1.re, y1.re, x2.re, y2.re);
    let angle2 = this.geometry.angle(0, 1, SCDP2.sin, SCDP2.cos);
    if (angle2 < 0) angle2 = 2 * Math.PI + angle2;

    if (angle2 < angle1) angle2 = angle2 + 2 * Math.PI;

    const angleDifference = angle2 - angle1;
    const angleOffset = angle1 + angleDifference / 2;

    const intersection = this.geometry.lineIntersectionComplex(
      x.x1.re, x.y1.re, x.x2.re, x.y2.re,
      y.x1.re, y.y1.re, y.x2.re, y.y2.re
    );

    const bx = intersection.x;
    const by = intersection.y;

    const ax1 = bx + 100 * Math.cos(angleOffset);
    const ay1 = by + 100 * Math.sin(angleOffset);

    const line1 = this.geometry.createLine(
      new Complex(bx, 0), new Complex(by, 0), 1,
      new Complex(ax1, 0), new Complex(ay1, 0), 1,
      false, "sobstv", att1
    );

    const angleOffset2 = angleOffset + Math.PI / 2;
    const ax2 = bx + 100 * Math.cos(angleOffset2);
    const ay2 = by + 100 * Math.sin(angleOffset2);

    const line2 = this.geometry.createLine(
      new Complex(bx, 0), new Complex(by, 0), 1,
      new Complex(ax2, 0), new Complex(ay2, 0), 1,
      false, "sobstv", att2
    );

    return { line1, line2 };
  }

  EExecD0(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const arc = this.geometry.createArc(
      p.x, p.y, r.value,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );

    result.arc = arc;
    return arc;
  }

  EExecD2(result, x, y, att, sign1, sign2) {
    let xCenter = new Complex(0, 0);
    let yCenter = new Complex(0, 0);
    let radius = new Complex(0, 0);
    let coordAllow = false;
    let radiusAllow = false;

    if (x.type === 'P' && this.isProper(x)) {
      xCenter = x.x;
      yCenter = x.y;
      coordAllow = true;
    } else if (x.type === 'D') {
      xCenter = x.center;
      yCenter = new Complex(x.center.re, 0);
      coordAllow = true;
    }

    if (y.type === 'C') {
      radius = new Complex(y.value.re / 2, y.value.im / 2);
      radiusAllow = true;
    } else if (y.type === 'O' && y.attributes.level === 0) {
      radius = new Complex(
        Math.sqrt(Math.pow(y.x2.re - y.x1.re, 2) + Math.pow(y.y2.re - y.y1.re, 2)) / 2,
        0
      );
      radiusAllow = true;
    } else if (y.type === 'D') {
      radius = y.radius;
      radiusAllow = true;
    }

    if (coordAllow && radiusAllow) {
      return this.geometry.createArc(
        xCenter, yCenter,
        new Complex(radius.re * sign2, radius.im * sign2),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecD3(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const v = new Complex(
      r.value.re / 2 / Math.PI,
      r.value.im / 2 / Math.PI
    );

    return this.geometry.createArc(
      p.x, p.y, v,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );
  }

  EExecD5(result, p, r, att, sign1, sign2) {
    if (p.type !== 'P' || r.type !== 'C') {
      return false;
    }

    const v = new Complex(
      Math.sqrt(r.value.re / Math.PI) * Math.sign(r.value.re),
      0
    );

    return this.geometry.createArc(
      p.x, p.y, v,
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      new Complex(p.x.re + r.value.re, 0),
      new Complex(p.y.re, 0),
      att
    );
  }

  EExecD00(result, x, y, z, a, sign1, sign2, sign3) {
    let xCenter = new Complex(0, 0);
    let yCenter = new Complex(0, 0);
    let radius = new Complex(0, 0);

    const att = a.clone();
    if (att.level === 0 || att.level === 2) {
      att.level = 1;
    }

    if ((x.type === 'C' || x.type === 'D') && (y.type === 'C' || y.type === 'D') &&
        (z.type === 'C' || z.type === 'O' || z.type === 'D')) {

      if (x.type === 'C') xCenter = new Complex(sign1 * x.value.re, x.value.im);
      if (y.type === 'C') yCenter = new Complex(sign2 * y.value.re, y.value.im);

      if (x.type === 'D') {
        xCenter = new Complex(sign1 * x.center.re, x.center.im);
        yCenter = new Complex(sign2 * x.center.re, x.center.re);
      }
      if (y.type === 'D') {
        yCenter = new Complex(sign2 * y.center.re, y.center.im);
      }

      if (z.type === 'C') radius = z.value;
      if ((z.type === 'O') && z.attributes.level === 0) {
        radius = new Complex(
          Math.sqrt(Math.pow(z.x2.re - z.x1.re, 2) + Math.pow(z.y2.re - z.y1.re, 2)),
          0
        );
      }
      if (z.type === 'D') radius = z.radius;

      return this.geometry.createArc(
        xCenter, yCenter, radius,
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        new Complex(xCenter.re + radius.re, 0),
        new Complex(yCenter.re, 0),
        att
      );
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  isProper(obj) {
    if (!obj) return false;
    if (obj.type === 'P') return obj.weight === 1;
    if (obj.type === 'O') return obj.w1 === 1 && obj.w2 === 1;
    return false;
  }

  isReal(obj) {
    if (!obj) return false;
    if (obj.type === 'P') {
      return Math.abs(obj.x.im) < EPS && Math.abs(obj.y.im) < EPS;
    }
    if (obj.type === 'O') {
      return Math.abs(obj.x1.im) < EPS && Math.abs(obj.y1.im) < EPS &&
             Math.abs(obj.x2.im) < EPS && Math.abs(obj.y2.im) < EPS;
    }
    if (obj.type === 'D') {
      return Math.abs(obj.center.im) < EPS && Math.abs(obj.radius.im) < EPS;
    }
    if (obj.type === 'C') {
      return Math.abs(obj.value.im) < EPS;
    }
    return false;
  }

  calculateCJ(x, y, z, sign3) {
    let result = { x: 0, y: 0, real: true };

    if (x.type === 'P' && y.type === 'P' && z.type === 'O') {
      const U1 = this.geometry.projectPointToLine(x, z);
      const A1 = U1 ? U1.x : new Complex(0, 0);
      const B1 = U1 ? U1.y : new Complex(0, 0);

      const U2 = this.geometry.projectPointToLine(y, z);
      const A2 = U2 ? U2.x : new Complex(0, 0);
      const B2 = U2 ? U2.y : new Complex(0, 0);

      const diffAx = A2.subtract(A1);
      const diffBx = B2.subtract(B1);

      const D = new Complex(
        Math.sqrt(Math.pow(diffAx.re, 2) + Math.pow(diffBx.re, 2)),
        0
      );

      if (Math.abs(D.re) < EPS) {
        result.x = 0;
        return result;
      }

      let C = 0;
      if (Math.abs(A2.re - A1.re) > EPS) {
        C = Math.sign((A2.re - A1.re) / (z.x1.re - z.x2.re));
      } else if (Math.abs(B2.re - B1.re) > EPS) {
        C = Math.sign((B2.re - B1.re) / (z.y1.re - z.y2.re));
      } else {
        result.real = false;
        return result;
      }

      result.x = D.re * C * sign3;
      result.y = 0;
    } else {
      result.real = false;
    }

    return result;
  }

  EExecP2(result, line1, line2, att, sign1, sign2) {
    if (line1.type !== 'O' || line2.type !== 'O') {
      return false;
    }

    const intersection = this.geometry.lineIntersection(line1, line2);

    if (intersection) {
      return intersection;
    } else if (att.checked) {
      return this.createEmpty(att);
    }

    return null;
  }

  EExecP3(result1, result2, arc1, arc2, att1, att2, sign1, sign2) {
    if (arc1.type !== 'D' || arc2.type !== 'D') {
      return false;
    }

    const intersections = this.geometry.calculateCircleIntersections(arc1, arc2);

    if (!intersections) {
      if (att1.checked) result1 = this.createEmpty(att1);
      if (att2.checked) result2 = this.createEmpty(att2);
      return { result1, result2 };
    }

    const { X1, Y1, X2, Y2 } = intersections;
    const point1 = this.geometry.createPoint(X1, Y1, 1, att1);
    const point2 = this.geometry.createPoint(X2, Y2, 1, att2);

    if (point1) {
      arc1.addIncident(point1);
      arc2.addIncident(point1);
    }

    if (point2) {
      arc1.addIncident(point2);
      arc2.addIncident(point2);
    }

    return { result1: point1, result2: point2 };
  }

  EExecAN(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    const dx = y.x.subtract(x.x);
    const dy = y.y.subtract(x.y);

    const distance = Math.sqrt(dx.re * dx.re + dy.re * dy);

    return this.geometry.createNumber(new Complex(distance, 0), att);
  }

  EExecAO(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'O') {
      return this.createEmpty(att);
    }

    const angle = this.geometry.getIntersectionAngles(x, y);

    if (!angle) {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(new Complex(angle.angle, 0), att);
  }

  EExecAP(result, x, y, att, sign1, sign2) {
    if (x.type !== 'O' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    return this.EExecPF(result, y, x, att, sign1, sign2);
  }

  EExecAQ(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(
      x.value.multiply(y.value),
      att
    );
  }

  EExecC1(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(new Complex(Math.sqrt(value.value.re), 0), att);
  }

  EExecCH(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    const sqrtValue = value.value.sqrt();
    return this.geometry.createNumber(sqrtValue, att);
  }

  EExecC3(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(value.value.divide(new Complex(value.value.re, 0)), att);
  }

  EExecC4(result, value, att, sign1) {
    if (value.type !== 'C') {
      return this.createEmpty(att);
    }

    const denominator = value.value.re * value.value.re + value.value.im * value.value.im;
    return this.geometry.createNumber(
      new Complex(
        value.value.re / denominator,
        value.value.im / denominator
      ),
      att
    );
  }

  EExecC5(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(x.value.add(y.value), att);
  }

  EExecC6(result, x, y, att, sign1, sign2) {
    if (x.type !== 'C' || y.type !== 'C') {
      return this.createEmpty(att);
    }

    return this.geometry.createNumber(x.value.subtract(y.value), att);
  }

  EExecC2(result, x, y, att, sign1, sign2) {
    if (x.type !== 'P' || y.type !== 'P') {
      return this.createEmpty(att);
    }

    if (!this.isProper(x) || !this.isProper(y)) {
      return this.createEmpty(att);
    }

    const dx = y.x.subtract(x.x);
    const dy = y.y.subtract(x.y);

    const distance = Math.sqrt(dx.re * dx.re + dy.re * dy + dx.im * dx.im + dy.im * dy.im);

    return this.geometry.createNumber(new Complex(distance * distance, 0), att);
  }

  EExecD9(result, x, y, z, att, sign1, sign2, sign3) {
    if (x.type !== 'O' || y.type !== 'O' || z.type !== 'C') {
      return false;
    }

    const angle = this.geometry.getLineAngle(x);
    const distance = z.value.re;

    const angleRad = angle * Math.PI / 180;
    const offsetX = distance * Math.cos(angleRad);
    const offsetY = distance * Math.sin(angleRad);

    const newX1 = new Complex(y.x1.re + offsetX, 0);
    const newY1 = new Complex(y.y1.re + offsetY, 0);
    const newX2 = new Complex(y.x2.re + offsetX, 0);
    const newY2 = new Complex(y.y2.re + offsetY, 0);

    const newLine = this.geometry.createLine(
      newX1, newY1, 1,
      newX2, newY2, 1,
      false, "sobstv", att
    );

    return newLine;
  }
}

function returnEmpty(result, att) {
  if (att && att.checked) {
    return new EmptyObject(att);
  }
  return null;
}// Projective Geometry and Rendering System
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

// File Operations and UI System
// Part of refactored abc2.js - File Operations and User Interface
class FileManager {
  constructor(geometry) {
    this.geometry = geometry;
    this.currentProject = {
      objects: [],
      algorithm: {
        program: [],
        nameList: []
      }
    };
  }

  saveToFile(filename = 'project.geo') {
    try {
      const data = this.serializeProject();

      if (typeof Blob !== 'undefined') {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
      } else {
        throw new Error('File saving not supported in this environment');
      }
    } catch (error) {
      console.error('Error saving file:', error);
      return false;
    }
  }

  loadFromFile(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const data = event.target.result;
          this.deserializeProject(data);
          resolve(true);
        } catch (error) {
          console.error('Error parsing file:', error);
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsText(file);
    });
  }

  serializeProject() {
    const data = {
      version: '2.0',
      objects: this.currentProject.objects.map(obj => this.serializeObject(obj)),
      algorithm: this.currentProject.algorithm,
      metadata: {
        created: new Date().toISOString(),
        modified: new Date().toISOString()
      }
    };

    return JSON.stringify(data, null, 2);
  }

  serializeObject(obj) {
    const serialized = {
      type: obj.type,
      attributes: {
        level: obj.attributes.level,
        layers: obj.attributes.layers,
        checked: obj.attributes.checked,
        red: obj.attributes.red,
        green: obj.attributes.green,
        blue: obj.attributes.blue
      },
      incidents: obj.incidents.map(inc => this.getObjectIndex(inc)),
      gabarit: obj.gabarit,
      selected: obj.selected
    };

    switch (obj.type) {
      case 'C':
        serialized.value = {
          re: obj.value.re,
          im: obj.value.im
        };
        break;

      case 'P':
        serialized.x = {
          re: obj.x.re,
          im: obj.x.im
        };
        serialized.y = {
          re: obj.y.re,
          im: obj.y.im
        };
        serialized.weight = obj.weight;
        serialized.direction = obj.direction;
        break;

      case 'O':
        serialized.x1 = {
          re: obj.x1.re,
          im: obj.x1.im
        };
        serialized.y1 = {
          re: obj.y1.re,
          im: obj.y1.im
        };
        serialized.x2 = {
          re: obj.x2.re,
          im: obj.x2.im
        };
        serialized.y2 = {
          re: obj.y2.re,
          im: obj.y2.im
        };
        serialized.w1 = obj.w1;
        serialized.w2 = obj.w2;
        serialized.bounded = obj.bounded;
        serialized.direction = obj.direction;
        serialized.lineType = obj.type;
        serialized.null = obj.null;
        break;

      case 'D':
        serialized.center = {
          re: obj.center.re,
          im: obj.center.im
        };
        serialized.radius = {
          re: obj.radius.re,
          im: obj.radius.im
        };
        serialized.x1 = {
          re: obj.x1.re,
          im: obj.x1.im
        };
        serialized.y1 = {
          re: obj.y1.re,
          im: obj.y1.im
        };
        serialized.x2 = {
          re: obj.x2.re,
          im: obj.x2.im
        };
        serialized.y2 = {
          re: obj.y2.re,
          im: obj.y2.im
        };
        serialized.direction = obj.direction;
        serialized.laba = obj.laba;
        serialized.level = obj.attributes.level;
        break;

      case 'W':
        serialized.lines = obj.lines.map(line => this.serializeObject(line));
        serialized.subContours = obj.subContours.map(contour => this.serializeObject(contour));
        break;

      case 'K':
      case 'k':
        serialized.S1 = this.serializeObject(obj.S1);
        serialized.S2 = this.serializeObject(obj.S2);
        serialized.S3 = this.serializeObject(obj.S3);
        serialized.S4 = this.serializeObject(obj.S4);
        serialized.D1 = this.serializeObject(obj.D1);
        serialized.D2 = this.serializeObject(obj.D2);
        serialized.D3 = this.serializeObject(obj.D3);
        serialized.D4 = this.serializeObject(obj.D4);
        break;

      case 'Y':
        serialized.PR1 = this.serializeObject(obj.PR1);
        serialized.PR2 = this.serializeObject(obj.PR2);
        serialized.PR3 = this.serializeObject(obj.PR3);
        serialized.PR4 = this.serializeObject(obj.PR4);
        serialized.PR5 = this.serializeObject(obj.PR5);
        break;
    }

    return serialized;
  }

  getObjectIndex(obj) {
    return this.currentProject.objects.indexOf(obj);
  }

  deserializeProject(data) {
    try {
      const parsed = JSON.parse(data);
      this.currentProject.objects = parsed.objects.map(obj => this.deserializeObject(obj));
      this.currentProject.algorithm = parsed.algorithm;
    } catch (error) {
      console.error('Error deserializing project:', error);
      throw new Error('Invalid project file format');
    }
  }

  deserializeObject(data) {
    let obj;

    const attributes = new Attributes({
      level: data.attributes.level,
      layers: data.attributes.layers,
      checked: data.attributes.checked,
      red: data.attributes.red,
      green: data.attributes.green,
      blue: data.attributes.blue
    });

    switch (data.type) {
      case 'C':
        obj = new NumberObject(new Complex(data.value.re, data.value.im), attributes);
        break;

      case 'P':
        obj = new Point(
          new Complex(data.x.re, data.x.im),
          new Complex(data.y.re, data.y.im),
          data.weight,
          attributes
        );
        obj.direction = data.direction;
        break;

      case 'O':
        obj = new Line(
          new Complex(data.x1.re, data.x1.im),
          new Complex(data.y1.re, data.y1.im),
          data.w1,
          new Complex(data.x2.re, data.x2.im),
          new Complex(data.y2.re, data.y2.im),
          data.w2,
          data.bounded,
          data.lineType,
          attributes
        );
        obj.direction = data.direction;
        obj.null = data.null;
        break;

      case 'D':
        obj = new Arc(
          new Complex(data.center.re, data.center.im),
          new Complex(data.radius.re, data.radius.im),
          new Complex(data.x1.re, data.x1.im),
          new Complex(data.y1.re, data.y1.im),
          new Complex(data.x2.re, data.x2.im),
          new Complex(data.y2.re, data.y2.im),
          attributes
        );
        obj.direction = data.direction;
        obj.laba = data.laba;
        break;

      case 'W':
        obj = new Contour(attributes);
        obj.lines = data.lines.map(line => this.deserializeObject(line));
        obj.subContours = data.subContours.map(contour => this.deserializeObject(contour));
        break;

      case 'K':
        obj = new Collinearity(
          this.deserializeObject(data.S1),
          this.deserializeObject(data.S2),
          this.deserializeObject(data.S3),
          this.deserializeObject(data.S4),
          this.deserializeObject(data.D1),
          this.deserializeObject(data.D2),
          this.deserializeObject(data.D3),
          this.deserializeObject(data.D4),
          attributes
        );
        break;

      case 'k':
        obj = new Correlation(
          this.deserializeObject(data.S1),
          this.deserializeObject(data.S2),
          this.deserializeObject(data.S3),
          this.deserializeObject(data.S4),
          this.deserializeObject(data.D1),
          this.deserializeObject(data.D2),
          this.deserializeObject(data.D3),
          this.deserializeObject(data.D4),
          attributes
        );
        break;

      case 'Y':
        obj = new Quadrilateral(
          this.deserializeObject(data.PR1),
          this.deserializeObject(data.PR2),
          this.deserializeObject(data.PR3),
          this.deserializeObject(data.PR4),
          this.deserializeObject(data.PR5),
          attributes
        );
        break;

      case '$':
        obj = new EmptyObject(attributes);
        break;

      default:
        console.warn('Unknown object type:', data.type);
        return null;
    }

    if (obj) {
      obj.incidents = [];
      obj.gabarit = data.gabarit;
      obj.selected = data.selected;
    }

    return obj;
  }

  clearProject() {
    this.currentProject.objects = [];
    this.currentProject.algorithm = {
      program: [],
      nameList: []
    };
  }

  addObject(obj) {
    if (obj) {
      this.currentProject.objects.push(obj);
      return obj;
    }
    return null;
  }

  removeObject(obj) {
    const index = this.currentProject.objects.indexOf(obj);
    if (index > -1) {
      this.currentProject.objects.splice(index, 1);
      return true;
    }
    return false;
  }

  getObjectByIndex(index) {
    return this.currentProject.objects[index] || null;
  }

  getObjectsByType(type) {
    return this.currentProject.objects.filter(obj => obj.type === type);
  }

  getAllObjects() {
    return [...this.currentProject.objects];
  }
}

class UIManager {
  constructor(geometry, renderer, fileManager) {
    this.geometry = geometry;
    this.renderer = renderer;
    this.fileManager = fileManager;
    this.selectedObjects = [];
    this.hoveredObject = null;
    this.interactionMode = 'select';
  }

  initializeCanvas(container) {
    const canvas = document.createElement('canvas');
    canvas.id = 'geometryCanvas';
    canvas.style.border = '1px solid #ccc';
    canvas.style.background = '#ffffff';

    container.appendChild(canvas);

    this.renderer.initialize(canvas);
    this.setupEventListeners(canvas);

    return canvas;
  }

  setupEventListeners(canvas) {
    canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    canvas.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleMouseDown(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);

    if (e.button === 0) {
      if (this.interactionMode === 'select') {
        this.selectObject(object, e.ctrlKey);
      }
    } else if (e.button === 2) {
      this.showContextMenu(e, object);
    }
  }

  handleMouseMove(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);

    if (object !== this.hoveredObject) {
      this.hoveredObject = object;
      this.updateCursor();
    }
  }

  handleMouseUp(e) {
  }

  handleDoubleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const object = this.findObjectAtPosition(x, y);
    if (object) {
      this.objectProperties(object);
    }
  }

  handleWheel(e) {
    e.preventDefault();
  }

  handleKeyDown(e) {
  }

  findObjectAtPosition(screenX, screenY, tolerance = 5) {
    const objects = this.fileManager.getAllObjects();

    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (this.isObjectAtPosition(obj, screenX, screenY, tolerance)) {
        return obj;
      }
    }

    return null;
  }

  isObjectAtPosition(obj, screenX, screenY, tolerance) {
    if (obj.type === 'P') {
      const point = this.renderer.worldToScreen(obj.x.re, obj.y.re);
      const distance = Math.sqrt(
        Math.pow(point.x - screenX, 2) + Math.pow(point.y - screenY, 2)
      );
      return distance < tolerance;
    } else if (obj.type === 'O') {
      const start = this.renderer.worldToScreen(obj.x1.re, obj.y1.re);
      const end = this.renderer.worldToScreen(obj.x2.re, obj.y2.re);
      return this.isPointNearLine(screenX, screenY, start.x, start.y, end.x, end.y, tolerance);
    } else if (obj.type === 'D') {
      const center = this.renderer.worldToScreen(obj.center.re, obj.center.re);
      const distance = Math.sqrt(
        Math.pow(center.x - screenX, 2) + Math.pow(center.y - screenY, 2)
      );
      return distance < tolerance + obj.radius.re * this.renderer.screenConfig.scale;
    }

    return false;
  }

  isPointNearLine(px, py, x1, y1, x2, y2, tolerance) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const distance = Math.sqrt(
      Math.pow(px - xx, 2) + Math.pow(py - yy, 2)
    );

    return distance < tolerance;
  }

  selectObject(obj, addToSelection = false) {
    if (!obj) return;

    if (addToSelection) {
      if (!this.selectedObjects.includes(obj)) {
        this.selectedObjects.push(obj);
        obj.selected = true;
      }
    } else {
      this.selectedObjects.forEach(o => o.selected = false);
      this.selectedObjects = [obj];
      obj.selected = true;
    }

    this.updateSelectionUI();
  }

  deselectAll() {
    this.selectedObjects.forEach(o => o.selected = false);
    this.selectedObjects = [];
    this.updateSelectionUI();
  }

  deleteSelected() {
    this.selectedObjects.forEach(obj => {
      this.fileManager.removeObject(obj);
    });
    this.selectedObjects = [];
    this.updateSelectionUI();
  }

  updateSelectionUI() {
    // Update UI elements to reflect selection state
    // This would typically update property panels, toolbars, etc.
    console.log('Selected objects:', this.selectedObjects.length);
  }

  updateCursor() {
    if (this.hoveredObject) {
      document.getElementById('geometryCanvas').style.cursor = 'pointer';
    } else {
      document.getElementById('geometryCanvas').style.cursor = 'default';
    }
  }

  showContextMenu(e, object) {
    // Create context menu
    const menu = document.createElement('div');
    menu.style.position = 'fixed';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    menu.style.background = '#ffffff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '5px';
    menu.style.zIndex = '1000';

    const items = [];

    if (object) {
      items.push({ text: 'Properties', action: () => this.objectProperties(object) });
      items.push({ text: 'Delete', action: () => { this.fileManager.removeObject(object); this.deselectAll(); document.body.removeChild(menu); }});
      items.push({ text: 'Clone', action: () => this.cloneObject(object) });
    }

    items.push({ text: 'Save Project', action: () => { this.fileManager.saveToFile(); document.body.removeChild(menu); }});
    items.push({ text: 'Load Project', action: () => { this.openFileDialog(); document.body.removeChild(menu); }});

    items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.textContent = item.text;
      menuItem.style.padding = '5px 10px';
      menuItem.style.cursor = 'pointer';

      menuItem.addEventListener('mouseenter', () => menuItem.style.background = '#f0f0f0');
      menuItem.addEventListener('mouseleave', () => menuItem.style.background = 'transparent');
      menuItem.addEventListener('click', item.action);

      menu.appendChild(menuItem);
    });

    document.body.appendChild(menu);

    const closeMenu = () => {
      document.removeEventListener('click', closeMenu);
      if (document.body.contains(menu)) {
        document.body.removeChild(menu);
      }
    };

    setTimeout(() => {
      document.addEventListener('click', closeMenu);
    }, 0);
  }

  objectProperties(obj) {
    console.log('Object properties:', obj);
    // Show properties dialog
  }

  cloneObject(obj) {
    const cloned = this.geometry.cloneObject(obj);
    if (cloned) {
      cloned.x = cloned.x.add(new Complex(5, 0));
      cloned.y = cloned.y.add(new Complex(5, 0));
      this.fileManager.addObject(cloned);
    }
  }

  openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.geo,.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.fileManager.loadFromFile(file)
          .then(() => {
            console.log('Project loaded successfully');
            this.renderer.draw(this.fileManager.getAllObjects());
          })
          .catch(error => {
            console.error('Error loading project:', error);
            alert('Error loading project: ' + error.message);
          });
      }
    };

    input.click();
  }

  setInteractionMode(mode) {
    this.interactionMode = mode;
    console.log('Interaction mode:', mode);
  }

  refresh() {
    this.renderer.draw(this.fileManager.getAllObjects());
  }
}

// Main Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // Core Classes
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

    // Command Classes
    GeometryCommands,
    ConstructiveCommands,
    ProjectiveGeometry,
    GraphicalRenderer,
    FileManager,
    UIManager,

    // Utility Functions
    returnEmpty,

    // Global instances
    geometry
  };
}

// Browser global export (for direct script loading)
if (typeof window !== 'undefined') {
  window.Complex = Complex;
  window.Attributes = Attributes;
  window.GeometryObject = GeometryObject;
  window.Point = Point;
  window.Line = Line;
  window.Arc = Arc;
  window.NumberObject = NumberObject;
  window.EmptyObject = EmptyObject;
  window.ConditionObject = ConditionObject;
  window.ProeLine = ProeLine;
  window.Collinearity = Collinearity;
  window.Correlation = Correlation;
  window.Quadrilateral = Quadrilateral;
  window.Contour = Contour;
  window.ScreenConfig = ScreenConfig;
  window.GeometryCommands = GeometryCommands;
  window.ConstructiveCommands = ConstructiveCommands;
  window.ProjectiveGeometry = ProjectiveGeometry;
  window.GraphicalRenderer = GraphicalRenderer;
  window.FileManager = FileManager;
  window.UIManager = UIManager;
  window.returnEmpty = returnEmpty;
  // Не экспортируем geometry инстанс, только класс для создания
}
